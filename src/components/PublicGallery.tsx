"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getPublishedCmsContent } from "@/app/public-cms";

type GalleryPhoto = {
  id: string;
  album_id: string | null;
  title: string;
  caption: string;
  image_url: string;
};

type GalleryAlbum = { id: string; name: string };

export default function PublicGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [activeAlbum, setActiveAlbum] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedCmsContent()
      .then((content) => {
        setPhotos((content?.gallery ?? []) as GalleryPhoto[]);
        setAlbums((content?.albums ?? []) as GalleryAlbum[]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedPhoto) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedPhoto]);

  const visiblePhotos = activeAlbum === "all"
    ? photos
    : photos.filter((photo) => photo.album_id === activeAlbum);

  return (
    <section aria-label="Dokumentasi kegiatan" className="pt-2">
      <div className="mb-7 flex flex-col gap-4 border-b border-[#e5ebe5] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-bricolage)] text-xl font-bold text-[#17221b]">Dokumentasi kegiatan</h2>
          <p className="mt-1 text-xs text-[#718077]">{loading ? "Memuat foto..." : `${visiblePhotos.length} foto`}</p>
        </div>
        <div aria-label="Filter album" className="flex flex-wrap gap-2">
          <button aria-pressed={activeAlbum === "all"} className={`rounded-full px-4 py-2 text-xs font-bold transition ${activeAlbum === "all" ? "bg-[#064e3b] text-white" : "bg-[#e5f3ec] text-[#24583a] hover:bg-[#d6eadb]"}`} onClick={() => setActiveAlbum("all")} type="button">Semua</button>
          {albums.map((album) => (
            <button aria-pressed={activeAlbum === album.id} className={`rounded-full px-4 py-2 text-xs font-bold transition ${activeAlbum === album.id ? "bg-[#064e3b] text-white" : "bg-[#e5f3ec] text-[#24583a] hover:bg-[#d6eadb]"}`} key={album.id} onClick={() => setActiveAlbum(album.id)} type="button">{album.name}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div aria-label="Memuat foto" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }, (_, index) => <div className="aspect-[4/3] animate-pulse rounded-lg bg-[#edf2ed]" key={index} />)}
        </div>
      ) : visiblePhotos.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visiblePhotos.map((photo) => (
            <figure className="min-w-0" key={photo.id}>
              <button aria-label={`Perbesar ${photo.title || photo.caption || "foto kegiatan"}`} className="group block aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#edf2ed]" onClick={() => setSelectedPhoto(photo)} type="button">
                <img alt={photo.title || photo.caption || "Dokumentasi Desa Mendongan"} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" src={photo.image_url} />
              </button>
              {(photo.title || photo.caption) && <figcaption className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#536057]">{photo.title || photo.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ) : (
        <div className="border-y border-dashed border-[#d7e2d8] py-16 text-center">
          <p className="font-[family-name:var(--font-bricolage)] text-lg font-bold text-[#26342a]">{photos.length ? "Belum ada foto di album ini" : "Belum ada foto yang dipublikasikan"}</p>
          <p className="mt-2 text-sm text-[#718077]">Foto yang diterbitkan dari panel admin akan tampil di sini.</p>
          {activeAlbum !== "all" && <button className="mt-4 text-xs font-bold text-[#12603e] hover:underline" onClick={() => setActiveAlbum("all")} type="button">Lihat semua foto</button>}
        </div>
      )}

      {selectedPhoto && (
        <div aria-label="Pratinjau foto" aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4" onClick={() => setSelectedPhoto(null)} role="dialog">
          <button aria-label="Tutup pratinjau" className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setSelectedPhoto(null)} type="button"><X size={20} /></button>
          <figure className="max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img alt={selectedPhoto.title || selectedPhoto.caption || "Dokumentasi Desa Mendongan"} className="max-h-[78vh] max-w-full rounded-lg object-contain" src={selectedPhoto.image_url} />
            {(selectedPhoto.title || selectedPhoto.caption) && <figcaption className="mt-3 text-center text-sm text-white">{selectedPhoto.title || selectedPhoto.caption}</figcaption>}
          </figure>
        </div>
      )}
    </section>
  );
}