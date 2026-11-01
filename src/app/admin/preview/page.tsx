import { notFound } from "next/navigation";
import { ArrowRight, BookOpenText, Images, Sprout } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

const latestNews = [
  { title: "Panen Raya Kopi Arabika Lereng Ungaran", date: "24 Okt 2026", status: "Tampil" },
  { title: "Gotong Royong Perbaikan Jalan Dusun Setro", date: "21 Okt 2026", status: "Draft" },
  { title: "Pelatihan Kemasan Produk UMKM Desa", date: "18 Okt 2026", status: "Tampil" },
];

const contentGroups = [
  { id: "berita", title: "Berita", description: "Kabar dan kegiatan desa", icon: BookOpenText, entries: latestNews.map((item) => ({ title: item.title, note: item.date, status: item.status })) },
  {
    id: "umkm", title: "UMKM", description: "Potensi dan usaha warga", icon: Sprout, entries: [
      { title: "Kopi Robusta & Arabika Lereng Ungaran", note: "Pertanian · Dusun Mendongan", status: "Tampil" },
      { title: "Anyaman Bambu & Wadah Etnik", note: "Kerajinan · Dusun Gondangsari", status: "Tampil" },
    ]
  },
  {
    id: "galeri", title: "Galeri", description: "Dokumentasi kegiatan", icon: Images, entries: [
      { title: "Panen raya kopi", note: "Album Kegiatan Desa", status: "Tampil" },
      { title: "Pembangunan jalan tani", note: "Album Pembangunan", status: "Draft" },
    ]
  },
];

export default function AdminPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <AdminShell displayName="" previewMode>
      <div className="space-y-8">
        <div className="rounded-lg border border-[#e6d9b7] bg-[#fff9e9] px-4 py-3 text-xs font-semibold text-[#715c22]">
          Pratinjau desain saja. Data contoh ini tidak tersimpan dan menu belum terhubung ke database.
        </div>

        <section className="space-y-6" id="ringkasan">
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold text-[#6f7d73]">Ruang kerja pengelola</p><h1 className="mt-1 font-[family-name:var(--font-bricolage)] text-3xl font-bold tracking-tight">Ringkasan</h1><p className="mt-2 text-sm text-[#738078]">Kelola informasi yang tampil di situs Desa Mendongan.</p></div>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#064e3b] px-4 text-xs font-bold text-white"><BookOpenText size={16} /> Tulis berita</button>
          </header>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Berita", value: "12", icon: BookOpenText },
              { label: "Data UMKM", value: "18", icon: Sprout },
              { label: "Foto galeri", value: "46", icon: Images },
            ].map(({ label, value, icon: Icon }) => <div className="flex items-center gap-4 rounded-xl border border-[#e2e9e2] bg-white p-4" key={label}><span className="flex size-11 items-center justify-center rounded-lg bg-[#e5f3ec] text-[#064e3b]"><Icon size={20} /></span><span><span className="block text-2xl font-extrabold leading-none">{value}</span><span className="mt-1 block text-xs text-[#718077]">{label}</span></span></div>)}
          </div>
          <section className="overflow-hidden rounded-xl border border-[#e1e8e1] bg-white">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6"><div><h2 className="font-[family-name:var(--font-bricolage)] text-base font-bold">Terakhir diperbarui</h2><p className="mt-1 text-xs text-[#778279]">Aktivitas konten berita terbaru</p></div><a className="inline-flex items-center gap-1 text-xs font-bold text-[#12603e]" href="#berita">Semua berita <ArrowRight size={14} /></a></div>
            <div className="divide-y divide-[#edf0ed] border-t border-[#edf0ed]">{latestNews.map((item) => <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6" key={item.title}><div className="min-w-0"><p className="truncate text-sm font-semibold">{item.title}</p><p className="mt-1 text-[11px] text-[#778279]">{item.date}</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${item.status === "Tampil" ? "bg-[#e5f3ec] text-[#12603e]" : "bg-[#f3f0e8] text-[#796329]"}`}>{item.status}</span></div>)}</div>
          </section>
        </section>

        {contentGroups.map(({ id, title, description, icon: Icon, entries }) => <section className="scroll-mt-6 overflow-hidden rounded-xl border border-[#e1e8e1] bg-white" id={id} key={id}>
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6"><span className="flex size-10 items-center justify-center rounded-lg bg-[#e5f3ec] text-[#064e3b]"><Icon size={19} /></span><div><h2 className="font-[family-name:var(--font-bricolage)] text-base font-bold">{title}</h2><p className="mt-0.5 text-xs text-[#778279]">{description}</p></div><button className="ml-auto rounded-lg bg-[#064e3b] px-3 py-2 text-[11px] font-bold text-white">+ Tambah</button></div>
          <div className="divide-y divide-[#edf0ed] border-t border-[#edf0ed]">{entries.map((entry) => <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6" key={entry.title}><div className="min-w-0"><p className="truncate text-sm font-semibold">{entry.title}</p><p className="mt-1 text-[11px] text-[#778279]">{entry.note}</p></div><div className="flex shrink-0 items-center gap-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${entry.status === "Tampil" ? "bg-[#e5f3ec] text-[#12603e]" : "bg-[#f3f0e8] text-[#796329]"}`}>{entry.status}</span><button className="text-xs font-bold text-[#12603e]">Edit</button></div></div>)}</div>
        </section>)}
      </div>
    </AdminShell>
  );
}