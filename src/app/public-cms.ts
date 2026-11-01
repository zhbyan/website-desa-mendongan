"use server";

import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function getPublishedCmsContent() {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createSupabaseServerClient();
    const [articles, umkm, gallery, albums, profileResult] = await Promise.all([
      supabase
        .from("articles")
        .select("id, slug, title, excerpt, content, category, cover_image, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false }),
      supabase
        .from("umkm")
        .select("id, name, category, owner_name, description, dusun, whatsapp, photo_url, price_range, is_featured")
        .eq("status", "published")
        .order("is_featured", { ascending: false })
        .order("name"),
      supabase
        .from("gallery_items")
        .select("id, album_id, title, caption, image_url, created_at")
        .eq("is_published", true)
        .order("sort_order")
        .order("created_at", { ascending: false }),
      supabase
        .from("gallery_albums")
        .select("id, name, slug")
        .eq("is_published", true)
        .order("sort_order")
        .order("name"),
      supabase.from("site_profile").select("data").eq("id", "main").maybeSingle(),
    ]);

    return {
      articles: articles.error ? [] : articles.data ?? [],
      umkm: umkm.error ? [] : umkm.data ?? [],
      gallery: gallery.error ? [] : gallery.data ?? [],
      albums: albums.error ? [] : albums.data ?? [],
      profile: profileResult.error ? null : profileResult.data?.data ?? null,
    };
  } catch {
    return null;
  }
}

export async function getPublishedSiteProfile() {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("site_profile").select("data").eq("id", "main").maybeSingle();
    if (error) return null;
    return data?.data ?? null;
  } catch {
    return null;
  }
}