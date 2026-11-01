"use client";

import { useActionState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { deleteGalleryAlbum, saveGalleryAlbum, type AdminActionState } from "@/app/admin/actions";
import type { AlbumOption } from "./ContentManager";

const initialState: AdminActionState = { message: "", status: "idle" };

export default function GalleryAlbums({ albums }: { albums: AlbumOption[] }) {
  const [state, formAction, pending] = useActionState(saveGalleryAlbum, initialState);
  useEffect(() => {
    if (state.status === "success") document.querySelector<HTMLFormElement>("[data-album-form]")?.reset();
  }, [state.status]);

  return (
    <section className="rounded-xl border border-[#e1e8e1] bg-white">
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div><h2 className="font-[family-name:var(--font-bricolage)] text-base font-bold">Album foto</h2><p className="mt-1 text-xs text-[#778279]">Kelompokkan dokumentasi kegiatan.</p></div>
        <form action={formAction} className="flex w-full gap-2 sm:max-w-sm" data-album-form>
          <input aria-label="Nama album baru" className="h-10 min-w-0 flex-1 rounded-lg border border-[#dce4dc] px-3 text-xs outline-none focus:border-[#1a5c3a]" name="name" placeholder="Contoh: Kegiatan Desa" required />
          <button aria-label="Tambah album" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#064e3b] text-white hover:bg-[#0b6848] disabled:opacity-60" disabled={pending} type="submit"><Plus size={17} /></button>
        </form>
      </div>
      {state.message && <p aria-live="polite" className={`mx-4 mb-3 rounded-lg px-3 py-2 text-xs font-semibold sm:mx-6 ${state.status === "error" ? "bg-[#fff0ed] text-[#9d3d31]" : "bg-[#e7f5ec] text-[#155b39]"}`}>{state.message}</p>}
      {albums.length > 0 && <ul className="divide-y divide-[#edf0ed] border-t border-[#edf0ed]">
        {albums.map((album) => <li className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-6" key={album.id}>
          <span className="text-xs font-semibold text-[#354238]">{album.name}</span>
          <form action={deleteGalleryAlbum} onSubmit={(event) => { if (!window.confirm(`Hapus album ${album.name}? Foto di dalam album tetap tersimpan.`)) event.preventDefault(); }}>
            <input name="id" type="hidden" value={album.id} />
            <button aria-label={`Hapus album ${album.name}`} className="flex size-8 items-center justify-center rounded-md text-[#7c716d] hover:bg-[#fff0ed] hover:text-[#a33e32]" type="submit"><Trash2 size={15} /></button>
          </form>
        </li>)}
      </ul>}
    </section>
  );
}