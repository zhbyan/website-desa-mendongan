"use client";

import { useActionState } from "react";
import { KeyRound, Mail, Sprout } from "lucide-react";
import { signInAdmin, type AdminActionState } from "@/app/admin/actions";

const initialState: AdminActionState = { message: "", status: "idle" };

export default function LoginForm({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState(signInAdmin, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs font-bold text-[#334238]">Email admin</span>
        <span className="relative block">
          <Mail aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#829087]" size={17} />
          <input autoComplete="username" className="h-12 w-full rounded-lg border border-[#dce4dc] bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#1a5c3a] focus:ring-3 focus:ring-[#1a5c3a]/10" name="email" required type="email" />
        </span>
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-bold text-[#334238]">Kata sandi</span>
        <span className="relative block">
          <KeyRound aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#829087]" size={17} />
          <input autoComplete="current-password" className="h-12 w-full rounded-lg border border-[#dce4dc] bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#1a5c3a] focus:ring-3 focus:ring-[#1a5c3a]/10" name="password" required type="password" />
        </span>
      </label>
      {state.message && (
        <p aria-live="polite" className={`rounded-lg px-3.5 py-3 text-xs font-semibold ${state.status === "error" ? "bg-[#fff0ed] text-[#9d3d31]" : "bg-[#e7f5ec] text-[#155b39]"}`}>
          {state.message}
        </p>
      )}
      {!configured && (
        <p className="rounded-lg border border-[#e8d7a9] bg-[#fff9e9] px-3.5 py-3 text-xs leading-relaxed text-[#715c22]">
          Supabase belum dikonfigurasi. Tambahkan URL dan publishable key di <code>.env.local</code>, lalu jalankan migration CMS.
        </p>
      )}
      <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#064e3b] text-sm font-bold text-white transition hover:bg-[#0b6848] disabled:cursor-not-allowed disabled:opacity-50" disabled={!configured || pending} type="submit">
        {pending ? "Memeriksa akses..." : "Masuk ke panel"}
      </button>
      <p className="text-center text-[11px] leading-relaxed text-[#78837a]">Akses hanya untuk akun pengelola yang telah didaftarkan.</p>
    </form>
  );
}

export function LoginBrand() {
  return <span className="flex size-12 items-center justify-center rounded-xl bg-[#064e3b] text-white"><Sprout size={24} /></span>;
}