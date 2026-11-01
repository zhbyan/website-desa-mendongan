begin;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'articles' and column_name = 'id'
  ) then
    create table public.articles (
      id uuid primary key default gen_random_uuid(),
      slug text not null unique,
      title text not null default '',
      excerpt text not null default '',
      content text not null default '',
      category text not null default 'Kegiatan',
      cover_image text,
      status text not null default 'draft',
      published_at timestamptz,
      created_by uuid references auth.users (id) on delete set null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  end if;
end;
$$;

alter table public.articles add column if not exists title text;
alter table public.articles add column if not exists excerpt text;
alter table public.articles add column if not exists content text;
alter table public.articles add column if not exists cover_image text;
alter table public.articles add column if not exists status text;
alter table public.articles add column if not exists published_at timestamptz;
alter table public.articles add column if not exists created_by uuid references auth.users (id) on delete set null;
alter table public.articles add column if not exists updated_at timestamptz default now();

do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'articles' and column_name = 'title_id') then
    execute $q$
      update public.articles
      set title = coalesce(nullif(title, ''), nullif(title_id, ''), slug),
          excerpt = coalesce(nullif(excerpt, ''), excerpt_id, ''),
          content = coalesce(nullif(content, ''), content_id, ''),
          cover_image = coalesce(cover_image, thumbnail_url)
    $q$;
            alter table public.articles alter column title_id drop not null;
  else
    update public.articles
    set title = coalesce(nullif(title, ''), slug),
        excerpt = coalesce(excerpt, ''),
        content = coalesce(content, '');
  end if;
end;
$$;

update public.articles set status = 'draft' where status is null or status not in ('draft', 'published');
update public.articles set published_at = created_at where status = 'published' and published_at is null;
alter table public.articles alter column title set default '';
alter table public.articles alter column title set not null;
alter table public.articles alter column excerpt set default '';
alter table public.articles alter column excerpt set not null;
alter table public.articles alter column content set default '';
alter table public.articles alter column content set not null;
alter table public.articles alter column status set default 'draft';
alter table public.articles alter column status set not null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'articles_cms_status_check' and conrelid = 'public.articles'::regclass) then
    alter table public.articles add constraint articles_cms_status_check check (status in ('draft', 'published'));
  end if;
end;
$$;

create table if not exists public.umkm (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default 'Pertanian',
  owner_name text not null default '',
  description text not null default '',
  price_range text not null default 'Hubungi pemilik',
  dusun text not null default '',
  whatsapp text not null default '',
  photo_url text,
  status text not null default 'draft',
  is_featured boolean not null default false,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.umkm add column if not exists category text;
alter table public.umkm add column if not exists owner_name text default '';
alter table public.umkm add column if not exists description text;
alter table public.umkm add column if not exists price_range text;
alter table public.umkm add column if not exists dusun text default '';
alter table public.umkm add column if not exists whatsapp text default '';
alter table public.umkm add column if not exists photo_url text;
alter table public.umkm add column if not exists status text;
alter table public.umkm add column if not exists is_featured boolean default false;
alter table public.umkm add column if not exists created_by uuid references auth.users (id) on delete set null;
alter table public.umkm add column if not exists created_at timestamptz default now();
alter table public.umkm add column if not exists updated_at timestamptz default now();

do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'umkm' and column_name = 'description_id') then
    execute $q$update public.umkm set description = coalesce(nullif(description, ''), description_id, '')$q$;
  else
    update public.umkm set description = coalesce(description, '');
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'umkm' and column_name = 'photo_urls') then
    execute $q$update public.umkm set photo_url = coalesce(photo_url, photo_urls[1])$q$;
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'umkm' and column_name = 'phone_wa') then
    execute $q$update public.umkm set whatsapp = coalesce(nullif(whatsapp, ''), phone_wa, '')$q$;
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'umkm' and column_name = 'is_active') then
    execute $q$update public.umkm set status = case when is_active then 'published' else 'draft' end where status is null$q$;
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'umkm' and column_name = 'category_id')
     and exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'umkm_categories') then
    execute $q$
      update public.umkm u
      set category = case
        when lower(c.name_id) like '%kerajin%' then 'Kerajinan'
        when lower(c.name_id) like '%kuliner%' or lower(c.name_id) like '%makanan%' then 'Kuliner'
        when lower(c.name_id) like '%ternak%' or lower(c.name_id) like '%susu%' then 'Peternakan'
        when lower(c.name_id) like '%jasa%' then 'Jasa'
        when lower(c.name_id) like '%pertanian%' or lower(c.name_id) like '%perkebunan%' then 'Pertanian'
        else 'Lainnya'
      end
      from public.umkm_categories c
      where u.category_id = c.id and (u.category is null or u.category = '')
    $q$;
  end if;
end;
$$;

