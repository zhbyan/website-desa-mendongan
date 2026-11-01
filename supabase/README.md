# CMS Setup

The CMS schema is in `migrations/20261026000000_cms_core.sql`.

## Local app configuration

Add these values to the ignored `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

The legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` variable is also accepted. Never add a Supabase secret/service-role key to a `NEXT_PUBLIC_*` variable or browser code.

## Apply the migration

Run the SQL migration once in the Supabase SQL Editor. It upgrades the legacy `articles`, `umkm`, and `gallery_albums` tables in place, preserves their existing records, copies legacy gallery photos into `gallery_items`, and adds the CMS RLS policies, admin allowlist, and public `cms-media` image bucket. It does not drop the legacy columns or tables.

## Create the first admin

1. In Supabase Dashboard, create an email/password user under **Authentication → Users**. Keep public sign-ups disabled.
2. Copy the user's UUID.
3. Run the following in the SQL Editor, replacing the example values:

```sql
insert into public.admin_users (user_id, display_name)
values ('AUTH-USER-UUID', 'Admin Desa');
```

Only UUIDs in `admin_users` can access the panel or write CMS content. Add or remove access by managing rows in this table from the trusted Supabase Dashboard/SQL Editor.

## Local preview

With the Next.js development server running, open `/admin/preview` to inspect the panel using sample data. This route returns 404 outside development. For real login and CRUD, configure the project URL/key, apply the migration, and create an admin user first.