"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mergeSiteProfile } from "@/lib/site-profile";

export type AdminActionState = {
  message: string;
  status: "idle" | "success" | "error";
};

type CmsKind = "articles" | "umkm" | "gallery_items";
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function makeSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isCmsKind(value: string): value is CmsKind {
  return value === "articles" || value === "umkm" || value === "gallery_items";
}

async function uploadImage(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  file: FormDataEntryValue | null,
  folder: string,
) {
  if (!(file instanceof File) || file.size === 0) return null;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type) || file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Pilih gambar JPG, PNG, atau WebP dengan ukuran maksimal 10 MB.");
  }

  const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("cms-media").upload(path, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(`Gagal mengunggah gambar: ${error.message}`);
  return supabase.storage.from("cms-media").getPublicUrl(path).data.publicUrl;
}

function storagePath(imageUrl: string) {
  const marker = "/storage/v1/object/public/cms-media/";
  const markerIndex = imageUrl.indexOf(marker);
  return markerIndex < 0 ? null : decodeURIComponent(imageUrl.slice(markerIndex + marker.length));
}

export async function signInAdmin(_previous: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { message: "Masukkan email dan kata sandi.", status: "error" };

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { message: "Email atau kata sandi tidak cocok.", status: "error" };

  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  const { data: admin } = typeof userId === "string"
    ? await supabase.from("admin_users").select("user_id").eq("user_id", userId).maybeSingle()
    : { data: null };

  if (!admin) {
    await supabase.auth.signOut();
    return { message: "Akun ini belum diberi akses admin oleh pengelola situs.", status: "error" };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveCmsEntry(
  _previous: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    const admin = await requireAdmin();
    const kindValue = text(formData, "kind");
    if (!isCmsKind(kindValue)) return { message: "Jenis konten tidak dikenal.", status: "error" };

    const id = text(formData, "id");
    const imageColumn = kindValue === "articles" ? "cover_image" : kindValue === "umkm" ? "photo_url" : "image_url";
    const existingResult = id
      ? await admin.supabase.from(kindValue).select(imageColumn).eq("id", id).maybeSingle()
      : { data: null, error: null };
    if (existingResult.error) throw new Error(existingResult.error.message);
    const existingImage = existingResult.data
      ? (existingResult.data as unknown as Record<string, string | null>)[imageColumn]
      : null;
    const status = text(formData, "status");
    const isPublished = status === "published";
    let uploadedImage: string | null = null;
    let values: Record<string, string | boolean | null>;

    if (kindValue === "articles") {
      const title = text(formData, "title");
      if (!title) return { message: "Judul berita wajib diisi.", status: "error" };
      const image = await uploadImage(admin.supabase, formData.get("image"), "articles");
      uploadedImage = image;
      values = {
        slug: makeSlug(title),
        title,
        excerpt: text(formData, "excerpt"),
        content: text(formData, "content"),
        category: text(formData, "category") || "Kegiatan",
        cover_image: image || text(formData, "current_image") || null,
        status: isPublished ? "published" : "draft",
        published_at: isPublished ? new Date().toISOString() : null,
        created_by: admin.userId,
      };
    } else if (kindValue === "umkm") {
      const name = text(formData, "name");
      if (!name) return { message: "Nama UMKM wajib diisi.", status: "error" };
      const image = await uploadImage(admin.supabase, formData.get("image"), "umkm");
      uploadedImage = image;
      values = {
        slug: makeSlug(name),
        name,
        category: text(formData, "category") || "Pertanian",
        owner_name: text(formData, "owner_name"),
        description: text(formData, "description"),
        price_range: text(formData, "price_range") || "Hubungi pemilik",
        dusun: text(formData, "dusun"),
        whatsapp: text(formData, "whatsapp"),
        photo_url: image || text(formData, "current_image") || null,
        status: isPublished ? "published" : "draft",
        is_featured: formData.get("is_featured") === "on",
        created_by: admin.userId,
      };
    } else {
      const title = text(formData, "title");
      const image = await uploadImage(admin.supabase, formData.get("image"), "gallery");
      uploadedImage = image;
      const imageUrl = image || text(formData, "current_image");
      if (!imageUrl) return { message: "Foto galeri wajib diunggah.", status: "error" };
      values = {
        title,
        caption: text(formData, "caption"),
        image_url: imageUrl,
        album_id: text(formData, "album_id") || null,
        is_published: isPublished,
        created_by: admin.userId,
      };
    }

    const query = admin.supabase.from(kindValue);
    const result = id
      ? await query.update(values).eq("id", id)
      : await query.insert(values);
    if (result.error) {
      const failedUploadPath = uploadedImage ? storagePath(uploadedImage) : null;
      if (failedUploadPath) await admin.supabase.storage.from("cms-media").remove([failedUploadPath]);
      throw new Error(result.error.message);
    }
    const previousPath = existingImage ? storagePath(existingImage) : null;
    if (uploadedImage && previousPath) await admin.supabase.storage.from("cms-media").remove([previousPath]);

    revalidatePath("/admin");
    revalidatePath(`/admin/${kindValue === "articles" ? "berita" : kindValue === "umkm" ? "umkm" : "galeri"}`);
    revalidatePath("/");
    revalidatePath("/berita");
    revalidatePath("/potensi-umkm");
    return { message: "Perubahan berhasil disimpan.", status: "success" };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Konten belum berhasil disimpan.",
      status: "error",
    };
  }
}