update public.umkm set category = 'Pertanian' where category is null or category = '';
update public.umkm set owner_name = '' where owner_name is null;
update public.umkm set description = '' where description is null;
update public.umkm set price_range = 'Hubungi pemilik' where price_range is null;
update public.umkm set dusun = '' where dusun is null;
update public.umkm set whatsapp = '' where whatsapp is null;
update public.umkm set status = 'draft' where status is null or status not in ('draft', 'published');
update public.umkm set is_featured = false where is_featured is null;
update public.umkm set created_at = now() where created_at is null;
update public.umkm set updated_at = now() where updated_at is null;

alter table public.umkm alter column category set default 'Pertanian';
alter table public.umkm alter column category set not null;
alter table public.umkm alter column owner_name set default '';
alter table public.umkm alter column owner_name set not null;
alter table public.umkm alter column description set default '';
alter table public.umkm alter column description set not null;
alter table public.umkm alter column price_range set default 'Hubungi pemilik';
alter table public.umkm alter column price_range set not null;
alter table public.umkm alter column dusun set default '';
alter table public.umkm alter column dusun set not null;
alter table public.umkm alter column whatsapp set default '';
alter table public.umkm alter column whatsapp set not null;
alter table public.umkm alter column status set default 'draft';
alter table public.umkm alter column status set not null;
alter table public.umkm alter column is_featured set default false;
alter table public.umkm alter column is_featured set not null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'umkm_cms_status_check' and conrelid = 'public.umkm'::regclass) then
    alter table public.umkm add constraint umkm_cms_status_check check (status in ('draft', 'published'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'umkm_cms_category_check' and conrelid = 'public.umkm'::regclass) then
    alter table public.umkm add constraint umkm_cms_category_check check (category in ('Pertanian', 'Kuliner', 'Kerajinan', 'Peternakan', 'Jasa', 'Lainnya'));
  end if;
end;
$$;

create table if not exists public.gallery_albums (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gallery_albums add column if not exists name text;
alter table public.gallery_albums add column if not exists description text default '';
alter table public.gallery_albums add column if not exists is_published boolean;
alter table public.gallery_albums add column if not exists sort_order integer default 0;
alter table public.gallery_albums add column if not exists created_at timestamptz default now();
alter table public.gallery_albums add column if not exists updated_at timestamptz default now();

do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'gallery_albums' and column_name = 'name_id') then
    execute $q$update public.gallery_albums set name = coalesce(nullif(name, ''), nullif(name_id, ''), slug)$q$;
    alter table public.gallery_albums alter column name_id drop not null;
  else
    update public.gallery_albums set name = coalesce(nullif(name, ''), slug);
  end if;
end;
$$;

update public.gallery_albums set description = '' where description is null;
update public.gallery_albums set is_published = true where is_published is null;
update public.gallery_albums set sort_order = 0 where sort_order is null;
update public.gallery_albums set created_at = now() where created_at is null;
update public.gallery_albums set updated_at = now() where updated_at is null;
alter table public.gallery_albums alter column name set not null;
alter table public.gallery_albums alter column description set default '';
alter table public.gallery_albums alter column description set not null;
alter table public.gallery_albums alter column is_published set default true;
alter table public.gallery_albums alter column is_published set not null;
alter table public.gallery_albums alter column sort_order set default 0;
alter table public.gallery_albums alter column sort_order set not null;

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  album_id uuid references public.gallery_albums (id) on delete set null,
  title text not null default '',
  caption text not null default '',
  image_url text not null,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gallery_items add column if not exists album_id uuid references public.gallery_albums (id) on delete set null;
alter table public.gallery_items add column if not exists title text default '';
alter table public.gallery_items add column if not exists caption text default '';
alter table public.gallery_items add column if not exists image_url text;
alter table public.gallery_items add column if not exists is_published boolean default true;
alter table public.gallery_items add column if not exists sort_order integer default 0;
alter table public.gallery_items add column if not exists created_by uuid references auth.users (id) on delete set null;
alter table public.gallery_items add column if not exists created_at timestamptz default now();
alter table public.gallery_items add column if not exists updated_at timestamptz default now();

do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'gallery')
     and exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'gallery' and column_name = 'photo_url') then
    if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'gallery' and column_name = 'title_id') then
      execute $q$
        insert into public.gallery_items (id, album_id, title, caption, image_url, is_published, sort_order, created_at, updated_at)
        select id, album_id, coalesce(title_id, ''), coalesce(description_id, ''), photo_url, true, coalesce(sort_order, 0), coalesce(created_at, now()), coalesce(created_at, now())
        from public.gallery
        on conflict (id) do nothing
      $q$;
    else
      execute $q$
        insert into public.gallery_items (id, album_id, title, caption, image_url, is_published, sort_order, created_at, updated_at)
        select id, album_id, coalesce(title, ''), coalesce(caption, ''), photo_url, true, coalesce(sort_order, 0), coalesce(created_at, now()), coalesce(created_at, now())
        from public.gallery
        on conflict (id) do nothing
      $q$;
    end if;
  end if;
