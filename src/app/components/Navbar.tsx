"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { IMG } from "./shared";

const profilLinks = [
  { label: "Sejarah Desa", href: "/profil/sejarah", desc: "Asal-usul & linimasa perkembangan", icon: "history_edu" },
  { label: "Visi & Misi", href: "/profil/visi-misi", desc: "Arah pembangunan & pilar kemandirian", icon: "flag" },
  { label: "Struktur Organisasi", href: "/profil/struktur", desc: "Perangkat pemdes & lembaga desa", icon: "badge" },
  { label: "Demografi & Kependudukan", href: "/profil/demografi", desc: "Statistik kependudukan & usia warga", icon: "groups" },
];

const menuLinks = [
  { label: "Potensi & UMKM", href: "/potensi-umkm" },
  { label: "Wilayah & Peta", href: "/wilayah-peta" },
  { label: "Berita & Dokumentasi", href: "/berita" },
  { label: "Kontak & Layanan", href: "/kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilDropdownOpen, setProfilDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";

  // Detect scroll untuk ubah navbar dari transparan ke solid
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfilDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfilDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isProfilActive = pathname.startsWith("/profil");

  // Transparan di homepage saat belum scroll, solid di halaman lain
  const isTransparent = isHome && !scrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
          ? "bg-transparent border-b border-white/10"
          : "bg-white/97 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_12px_rgba(26,92,58,0.07)]"
        }`}
    >
      <div className="w-full h-[68px] px-5 lg:px-12 xl:px-16 flex items-center justify-between gap-6">

        {/* Logo & Nama Desa */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <img
            alt="Logo Desa Mendongan"
            className={`h-9 w-auto object-contain transition-all ${isTransparent ? "brightness-0 invert" : ""}`}
            src={IMG.logo}
          />
          <div className="flex flex-col">
            <span className={`font-bold text-[15px] tracking-tight leading-tight transition-colors ${isTransparent ? "text-white" : "text-[#1a5c3a]"}`}>
              Desa Mendongan
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-widest mt-0.5 transition-colors ${isTransparent ? "text-white/60" : "text-gray-400"}`}>
              Kec. Sumowono, Kab. Semarang
            </span>
          </div>
        </Link>

        {/* Nav Links dalam border pill — desktop */}
        <div className="hidden xl:flex items-center gap-3">
          <nav className={`flex items-center gap-0.5 border rounded-full px-1.5 py-1.5 transition-all duration-300 ${isTransparent
              ? "border-white/25 bg-white/10 backdrop-blur-sm"
              : "border-gray-200 bg-white shadow-sm"
            }`}>

            {/* Beranda */}
            <Link
              href="/"
              className={`text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${isActive("/")
                  ? "bg-[#1a5c3a] text-white shadow-sm"
                  : isTransparent
                    ? "text-white/85 hover:text-white hover:bg-white/15"
                    : "text-gray-600 hover:text-[#1a5c3a] hover:bg-[#e5f3ec]"
                }`}
            >
              Beranda
            </Link>

            {/* Profil Desa Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setProfilDropdownOpen(true)}
              onMouseLeave={() => setProfilDropdownOpen(false)}
            >
              <button
                onClick={() => setProfilDropdownOpen(!profilDropdownOpen)}
                className={`flex items-center gap-1 text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${isProfilActive
                    ? "bg-[#1a5c3a] text-white shadow-sm"
                    : isTransparent
                      ? "text-white/85 hover:text-white hover:bg-white/15"
                      : "text-gray-600 hover:text-[#1a5c3a] hover:bg-[#e5f3ec]"
                  }`}
                type="button"
                aria-expanded={profilDropdownOpen}
              >
                <span>Profil Desa</span>
                <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${profilDropdownOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>

              {profilDropdownOpen && (
                <div className="absolute top-full right-0 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="w-[320px] bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col gap-0.5 overflow-hidden">
                    <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Profil Desa</span>
                    </div>
                    {profilLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${isActive(item.href)
                            ? "bg-[#e5f3ec] text-[#1a5c3a] font-bold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#1a5c3a]"
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive(item.href) ? "bg-[#1a5c3a] text-white" : "bg-[#e5f3ec] text-[#1a5c3a]"
                          }`}>
                          <span className="material-symbols-outlined text-sm">{item.icon}</span>
                        </div>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <div className="text-sm font-semibold truncate">{item.label}</div>
                          <div className="text-[11px] text-gray-400 truncate mt-0.5">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Menu lainnya */}
            {menuLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${isActive(item.href)
                    ? "bg-[#1a5c3a] text-white shadow-sm"
                    : isTransparent
                      ? "text-white/85 hover:text-white hover:bg-white/15"
                      : "text-gray-600 hover:text-[#1a5c3a] hover:bg-[#e5f3ec]"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Tombol Hamburger Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`xl:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors ml-auto ${isTransparent
              ? "bg-white/15 text-white hover:bg-white/25"
              : "bg-[#e5f3ec] text-[#1a5c3a] hover:bg-[#d5eadc]"
            }`}
          type="button"
          aria-label="Buka Menu"
        >
          <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white/98 backdrop-blur-lg px-5 py-5 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            <Link href="/" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${isActive("/") ? "bg-[#1a5c3a] text-white" : "text-gray-700 hover:bg-[#e5f3ec]"}`}>
              <span className="material-symbols-outlined text-base">home</span>
              <span>Beranda</span>
            </Link>
            <div className="pt-2 pb-1">
              <span className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Profil Desa</span>
            </div>
            {profilLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold pl-6 ${isActive(item.href) ? "bg-[#e5f3ec] text-[#1a5c3a]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <span className="material-symbols-outlined text-base text-[#1a5c3a]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-3 pb-1 border-t border-gray-100 mt-1">
              <span className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Menu Utama</span>
            </div>
            {menuLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${isActive(item.href) ? "bg-[#1a5c3a] text-white" : "text-gray-700 hover:bg-[#e5f3ec]"}`}
              >
                <span className="material-symbols-outlined text-base">
                  {item.href.includes("potensi") ? "storefront" : item.href.includes("wilayah") ? "map" : item.href.includes("galeri") ? "photo_library" : item.href.includes("berita") ? "newspaper" : "support_agent"}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
