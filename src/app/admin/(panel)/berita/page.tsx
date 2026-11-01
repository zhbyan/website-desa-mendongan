import ContentManager, { type CmsEntry } from "@/components/admin/ContentManager";
import { requireAdmin } from "@/lib/supabase/admin-auth";

export default async function AdminNewsPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("articles").select("*").order("updated_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header><p className="text-xs font-semibold text-[#6f7d73]">Publikasi desa</p><h1 className="mt-1 font-[family-name:var(--font-bricolage)] text-3xl font-bold tracking-tight">Berita</h1><p className="mt-2 text-sm text-[#738078]">Tulis kabar desa dan tentukan kapan berita tampil untuk pengunjung.</p></header>
      {error ? <p className="rounded-lg border border-[#e8d7a9] bg-[#fff9e9] px-4 py-3 text-xs text-[#715c22]">Tabel berita belum tersedia. Pastikan migration CMS sudah dijalankan.</p> : <ContentManager entries={(data ?? []) as CmsEntry[]} kind="articles" />}
    </div>
  );
}