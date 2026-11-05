"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import PageShell from "./components/PageShell";
import { IMG, MAPS_EMBED_URL } from "./components/shared";
import { getPublishedCmsContent } from "./public-cms";
import { EMPTY_SITE_PROFILE, mergeSiteProfile } from "@/lib/site-profile";

type PublishedUmkm = {
  id: string;
  name: string;
  category: string;
  description: string;
  dusun: string;
  photo_url: string | null;
};

// ===== FILTER UMKM =====
type Category = "all" | "agri" | "craft" | "food";
const filters: { key: Category; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "agri", label: "Kopi & Tani" },
  { key: "craft", label: "Kerajinan" },
  { key: "food", label: "Kuliner" },
];

function UmkmSection({ managedUmkm }: { managedUmkm: PublishedUmkm[] | null }) {
  const [active, setActive] = useState<Category>("all");

  const filteredManagedUmkm = (managedUmkm ?? []).filter((item) => {
    if (active === "all") return true;
    if (active === "agri") return item.category === "Pertanian" || item.category === "Peternakan";
    if (active === "craft") return item.category === "Kerajinan";
    return item.category === "Kuliner";
  });
  const vis = (cat: Exclude<Category, "all">): CSSProperties => ({
    display: active === "all" || active === cat ? undefined : "none",
  });

  return (
    <section className="w-full py-14 bg-[#E5F8ED]" id="potensi-umkm">
      <div className="w-full px-5 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcefe5] mb-3">
              <span className="material-symbols-outlined text-[#064e3b] text-sm">storefront</span>
              <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">Komoditas &amp; Produk Rakyat</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[--color-on-surface] tracking-tight" style={{ fontFamily: "var(--font-bricolage)" }}>
              Potensi Desa &amp; UMKM Unggulan
            </h2>
          </div>
          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${active === f.key
                  ? "bg-[#064e3b] text-white shadow-md"
                  : "bg-[#dcefe5] text-[#064e3b] hover:bg-[#c4e4d4]"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {(managedUmkm ?? []).length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {filteredManagedUmkm?.slice(0, 6).map((item) => (
            <article className="group h-full overflow-hidden rounded-2xl border border-emerald-900/5 bg-white shadow-sm transition hover:shadow-lg" key={item.id}>
              <div className="h-44 overflow-hidden bg-[#dcefe5]">
                {item.photo_url && <img alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={item.photo_url} />}
              </div>
              <div className="p-4">
                <p className="mb-2 text-[11px] font-bold text-[#12603e]">{item.category}{item.dusun ? ` · ${item.dusun}` : ""}</p>
                <h3 className="font-[family-name:var(--font-bricolage)] text-base font-bold text-[#18271e]">{item.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-[#647168]">{item.description}</p>
                <Link className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#064e3b]" href="/potensi-umkm">Lihat detail <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
          {filteredManagedUmkm?.length === 0 && <p className="col-span-full rounded-xl border border-dashed border-[#bfd3c3] px-5 py-10 text-center text-sm text-[#647168]">Belum ada UMKM yang diterbitkan pada kategori ini.</p>}
        </div>}

        {/* CTA strip */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-[3rem] bg-[#dcefe5]">
          <div>
            <p className="font-bold text-[#064e3b]" style={{ fontFamily: "var(--font-bricolage)" }}>Direktori Lengkap UMKM Desa Mendongan</p>
            <p className="text-xs text-[--color-on-surface-variant] mt-0.5">Data valid berdasarkan verifikasi langsung ke lokasi</p>
          </div>
          <Link href="/potensi-umkm" className="flex items-center gap-2 px-5 py-2.5 bg-[#064e3b] text-white rounded-full text-sm font-bold hover:opacity-85 transition-opacity shrink-0">
            Lihat 10+ UMKM <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== DATA =====
const heroStats = [
  { value: "1.368±", label: "Jiwa Penduduk", icon: "groups" },
  { value: "3 Dusun", label: "Wilayah Rukun", icon: "holiday_village" },
  { value: "10+ UMKM", label: "Binaan & Mandiri", icon: "storefront" },
  { value: "760 mdpl", label: "Hawa Sejuk Lereng", icon: "landscape" },
];

const wilayah = [
  { label: "Luas Wilayah", value: "94 Ha" },
  { label: "Batas Utara", value: "Desa Losari" },
  { label: "Batas Selatan", value: "Desa Sumowowno" },
  { label: "Batas Timur", value: "Desa Bumen" },
  { label: "Batas Barat", value: "Kec. Trayu" },
];

const dusun = [
  { name: "Dusun Gondangsari", info: "Wilayah administratif Desa Mendongan" },
  { name: "Dusun Mendongan", info: "Wilayah administratif Desa Mendongan" },
  { name: "Dusun Setro", info: "Wilayah administratif Desa Mendongan" },
];

// ===== MAIN PAGE =====
export default function Page() {
  const [managedNews, setManagedNews] = useState<Array<{ img: string; alt: string; tag: string; date: string; title: string; desc: string }>>([]);
  const [managedGallery, setManagedGallery] = useState<Array<{ src: string; alt: string }>>([]);
  const [managedUmkm, setManagedUmkm] = useState<PublishedUmkm[]>([]);
  const [welcome, setWelcome] = useState(EMPTY_SITE_PROFILE.welcome);
  const [welcomeLoaded, setWelcomeLoaded] = useState(false);

  useEffect(() => {
    getPublishedCmsContent().then((content) => {
      if (!content) {
        setManagedUmkm([]);
        setManagedNews([]);
        setManagedGallery([]);
        setWelcome(EMPTY_SITE_PROFILE.welcome);
        return;
      }

      setWelcome(mergeSiteProfile(content.profile).welcome);
      setManagedUmkm(content.umkm.length ? (content.umkm as PublishedUmkm[]) : []);
      setManagedNews(content.articles.length ? content.articles.slice(0, 3).map((article) => ({
        img: article.cover_image || IMG.berita1,
        alt: article.title,
        tag: article.category,
        date: article.published_at ? new Date(article.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "",
        title: article.title,
        desc: article.excerpt,
      })) : []);
      setManagedGallery(content.gallery.length ? content.gallery.slice(0, 3).map((photo) => ({
        src: photo.image_url,
        alt: photo.title || photo.caption || "Dokumentasi Desa Mendongan",
      })) : []);
    }).catch(() => {
      setWelcome(EMPTY_SITE_PROFILE.welcome);
    }).finally(() => setWelcomeLoaded(true));
  }, []);

  return (
    <PageShell>

      {/* ===== HERO — Full-bleed Caserta style ===== */}
      <section className="relative w-full h-screen min-h-[560px] max-h-[820px] overflow-hidden -mt-[68px]">
        <img
          src={IMG.hero}
          alt="Panorama Desa Mendongan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 w-full h-full">
          {/* Kunci posisi konten tepat di garis tengah hero */}
          <div className="absolute left-5 right-5 lg:left-12 lg:right-12 xl:left-16 xl:right-16 top-1/2 -translate-y-1/2 flex items-center">
            <div className="w-full flex items-center justify-between gap-8">
              {/* Kiri: headline + CTA */}
              <div className="max-w-4xl">
                <h1 className="mb-6 text-xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  <span className="block whitespace-nowrap">Desa <span className="text-[#91d4a8]">Mendongan</span></span>
                  <span className="block whitespace-nowrap">Tumbuh dan maju Bersama <span className="text-[#91d4a8]">Warga</span></span>
                </h1>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/potensi-umkm"
                    className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-[#1a5c3a] transition-all group"
                  >
                    Jelajahi Potensi
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                  <Link
                    href="/wilayah-peta"
                    className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/25 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">explore</span>
                    Peta Digital
                  </Link>
                </div>
              </div>

              {/* Kanan: Quote card kepala desa */}
              {welcomeLoaded && welcome.quote && <div className="hidden lg:flex flex-col gap-0 max-w-xs shrink-0">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white">
                  <span className="text-3xl text-[#91d4a8] font-serif leading-none">&quot;</span>
                  <p className="text-sm leading-relaxed text-white/90 mt-1">
                    {welcome.quote}
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/15">
                    {welcome.imageUrl && <img
                      src={welcome.imageUrl}
                      alt={welcome.name || "Kepala Desa Mendongan"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                    />}
                    {(welcome.name || welcome.position) && <div>
                      {welcome.name && <div className="text-sm font-bold text-white">{welcome.name}</div>}
                      {welcome.position && <div className="text-xs text-white/60">{welcome.position}</div>}
                    </div>}
                  </div>
                </div>
              </div>}
            </div>
          </div>

          {/* Stats bar */}
          <div className="absolute bottom-0 left-5 right-5 lg:left-12 lg:right-12 xl:left-16 xl:right-16 border-t border-white/15 py-5">
            <div className="mx-auto grid w-full max-w-5xl grid-cols-2 justify-items-center gap-x-3 gap-y-4 md:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label} className="flex w-full max-w-40 items-center justify-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-lg text-[#91d4a8]">{s.icon}</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold leading-none text-white">{s.value}</div>
                    <div className="mt-0.5 text-[11px] text-white/55">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SAMBUTAN KEPALA DESA ===== */}
      <section className="w-full py-14 bg-[--color-surface-container-lowest]">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none mt-4 ml-4">
                <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-[--color-primary]/10 -z-0" />
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl bg-[--color-surface-container] aspect-square">
                  {!welcomeLoaded ? (
                    <div aria-label="Memuat foto sambutan" aria-busy="true" className="h-full w-full animate-pulse bg-slate-200" />
                  ) : welcome.imageUrl ? (
                    <img alt={welcome.name || "Kepala Desa Mendongan"} className="w-full h-full object-cover" src={welcome.imageUrl} />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#E5F8ED] text-[#52735f]">
                      <span className="material-symbols-outlined text-5xl">person</span>
                      <span className="text-xs">Foto belum tersedia</span>
                    </div>
                  )}
                </div>
                {welcome.term && <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#064e3b] text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
                  <span className="material-symbols-outlined text-green-300 text-base">verified</span>
                  <span className="text-[11px] font-bold tracking-wider uppercase">{welcome.term}</span>
                </div>}
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-5 lg:pl-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E5F8ED] w-fit self-start">
                <span className="material-symbols-outlined text-[--color-primary] text-sm">campaign</span>
                <span className="text-xs font-bold text-[--color-primary] uppercase tracking-wide">Prakata Kepala Desa</span>
              </div>
              <div>
                <span className="text-5xl text-[#F4C053] font-serif font-black leading-none block mb-2">&quot;</span>
                <blockquote className="text-xl lg:text-2xl text-[--color-on-surface] font-medium leading-relaxed" style={{ fontFamily: "var(--font-bricolage)" }}>
                  {!welcomeLoaded ? <span className="block h-24 animate-pulse rounded-lg bg-slate-100" /> : welcome.quote}
                </blockquote>
              </div>
              {welcomeLoaded && welcome.supportingText && <p className="text-sm text-[--color-on-surface-variant] leading-relaxed">{welcome.supportingText}</p>}
              <div className="pt-3 flex items-center justify-between gap-6">
                <div>
                  {welcome.name && <h3 className="text-2xl font-bold text-[#064e3b]" style={{ fontFamily: "var(--font-bricolage)" }}>{welcome.name}</h3>}
                  {welcome.position && <p className="text-sm text-[--color-on-surface-variant]">{welcome.position}</p>}
                  {welcome.whatsapp && <a className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#064e3b] hover:underline" href={`https://wa.me/${welcome.whatsapp.replace(/\D/g, "").replace(/^0/, "62")}`} rel="noopener noreferrer" target="_blank"><span className="material-symbols-outlined text-sm">chat</span>{welcome.whatsapp}</a>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== POTENSI & UMKM ===== */}
      <UmkmSection managedUmkm={managedUmkm} />

      {/* ===== PETA & 3 DUSUN ===== */}
      <section className="w-full py-14 bg-[--color-surface-container-lowest]" id="peta-wilayah">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcefe5] mb-3">
              <span className="material-symbols-outlined text-[#064e3b] text-sm">map</span>
              <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">Geospasial &amp; Wilayah</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[--color-on-surface] tracking-tight" style={{ fontFamily: "var(--font-bricolage)" }}>
              Peta Digital &amp; Profil 3 Dusun
            </h2>
            <p className="text-sm text-[--color-on-surface-variant] mt-2">
              Jelajahi sebaran klaster UMKM, sarana pelayanan publik, serta batas geografis wilayah Desa Mendongan.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Peta */}
            <div className="lg:col-span-8 rounded-2xl bg-[--color-surface-container] shadow-md relative h-[460px] overflow-hidden">
              <iframe
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={MAPS_EMBED_URL}
                title="Peta Desa Mendongan"
              />
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-[--color-surface-container-lowest]/90 backdrop-blur-md px-3 py-2 rounded-full shadow-md">
                <Link className="px-2 py-0.5 rounded-full bg-[--color-primary] text-[--color-on-primary] text-xs font-bold hover:opacity-90" href="/wilayah-peta">Fullscreen</Link>
              </div>
            </div>
            {/* Data sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-[#dcefe5] rounded-3xl p-5">
                <h3 className="font-bold text-[#064e3b] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-bricolage)" }}>
                  <span className="material-symbols-outlined">analytics</span> Data Wilayah Administrasi
                </h3>
                <div className="space-y-2 text-sm text-[--color-on-surface-variant]">
                  {wilayah.map((w, i) => (
                    <div key={w.label} className={`flex justify-between py-1.5 ${i < wilayah.length - 1 ? "border-b border-[--color-outline-variant]/60" : ""}`}>
                      <span>{w.label}</span>
                      <span className="font-bold text-[--color-on-surface]">{w.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {dusun.map((d) => (
                  <Link key={d.name} href="/wilayah-peta" className="p-4 rounded-xl bg-[#dcefe5] hover:bg-[#c9e6d6] transition-colors flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[--color-on-surface]">{d.name}</div>
                      <div className="text-xs text-[--color-on-surface-variant] mt-0.5">{d.info}</div>
                    </div>
                    <span className="material-symbols-outlined text-[--color-primary] text-sm">chevron_right</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BERITA ===== */}
      <section className="w-full py-14 bg-[#E5F8ED]">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcefe5] mb-3">
                <span className="material-symbols-outlined text-[#064e3b] text-sm">newspaper</span>
                <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">Kabar Desa &amp; Pembangunan</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[--color-on-surface] tracking-tight" style={{ fontFamily: "var(--font-bricolage)" }}>
                Berita Terkini &amp; Informasi Warga
              </h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-bold text-[--color-primary] hover:opacity-75" href="/berita">
              <span>Arsip Berita Selengkapnya</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {managedNews.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-dashed border-[#bfd3c3] bg-white px-5 py-10 text-center text-sm text-[#647168]">
                Belum ada berita yang dipublikasikan dari admin desa.
              </div>
            ) : managedNews.map((b) => (
              <Link key={b.title} href="/berita" className="bg-[--color-surface-container-lowest] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="h-48 overflow-hidden bg-[--color-surface-container] relative">
                  <img alt={b.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={b.img} />
                  <span className="absolute top-3 left-3 bg-[#064e3b] text-white px-3 py-0.5 rounded-full text-xs font-bold">{b.tag}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[--color-on-surface-variant] flex items-center gap-1 mb-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      <span>{b.date}</span>
                    </div>
                    <h3 className="font-bold text-[--color-on-surface] group-hover:text-[--color-primary] transition-colors leading-snug" style={{ fontFamily: "var(--font-bricolage)" }}>{b.title}</h3>
                    <p className="text-sm text-[--color-on-surface-variant] mt-2 line-clamp-2">{b.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[--color-outline-variant]">
                    <span className="text-sm font-bold text-[--color-primary] flex items-center gap-1">
                      Baca Artikel <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALERI + BANTUAN ===== */}
      <section className="w-full py-14 bg-[--color-surface-container-lowest]">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Galeri */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <span className="text-xs font-bold text-[--color-primary] uppercase tracking-wider">Dokumentasi Kegiatan</span>
                <h3 className="text-2xl font-bold text-[--color-on-surface] tracking-tight mt-1" style={{ fontFamily: "var(--font-bricolage)" }}>
                  Potret Kehidupan &amp; Gotong Royong
                </h3>
                <Link className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[--color-primary] hover:underline" href="/berita">
                  Berita &amp; dokumentasi <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {managedGallery.length === 0 ? (
                  <div className="col-span-full rounded-2xl border border-dashed border-[#bfd3c3] bg-white px-5 py-10 text-center text-sm text-[#647168]">
                    Belum ada dokumentasi kegiatan yang dipublikasikan dari admin desa.
                  </div>
                ) : managedGallery.map((g) => (
                  <div key={g.src} className="rounded-xl overflow-hidden h-36 bg-[--color-surface-container]">
                    <img alt={g.alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" src={g.src} />
                  </div>
                ))}
              </div>
            </div>
            {/* Pusat Bantuan */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-[#dcefe5]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#064e3b] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">support_agent</span>
                  </div>
                  <h4 className="font-bold text-[#064e3b]" style={{ fontFamily: "var(--font-bricolage)" }}>Pusat Bantuan &amp; Layanan Cepat</h4>
                </div>
                <p className="text-sm text-[--color-on-surface-variant] mb-5">
                  Butuh surat pengantar segera atau konsultasi perizinan usaha desa? Tim piket perangkat desa siap melayani Anda.
                </p>
                <div className="space-y-3">
                  <a
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-[--color-surface-container-lowest] hover:bg-[--color-surface-container] transition-all group"
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#064e3b]">chat</span>
                      <span className="text-sm font-bold text-[--color-on-surface]">WhatsApp Resmi Pemdes Mendongan</span>
                    </div>
                    <span className="material-symbols-outlined text-[--color-on-surface-variant] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                  <Link
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-[--color-surface-container-lowest] hover:bg-[--color-surface-container] transition-all group"
                    href="/kontak"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#8b5a2b]">assignment</span>
                      <span className="text-sm font-bold text-[--color-on-surface]">Ajukan Surat Keterangan Online</span>
                    </div>
                    <span className="material-symbols-outlined text-[--color-on-surface-variant] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[--color-on-surface-variant] text-xs">
                  <span className="material-symbols-outlined text-sm text-[--color-primary]">info</span>
                  <span>Waktu respons rata-rata via WhatsApp: &lt; 15 menit (jam kerja)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageShell>
  );
}