export async function deleteCmsEntry(formData: FormData) {
  const admin = await requireAdmin();
  const kindValue = text(formData, "kind");
  const id = text(formData, "id");
  if (!isCmsKind(kindValue) || !id) return;

  const imageColumn = kindValue === "articles" ? "cover_image" : kindValue === "umkm" ? "photo_url" : "image_url";
  const { data: entry } = await admin.supabase.from(kindValue).select(imageColumn).eq("id", id).maybeSingle();
  const imageUrl = entry ? (entry as unknown as Record<string, string | null>)[imageColumn] : null;
  const { error } = await admin.supabase.from(kindValue).delete().eq("id", id);
  if (error) throw new Error(error.message);

  const path = typeof imageUrl === "string" ? storagePath(imageUrl) : null;
  if (path) await admin.supabase.storage.from("cms-media").remove([path]);

  revalidatePath("/admin");
  revalidatePath(`/admin/${kindValue === "articles" ? "berita" : kindValue === "umkm" ? "umkm" : "galeri"}`);
  revalidatePath("/");
  revalidatePath("/berita");
  revalidatePath("/potensi-umkm");
}

export async function saveGalleryAlbum(_previous: AdminActionState, formData: FormData): Promise<AdminActionState> {
  try {
    const admin = await requireAdmin();
    const name = text(formData, "name");
    if (!name) return { message: "Nama album wajib diisi.", status: "error" };
    const slug = makeSlug(name);
    const { error } = await admin.supabase.from("gallery_albums").insert({ name, slug });
    if (error) throw new Error(error.message);
    revalidatePath("/admin/galeri");
    return { message: "Album berhasil dibuat.", status: "success" };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Album belum berhasil dibuat.", status: "error" };
  }
}

export async function deleteGalleryAlbum(formData: FormData) {
  const admin = await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;
  const { error } = await admin.supabase.from("gallery_albums").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/galeri");
}

export async function saveSiteProfile(
  _previous: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const uploadedImages: string[] = [];
  let adminContext: Awaited<ReturnType<typeof requireAdmin>> | null = null;

  try {
    const admin = await requireAdmin();
    adminContext = admin;
    const rawProfile = text(formData, "profile");
    let profile: ReturnType<typeof mergeSiteProfile>;

    try {
      profile = mergeSiteProfile(JSON.parse(rawProfile));
    } catch {
      return { message: "Data profil tidak valid. Muat ulang halaman lalu coba lagi.", status: "error" };
    }

    if (!profile.welcome.name.trim()) {
      return { message: "Nama kepala desa wajib diisi.", status: "error" };
    }

    const { data: existingProfile } = await admin.supabase.from("site_profile").select("data").eq("id", "main").maybeSingle();
    const previousData = existingProfile?.data as ReturnType<typeof mergeSiteProfile> | undefined;
    const welcomeImage = await uploadImage(admin.supabase, formData.get("welcome_image"), "profile");
    if (welcomeImage) {
      uploadedImages.push(welcomeImage);
      profile.welcome.imageUrl = welcomeImage;
    }

    for (const official of profile.structure.officials) {
      const image = await uploadImage(admin.supabase, formData.get(`official_image_${official.id}`), "profile/officials");
      if (image) {
        uploadedImages.push(image);
        official.photoUrl = image;
      }
    }

    const { error } = await admin.supabase.from("site_profile").upsert({ id: "main", data: profile });
    if (error) {
      const failedUploadPaths = uploadedImages.map(storagePath).filter((path): path is string => Boolean(path));
      if (failedUploadPaths.length) await admin.supabase.storage.from("cms-media").remove(failedUploadPaths);
      throw new Error(error.message);
    }

    const previousImages = [previousData?.welcome.imageUrl, ...previousData?.structure.officials.map((official) => official.photoUrl) ?? []]
      .filter((url): url is string => Boolean(url));
    const currentImages = [profile.welcome.imageUrl, ...profile.structure.officials.map((official) => official.photoUrl)];
    const replacedImages = previousImages.filter((url) => !currentImages.includes(url));
    const replacedPaths = replacedImages.map(storagePath).filter((path): path is string => Boolean(path));
    if (replacedPaths.length) await admin.supabase.storage.from("cms-media").remove(replacedPaths);

    revalidatePath("/");
    revalidatePath("/profil/visi-misi");
    revalidatePath("/profil/struktur");
    revalidatePath("/admin/profil");
    return { message: "Profil desa berhasil disimpan.", status: "success" };
  } catch (error) {
    const failedUploadPaths = uploadedImages.map(storagePath).filter((path): path is string => Boolean(path));
    if (adminContext && failedUploadPaths.length) await adminContext.supabase.storage.from("cms-media").remove(failedUploadPaths);
    return {
      message: error instanceof Error ? error.message : "Profil desa belum berhasil disimpan.",
      status: "error",
    };
  }
}