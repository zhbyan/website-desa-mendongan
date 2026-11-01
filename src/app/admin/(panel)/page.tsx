import Link from "next/link";
import { ArrowRight, BookOpenText, Images, Sprout } from "lucide-react";
import { requireAdmin } from "@/lib/supabase/admin-auth";

function CountTile({ label, count, icon: Icon, href }: { label: string; count: number | null; icon: typeof BookOpenText; href: string }) {
  return (
    <Link className="flex items-center gap-4 rounded-xl border border-[#e2e9e2] bg-white p-4 transition hover:border-[#bdd5c3] hover:shadow-sm" href={href}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#e5f3ec] text-[#064e3b]"><Icon size={20} /></span>
      <span>
        <span className="block text-2xl font-extrabold leading-none">{count ?? "–"}</span>
        <span className="mt-1 block text-xs text-[#718077]">{label}</span>
      </span>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();
  const [articlesResult, umkmResult, galleryResult, latestResult] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("umkm").select("id", { count: "exact", head: true }),
    supabase.from("gallery_items").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id, title, status, updated_at").order("updated_at", { ascending: false }).limit(5),
  ]);
  const databaseError = articlesResult.error || umkmResult.error || galleryResult.error || latestResult.error;

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold text-[#6f7d73]">Ruang kerja pengelola</p>
          <h1 className="mt-1 font-[family-name:var(--font-bricolage)] text-3xl font-bold tracking-tight">Ringkasan</h1>
          <p className="mt-2 text-sm text-[#738078]">Kelola informasi yang tampil di situs Desa Mendongan.</p>
        </div>
        <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#064e3b] px-4 text-xs font-bold text-white hover:bg-[#0b6848]" href="/admin/berita"><BookOpenText size={16} />Tulis berita</Link>
      </section>

      {databaseError && <div className="rounded-lg border border-[#e8d7a9] bg-[#fff9e9] px-4 py-3 text-xs leading-relaxed text-[#715c22]">Database CMS belum siap. Jalankan migration di folder <code>supabase/migrations</code> dan pastikan akun ini terdaftar sebagai admin.</div>}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Jumlah konten">
        <CountTile count={articlesResult.count} href="/admin/berita" icon={BookOpenText} label="Berita" />
        <CountTile count={umkmResult.count} href="/admin/umkm" icon={Sprout} label="Data UMKM" />
        <CountTile count={galleryResult.count} href="/admin/galeri" icon={Images} label="Foto galeri" />
      </section>

      <section className="overflow-hidden rounded-xl border border-[#e1e8e1] bg-white">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div><h2 className="font-[family-name:var(--font-bricolage)] text-base font-bold">Terakhir diperbarui</h2><p className="mt-1 text-xs text-[#778279]">Aktivitas konten berita terbaru</p></div>
          <Link className="inline-flex items-center gap-1 text-xs font-bold text-[#12603e] hover:underline" href="/admin/berita">Semua berita <ArrowRight size={14} /></Link>
        </div>
        {latestResult.data?.length ? (
          <div className="divide-y divide-[#edf0ed] border-t border-[#edf0ed]">
            {latestResult.data.map((article) => (
              <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6" key={article.id}>
                <div className="min-w-0"><p className="truncate text-sm font-semibold">{article.title}</p><p className="mt-1 text-[11px] text-[#778279]">{new Date(article.updated_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</p></div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${article.status === "published" ? "bg-[#e5f3ec] text-[#12603e]" : "bg-[#f3f0e8] text-[#796329]"}`}>{article.status === "published" ? "Tampil" : "Draft"}</span>
              </div>
            ))}
          </div>
        ) : <p className="border-t border-[#edf0ed] px-6 py-9 text-center text-xs text-[#778279]">Belum ada berita. Kamu bisa mulai dari tombol “Tulis berita”.</p>}
      </section>
    </div>
  );
}