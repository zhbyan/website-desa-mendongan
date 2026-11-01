import Link from "next/link";
import { Suspense } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { getAdminContext } from "@/lib/supabase/admin-auth";
import { redirect } from "next/navigation";
import LoginForm, { LoginBrand } from "./LoginForm";

async function AdminLoginContent() {
  if (isSupabaseConfigured() && await getAdminContext()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f3] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#e2e9e2] bg-white shadow-[0_18px_60px_rgba(17,54,35,0.08)] lg:grid-cols-[1fr_0.85fr]">
        <section className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden bg-[#073e2d] p-10 text-white lg:flex">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(#b5d8be 0.7px, transparent 0.7px)", backgroundSize: "18px 18px" }} />
          <div className="relative flex items-center gap-3">
            <LoginBrand />
            <div>
              <p className="font-[family-name:var(--font-bricolage)] text-sm font-bold">Desa Mendongan</p>
              <p className="text-[10px] text-white/65">Panel pengelola</p>
            </div>
          </div>
          <div className="relative max-w-md">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9bd4aa]">Ruang kerja desa</p>
            <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-bold leading-tight">Cerita dan potensi desa, terkelola rapi.</h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">Kelola berita, UMKM, dan dokumentasi kegiatan dari satu tempat.</p>
          </div>
          <p className="relative text-[11px] text-white/55">Desa Mendongan · Sumowono, Kabupaten Semarang</p>
        </section>

        <section className="flex min-h-[560px] flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="mb-7 lg:hidden"><LoginBrand /></div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#668072]">Admin desa</p>
          <h2 className="mt-2 font-[family-name:var(--font-bricolage)] text-3xl font-bold text-[#18271e]">Masuk ke panel</h2>
          <p className="mt-2 text-sm leading-6 text-[#6d7971]">Gunakan akun pengelola yang telah didaftarkan.</p>
          <LoginForm configured={isSupabaseConfigured()} />
          <Link className="mt-8 text-center text-xs font-semibold text-[#426550] hover:text-[#064e3b]" href="/">Kembali ke situs desa</Link>
        </section>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return <Suspense fallback={<main className="min-h-screen animate-pulse bg-[#f4f7f3]" />}><AdminLoginContent /></Suspense>;
}