end;
$$;

update public.gallery_items set title = '' where title is null;
update public.gallery_items set caption = '' where caption is null;
update public.gallery_items set is_published = true where is_published is null;
update public.gallery_items set sort_order = 0 where sort_order is null;
update public.gallery_items set created_at = now() where created_at is null;
update public.gallery_items set updated_at = now() where updated_at is null;
alter table public.gallery_items alter column title set default '';
alter table public.gallery_items alter column title set not null;
alter table public.gallery_items alter column caption set default '';
alter table public.gallery_items alter column caption set not null;
alter table public.gallery_items alter column image_url set not null;
alter table public.gallery_items alter column is_published set default true;
alter table public.gallery_items alter column is_published set not null;
alter table public.gallery_items alter column sort_order set default 0;
alter table public.gallery_items alter column sort_order set not null;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin_users where user_id = (select auth.uid()));
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

grant usage on schema private to authenticated;
alter table public.admin_users enable row level security;
revoke all on table public.admin_users from anon, authenticated;
grant select on table public.admin_users to authenticated;
grant all on table public.admin_users to service_role;
drop policy if exists "Admins can read their own admin record" on public.admin_users;
create policy "Admins can read their own admin record"
  on public.admin_users for select to authenticated
  using ((select auth.uid()) = user_id);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function private.set_updated_at() from public;

create index if not exists articles_publication_idx on public.articles (status, published_at desc);
create index if not exists umkm_publication_idx on public.umkm (status, category, name);
create index if not exists gallery_items_album_idx on public.gallery_items (album_id, sort_order);

 drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at before update on public.articles for each row execute function private.set_updated_at();
drop trigger if exists umkm_set_updated_at on public.umkm;
create trigger umkm_set_updated_at before update on public.umkm for each row execute function private.set_updated_at();
drop trigger if exists gallery_albums_set_updated_at on public.gallery_albums;
create trigger gallery_albums_set_updated_at before update on public.gallery_albums for each row execute function private.set_updated_at();
drop trigger if exists gallery_items_set_updated_at on public.gallery_items;
create trigger gallery_items_set_updated_at before update on public.gallery_items for each row execute function private.set_updated_at();

alter table public.articles enable row level security;
alter table public.umkm enable row level security;
alter table public.gallery_albums enable row level security;
alter table public.gallery_items enable row level security;

revoke all on table public.articles, public.umkm, public.gallery_albums, public.gallery_items from anon, authenticated;
grant select on table public.articles, public.umkm, public.gallery_albums, public.gallery_items to anon, authenticated;
grant insert, update, delete on table public.articles, public.umkm, public.gallery_albums, public.gallery_items to authenticated;
grant all on table public.articles, public.umkm, public.gallery_albums, public.gallery_items to service_role;

drop policy if exists "Public read published articles" on public.articles;
drop policy if exists "Admins can manage articles" on public.articles;
drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles" on public.articles for select to anon, authenticated using (status = 'published');
create policy "Admins can manage articles" on public.articles for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "Public read active umkm" on public.umkm;
drop policy if exists "Admins can manage UMKM" on public.umkm;
drop policy if exists "Public can read published UMKM" on public.umkm;
create policy "Public can read published UMKM" on public.umkm for select to anon, authenticated using (status = 'published');
create policy "Admins can manage UMKM" on public.umkm for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "Public can read published albums" on public.gallery_albums;
drop policy if exists "Admins can manage albums" on public.gallery_albums;
create policy "Public can read published albums" on public.gallery_albums for select to anon, authenticated using (is_published);
create policy "Admins can manage albums" on public.gallery_albums for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "Public can read published gallery items" on public.gallery_items;
drop policy if exists "Admins can manage gallery items" on public.gallery_items;
create policy "Public can read published gallery items" on public.gallery_items for select to anon, authenticated
  using (is_published and (album_id is null or exists (select 1 from public.gallery_albums a where a.id = gallery_items.album_id and a.is_published)));
create policy "Admins can manage gallery items" on public.gallery_items for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-media', 'cms-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can upload CMS images" on storage.objects;
drop policy if exists "Admins can update CMS images" on storage.objects;
drop policy if exists "Admins can delete CMS images" on storage.objects;
create policy "Admins can upload CMS images" on storage.objects for insert to authenticated with check (bucket_id = 'cms-media' and (select private.is_admin()));
create policy "Admins can update CMS images" on storage.objects for update to authenticated using (bucket_id = 'cms-media' and (select private.is_admin())) with check (bucket_id = 'cms-media' and (select private.is_admin()));
create policy "Admins can delete CMS images" on storage.objects for delete to authenticated using (bucket_id = 'cms-media' and (select private.is_admin()));

-- After creating an admin account in Supabase Auth, add its UUID here:
-- insert into public.admin_users (user_id, display_name)
-- values ('AUTH-USER-UUID', 'Admin Desa');

commit;
