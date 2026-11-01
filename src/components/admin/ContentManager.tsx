"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { deleteCmsEntry, saveCmsEntry, type AdminActionState } from "@/app/admin/actions";

export type CmsKind = "articles" | "umkm" | "gallery_items";

export type CmsEntry = {
  id: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  cover_image?: string | null;
  status?: string;
  name?: string;
  owner_name?: string;
  description?: string;
  price_range?: string;
  dusun?: string;
  whatsapp?: string;
  photo_url?: string | null;
  is_featured?: boolean;
  image_url?: string;
  caption?: string;
  is_published?: boolean;
  album_id?: string | null;
  updated_at?: string;
};

export type AlbumOption = { id: string; name: string };

const initialState: AdminActionState = { message: "", status: "idle" };

const config: Record<CmsKind, { title: string; singular: string; addLabel: string; imageLabel: string }> = {
  articles: { title: "Berita", singular: "berita", addLabel: "Tulis berita", imageLabel: "Sampul berita" },
  umkm: { title: "UMKM", singular: "UMKM", addLabel: "Tambah UMKM", imageLabel: "Foto utama" },
  gallery_items: { title: "Galeri", singular: "foto", addLabel: "Tambah foto", imageLabel: "Foto kegiatan" },
};

function entryTitle(kind: CmsKind, entry: CmsEntry) {
  return kind === "umkm" ? entry.name : entry.title;
}

function entryImage(kind: CmsKind, entry: CmsEntry | null) {
  if (!entry) return null;
  return kind === "articles" ? entry.cover_image : kind === "umkm" ? entry.photo_url : entry.image_url;
}

function entryStatus(kind: CmsKind, entry: CmsEntry | null) {
  if (!entry) return false;
  return kind === "gallery_items" ? entry.is_published : entry.status === "published";
}

