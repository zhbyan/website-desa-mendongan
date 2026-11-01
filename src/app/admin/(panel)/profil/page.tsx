import SiteProfileManager from "@/components/admin/SiteProfileManager";
import { EMPTY_SITE_PROFILE, mergeSiteProfile } from "@/lib/site-profile";
import { requireAdmin } from "@/lib/supabase/admin-auth";

export default async function AdminProfilePage() {
    const { supabase } = await requireAdmin();
    const { data, error } = await supabase.from("site_profile").select("data").eq("id", "main").maybeSingle();

    return (
        <div className="space-y-6">
            <header>
                <p className="text-xs font-semibold text-[#6f7d73]">Konten dan identitas desa</p>
                <h1 className="mt-1 font-[family-name:var(--font-bricolage)] text-3xl font-bold tracking-tight">Profil Desa</h1>
                <p className="mt-2 text-sm text-[#738078]">Ubah sambutan beranda, visi-misi, serta susunan aparatur dan lembaga.</p>
            </header>
            {error && <p className="rounded-lg border border-[#e8d7a9] bg-[#fff9e9] px-4 py-3 text-xs leading-relaxed text-[#715c22]">Tabel profil belum tersedia. Jalankan migration <code>supabase/migrations/20261029000000_site_profile.sql</code> di Supabase, lalu muat ulang halaman ini.</p>}
            <SiteProfileManager initialProfile={mergeSiteProfile(data?.data ?? EMPTY_SITE_PROFILE)} />
        </div>
    );
}