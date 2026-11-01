"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpenText,
  Images,
  LayoutDashboard,
  LogOut,
  Settings2,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { signOutAdmin } from "@/app/admin/actions";

const links: Array<{ href: string; label: string; icon: LucideIcon; disabled?: boolean }> = [
  { href: "/admin", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/admin/berita", label: "Berita", icon: BookOpenText },
  { href: "/admin/umkm", label: "UMKM", icon: Sprout },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
  { href: "/admin/profil", label: "Profil Desa", icon: Settings2 },
];

function AdminNavigation({ mobile = false, previewMode = false }: { mobile?: boolean; previewMode?: boolean }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigasi admin" className={mobile ? "grid grid-cols-3 gap-1 px-4 pb-3" : "space-y-1"}>
      {links.map(({ href, label, icon: Icon, disabled }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        const className = `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${active
          ? "bg-[#e5f3ec] text-[#064e3b]"
          : disabled
            ? "cursor-not-allowed text-[#7b857e]/60"
            : "text-[#46534a] hover:bg-[#f2f6f2] hover:text-[#064e3b]"
          }`;

        const target = previewMode ? `/admin/preview#${href === "/admin" ? "ringkasan" : href.split("/").pop()}` : href;

        return disabled ? (
          <span aria-disabled="true" className={className} key={href} title="Segera tersedia">
            <Icon size={18} strokeWidth={1.8} />
            {label}
            <span className="ml-auto text-[10px] font-bold uppercase tracking-wide">Nanti</span>
          </span>
        ) : (
          <Link aria-current={active ? "page" : undefined} className={className} href={target} key={href}>
            <Icon size={18} strokeWidth={1.8} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminShell({ children, displayName, previewMode = false }: { children: ReactNode; displayName: string | null; previewMode?: boolean }) {
  return (
    <div className="min-h-screen bg-[#f5f7f4] text-[#17221b] md:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[#e4e9e4] bg-white px-4 py-5 md:flex">
        <Link className="mb-9 flex items-center gap-3 px-2" href="/admin" aria-label="Dashboard Desa Mendongan">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#064e3b] text-white">
            <Sprout size={21} />
          </span>
          <span className="min-w-0">
            <span className="block font-[family-name:var(--font-bricolage)] text-sm font-bold leading-tight">Desa Mendongan</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#78837a]">Panel pengelola</span>
          </span>
        </Link>

        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#879187]">Menu utama</p>
        <AdminNavigation previewMode={previewMode} />

        <div className="mt-auto border-t border-[#e9ede9] pt-4">
          <Link className="mb-3 flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-[#46534a] hover:bg-[#f2f6f2]" href="/">
            <span className="flex items-center gap-3"><ArrowUpRight size={18} /> Lihat situs</span>
          </Link>
          {!previewMode && <form action={signOutAdmin}>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#657168] hover:bg-[#fff1ef] hover:text-[#a33e32]" type="submit">
              <LogOut size={18} /> Keluar
            </button>
          </form>}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="border-b border-[#e4e9e4] bg-white">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-9">
            <div className="flex items-center gap-3 md:hidden">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#064e3b] text-white"><Sprout size={19} /></span>
              <span className="font-[family-name:var(--font-bricolage)] text-sm font-bold">Admin Mendongan</span>
            </div>
            <div className="hidden md:block">
              <p className="text-xs text-[#778179]">Pengelolaan konten desa</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-right sm:block">
                <span className="block text-xs font-bold">{previewMode ? "Pratinjau Admin" : displayName || "Admin Desa"}</span>
                <span className="block text-[10px] text-[#778179]">{previewMode ? "Hanya untuk dilihat" : "Pengelola"}</span>
              </span>
              <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-[#e5f3ec] text-xs font-extrabold text-[#064e3b]">
                {(displayName || "AD").slice(0, 2).toUpperCase()}
              </span>
              {!previewMode && <form action={signOutAdmin} className="md:hidden">
                <button aria-label="Keluar" className="flex size-9 items-center justify-center rounded-lg text-[#647168] hover:bg-[#f2f6f2]" type="submit"><LogOut size={18} /></button>
              </form>}
            </div>
          </div>
          <div className="md:hidden"><AdminNavigation mobile /></div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
          {children}
        </main>
        <footer className="px-4 pb-6 text-center text-[11px] text-[#879187] sm:px-6 lg:px-9">Panel pengelola Desa Mendongan</footer>
      </div>
    </div>
  );
}