function EntryForm({ kind, entry, albums, onCancel }: {
  kind: CmsKind;
  entry: CmsEntry | null;
  albums: AlbumOption[];
  onCancel: () => void;
}) {
  const [state, formAction, pending] = useActionState(saveCmsEntry, initialState);
  const details = config[kind];

  useEffect(() => {
    if (state.status === "success") onCancel();
  }, [onCancel, state.status]);

  return (
    <form action={formAction} className="border-y border-[#e4eae4] bg-white px-4 py-5 sm:px-6">
      <input name="kind" type="hidden" value={kind} />
      <input name="id" type="hidden" value={entry?.id ?? ""} />
      <input name="current_image" type="hidden" value={entryImage(kind, entry) ?? ""} />
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-bricolage)] text-lg font-bold">{entry ? `Edit ${details.singular}` : details.addLabel}</h2>
          <p className="mt-1 text-xs text-[#738078]">Isi informasi yang akan ditampilkan di situs desa.</p>
        </div>
        <button aria-label="Tutup formulir" className="flex size-9 items-center justify-center rounded-lg text-[#738078] hover:bg-[#f1f5f1]" onClick={onCancel} type="button"><X size={18} /></button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {kind === "articles" && <>
          <Field label="Judul berita" name="title" required defaultValue={entry?.title} />
          <Field label="Kategori" name="category" defaultValue={entry?.category || "Kegiatan"} />
          <Field className="sm:col-span-2" label="Ringkasan" name="excerpt" multiline defaultValue={entry?.excerpt} />
          <Field className="sm:col-span-2" label="Isi berita" name="content" multiline rows={7} defaultValue={entry?.content} />
        </>}

        {kind === "umkm" && <>
          <Field label="Nama UMKM" name="name" required defaultValue={entry?.name} />
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-[#354238]">Kategori</span>
            <select className={inputClass} defaultValue={entry?.category || "Pertanian"} name="category">
              {["Pertanian", "Kuliner", "Kerajinan", "Peternakan", "Jasa", "Lainnya"].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <Field label="Nama pemilik" name="owner_name" defaultValue={entry?.owner_name} />
          <Field label="Dusun" name="dusun" defaultValue={entry?.dusun} />
          <Field label="WhatsApp" name="whatsapp" defaultValue={entry?.whatsapp} placeholder="628..." />
          <Field label="Kisaran harga" name="price_range" defaultValue={entry?.price_range || "Hubungi pemilik"} />
          <label className="flex items-center gap-2 self-end pb-3 text-xs font-semibold text-[#354238]">
            <input className="size-4 accent-[#064e3b]" defaultChecked={entry?.is_featured} name="is_featured" type="checkbox" />
            Tampilkan sebagai unggulan
          </label>
          <Field className="sm:col-span-2" label="Deskripsi" name="description" multiline rows={5} defaultValue={entry?.description} />
        </>}

        {kind === "gallery_items" && <>
          <Field label="Judul foto" name="title" defaultValue={entry?.title} />
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-[#354238]">Album</span>
            <select className={inputClass} defaultValue={entry?.album_id || ""} name="album_id">
              <option value="">Tanpa album</option>
              {albums.map((album) => <option key={album.id} value={album.id}>{album.name}</option>)}
            </select>
          </label>
          <Field className="sm:col-span-2" label="Keterangan foto" name="caption" multiline defaultValue={entry?.caption} />
        </>}

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-[#354238]">{details.imageLabel}</span>
          {entryImage(kind, entry) && <div aria-label="Gambar saat ini" className="mb-2 h-32 rounded-lg border border-[#e4eae4] bg-cover bg-center" role="img" style={{ backgroundImage: `url("${entryImage(kind, entry)}")` }} />}
          <span className="flex min-h-11 items-center gap-2 rounded-lg border border-dashed border-[#cbd7cd] bg-[#fafcf9] px-3 text-xs text-[#647168]">
            <ImagePlus size={17} /> Pilih JPG, PNG, atau WebP (maks. 10 MB)
            <input accept="image/jpeg,image/png,image/webp" className="ml-auto max-w-[190px] text-[11px] file:mr-2 file:rounded-md file:border-0 file:bg-[#e5f3ec] file:px-2.5 file:py-1.5 file:text-[11px] file:font-bold file:text-[#064e3b]" name="image" type="file" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-[#354238]">Status</span>
          <select className={inputClass} defaultValue={entryStatus(kind, entry) ? "published" : "draft"} name="status">
            <option value="draft">Draft</option>
            <option value="published">Tampilkan di situs</option>
          </select>
        </label>
      </div>

      {state.message && <p aria-live="polite" className={`mt-4 rounded-lg px-3 py-2.5 text-xs font-semibold ${state.status === "error" ? "bg-[#fff0ed] text-[#9d3d31]" : "bg-[#e7f5ec] text-[#155b39]"}`}>{state.message}</p>}
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button className="rounded-lg border border-[#dce4dc] px-4 py-2.5 text-xs font-bold text-[#536057] hover:bg-[#f7f9f6]" onClick={onCancel} type="button">Batal</button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#064e3b] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#0b6848] disabled:opacity-60" disabled={pending} type="submit"><Save size={15} />{pending ? "Menyimpan..." : "Simpan"}</button>
      </div>
    </form>
  );
}

const inputClass = "h-11 w-full rounded-lg border border-[#dce4dc] bg-white px-3 text-sm text-[#253229] outline-none focus:border-[#1a5c3a] focus:ring-3 focus:ring-[#1a5c3a]/10";

function Field({ label, name, defaultValue, required = false, multiline = false, rows = 3, className = "", placeholder }: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  placeholder?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-bold text-[#354238]">{label}{required && <span className="ml-1 text-[#b44335">*</span>}</span>
      {multiline
        ? <textarea className="w-full resize-y rounded-lg border border-[#dce4dc] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1a5c3a] focus:ring-3 focus:ring-[#1a5c3a]/10" defaultValue={defaultValue || ""} name={name} placeholder={placeholder} required={required} rows={rows} />
        : <input className={inputClass} defaultValue={defaultValue || ""} name={name} placeholder={placeholder} required={required} />}
    </label>
  );
}

export default function ContentManager({ kind, entries, albums = [] }: { kind: CmsKind; entries: CmsEntry[]; albums?: AlbumOption[] }) {
  const [selected, setSelected] = useState<CmsEntry | null>(null);
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const details = config[kind];

  function closeForm() {
    setCreating(false);
    setSelected(null);
    router.refresh();
  }

  return (
    <section className="overflow-hidden rounded-xl border border-[#e1e8e1] bg-white">
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs text-[#778279]">Konten situs</p>
          <h2 className="mt-0.5 font-[family-name:var(--font-bricolage)] text-lg font-bold">Daftar {details.title.toLowerCase()}</h2>
        </div>
        {!creating && !selected && <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#064e3b] px-4 text-xs font-bold text-white hover:bg-[#0b6848]" onClick={() => setCreating(true)} type="button"><Plus size={16} />{details.addLabel}</button>}
      </div>

      {(creating || selected) && <EntryForm albums={albums} entry={selected} key={`${kind}-${selected?.id ?? "new"}`} kind={kind} onCancel={closeForm} />}

      {entries.length === 0 ? (
        <div className="border-t border-[#edf0ed] px-5 py-12 text-center">
          <p className="text-sm font-bold text-[#354238]">Belum ada {details.singular}.</p>
          <p className="mt-1 text-xs text-[#778279]">Tambahkan konten pertama untuk mulai mengisi situs.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#edf0ed] border-t border-[#edf0ed]">
          {entries.map((entry) => {
            const title = entryTitle(kind, entry) || "Tanpa judul";
            const image = entryImage(kind, entry);
            const published = entryStatus(kind, entry);
            return (
              <article className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-6" key={entry.id}>
                {image
                  ? <div aria-label={title} className="h-16 w-full shrink-0 rounded-md border border-[#e5eae5] bg-cover bg-center sm:w-24" role="img" style={{ backgroundImage: `url("${image}")` }} />
                  : <div className="flex h-16 w-full shrink-0 items-center justify-center rounded-md bg-[#f1f5f1] text-[#829087] sm:w-24"><ImagePlus size={20} /></div>}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-[#26342a]">{title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${published ? "bg-[#e5f3ec] text-[#12603e]" : "bg-[#f3f0e8] text-[#796329]"}`}>{published ? "Tampil" : "Draft"}</span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-[#758078]">{kind === "umkm" ? `${entry.category || "Kategori"}${entry.dusun ? ` · ${entry.dusun}` : ""}` : kind === "articles" ? entry.excerpt || entry.category : entry.caption || albums.find((album) => album.id === entry.album_id)?.name || "Foto galeri"}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button aria-label={`Edit ${title}`} className="flex size-9 items-center justify-center rounded-lg text-[#536057] hover:bg-[#edf5ef] hover:text-[#064e3b]" onClick={() => { setCreating(false); setSelected(entry); }} type="button"><Pencil size={16} /></button>
                  <form action={deleteCmsEntry} onSubmit={(event) => { if (!window.confirm(`Hapus ${title}?`)) event.preventDefault(); }}>
                    <input name="kind" type="hidden" value={kind} />
                    <input name="id" type="hidden" value={entry.id} />
                    <button aria-label={`Hapus ${title}`} className="flex size-9 items-center justify-center rounded-lg text-[#7c716d] hover:bg-[#fff0ed] hover:text-[#a33e32]" type="submit"><Trash2 size={16} /></button>
                  </form>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <div className="border-t border-[#edf0ed] px-4 py-3 text-[11px] text-[#778279] sm:px-6">{entries.length} konten</div>
    </section>
  );
}