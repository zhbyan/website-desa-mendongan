begin;

create table if not exists public.site_profile (
  id text primary key check (id = 'main'),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function private.set_site_profile_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function private.set_site_profile_updated_at() from public;

drop trigger if exists site_profile_set_updated_at on public.site_profile;
create trigger site_profile_set_updated_at
  before update on public.site_profile
  for each row execute function private.set_site_profile_updated_at();

alter table public.site_profile enable row level security;
revoke all on table public.site_profile from anon, authenticated;
grant select on table public.site_profile to anon, authenticated;
grant insert, update on table public.site_profile to authenticated;
grant all on table public.site_profile to service_role;

drop policy if exists "Public can read site profile" on public.site_profile;
create policy "Public can read site profile"
  on public.site_profile for select to anon, authenticated using (true);

drop policy if exists "Admins can manage site profile" on public.site_profile;
create policy "Admins can manage site profile"
  on public.site_profile for all to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

commit;