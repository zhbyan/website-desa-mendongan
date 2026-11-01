import ContentManager, { type AlbumOption, type CmsEntry } from "@/components/admin/ContentManager";
import GalleryAlbums from "@/components/admin/GalleryAlbums";
import { requireAdmin } from "@/lib/supabase/admin-auth";

export default async function AdminGalleryPage() {
  const { supabase } = await requireAdmin();
  const [itemsResult, albumsResult] = await Promise.all([
    supabase.from("gallery_items").select("*").order("sort_order").order("created_at", { ascending: false }),
    supabase.from("gallery_albums").select("id, name").order("sort_order").order("name"),
  ]);
  const databaseError = itemsResult.error || albumsResult.error;

  return (
    <div className="space-y-6">
      <header><p className="text-xs font-semibold text-[#6f7d73]">Dokumentasi desa</p><h1 className="mt-1 font-[family-name:var(--font-bricolage)] text-3xl font-bold tracking-tight">Galeri</h1><p className="mt-2 text-sm text-[#738078]">Unggah foto dan susun dokumentasi ke dalam album.</p></header>
      {databaseError ? <p className="rounded-lg border border-[#e8d7a9] bg-[#fff9e9] px-4 py-3 text-xs text-[#715c22]">Tabel galeri belum tersedia. Pastikan migration CMS sudah dijalankan.</p> : <>
        <GalleryAlbums albums={(albumsResult.data ?? []) as AlbumOption[]} />
        <ContentManager albums={(albumsResult.data ?? []) as AlbumOption[]} entries={(itemsResult.data ?? []) as CmsEntry[]} kind="gallery_items" />
      </>}
    </div>
  );
}