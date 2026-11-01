"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IMG } from "./shared";

const navCepat = [
  { label: "Beranda", href: "/" },
  { label: "Sejarah Desa", href: "/profil/sejarah" },
  { label: "Visi & Misi", href: "/profil/visi-misi" },
  { label: "Potensi & UMKM", href: "/potensi-umkm" },
  { label: "Berita & Dokumentasi", href: "/berita" },
  { label: "Layanan Administrasi", href: "/kontak" },
];

const aksesWilayah = [
  { label: "Peta Digital Desa", href: "/wilayah-peta" },
  { label: "Statistik Demografi", href: "/profil/demografi" },
  { label: "Aparatur Desa", href: "/profil/struktur" },
  { label: "Pusat Pengaduan", href: "/kontak" },
];

const socials = [
  { label: "Facebook", icon: "public", href: "#" },
  { label: "Instagram", icon: "photo_camera", href: "#" },
  { label: "YouTube", icon: "smart_display", href: "#" },
  { label: "Email", icon: "mail", href: "mailto:desa@mendongan.id" },
];

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer className="w-full bg-[#141a15] text-white mt-auto">
      <div className="w-full px-5 lg:px-12 xl:px-16 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <img alt="Logo Desa Mendongan" className="h-9 w-auto object-contain brightness-0 invert" src={IMG.logo} />
              <div>
                <div className="font-bold text-sm text-white leading-tight">Pemerintah Desa Mendongan</div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Kec. Sumowono, Kab. Semarang</div>
              </div>
            </Link>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              Portal layanan informasi publik, potensi pertanian dataran tinggi, dan ruang interaksi resmi bagi masyarakat Desa Mendongan.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-base">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Kantor */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Kantor Pelayanan</h4>
            <div className="flex items-start gap-2 text-sm text-white/60">
              <span className="material-symbols-outlined text-[#91d4a8] text-base mt-0.5 shrink-0">location_on</span>
              <span>Jl. Raya Mendongan No. 01, Kec. Sumowono, Kab. Semarang 50662</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-white/60 mt-1">
              <span className="material-symbols-outlined text-[#91d4a8] text-base mt-0.5 shrink-0">schedule</span>
              <div>
                <p className="text-white text-sm font-medium">Sen – Kam : 09.00 – 15.00 WIB</p>
                <p className="text-white text-sm font-medium">Jum : 09.00 – 11.30 WIB</p>
                <p className="text-white/40 text-xs mt-0.5">Sabtu, Minggu & Libur Nasional: Tutup</p>
              </div>
            </div>
          </div>

          {/* Nav Cepat */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Navigasi</h4>
            {navCepat.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Akses Wilayah */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Wilayah</h4>
            {aksesWilayah.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">© {year} Pemerintah Desa Mendongan. Hak Cipta Dilindungi.</p>
          <p className="text-sm text-white/40">
            Kolaborasi &amp; Pengabdian ·{" "}
            <span className="text-[#91d4a8] font-semibold">KKN Undip Tim I 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
