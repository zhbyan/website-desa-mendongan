"use client";

import PageShell from "../components/PageShell";
import { MAPS_EMBED_URL, PAGE_HERO_IMAGES } from "../components/shared";

export default function WilayahPetaPage() {
  return (
    <PageShell>
      {/* Hero Banner */}
      <section className="relative w-full py-16 md:py-20 bg-[#E5F8ED] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${PAGE_HERO_IMAGES.wilayah}')` }}
          ></div>
        </div>
        <div className="w-full px-5 lg:px-12 xl:px-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcefe5] mb-4">
            <span className="material-symbols-outlined text-[#064e3b] text-sm">explore</span>
            <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
              Geospasial & Peta Wilayah
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Wilayah & Peta Desa Mendongan
          </h1>
          <p className="text-base text-gray-700 mt-3 max-w-2xl leading-relaxed">
            Data geografis, batas teritorial administrasi, sebaran fasilitas pelayanan publik,
            dan wilayah administratif Desa Mendongan yang terdiri dari Dusun Gondangsari, Dusun Mendongan, dan Dusun Setro.
          </p>
        </div>
      </section>

      {/* Container Data Wilayah Administrasi (Green themed container) */}
      <section className="w-full py-12 bg-white">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="bg-[#E5F8ED] rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-emerald-200/60">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#064e3b] text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Informasi Wilayah</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#064e3b]"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  Data Wilayah Administrasi Desa
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#064e3b] bg-white px-4 py-2 rounded-full border border-emerald-200 shadow-2xs">
                <span className="material-symbols-outlined text-sm">landscape</span>
                <span>Ketinggian: ±740 (Lereng Gunung Ungaran)</span>
              </div>
            </div>

            {/* Grid 4 Kartu Wilayah */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-emerald-100/60">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#064e3b] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-2xl">crop_landscape</span>
                </div>
                <span className="text-xs font-semibold text-gray-500 block">Total Luas Wilayah</span>
                <span className="text-2xl font-extrabold text-[#064e3b] block mt-1">94 Ha</span>
                <span className="text-xs text-gray-600 mt-1 block">± 18 Ha tanah kering</span>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-xs border border-emerald-100/60">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-2xl">agriculture</span>
                </div>
                <span className="text-xs font-semibold text-gray-500 block">Lahan Pertanian & Kebun</span>
                <span className="text-2xl font-extrabold text-[#064e3b] block mt-1">74 Ha</span>
                <span className="text-xs text-gray-600 mt-1 block">80% komoditas produktif</span>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-xs border border-emerald-100/60">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-2xl">cottage</span>
                </div>
                <span className="text-xs font-semibold text-gray-500 block">Lahan Pemukiman</span>
                <span className="text-2xl font-extrabold text-[#064e3b] block mt-1">68,0 Ha</span>
                <span className="text-xs text-gray-600 mt-1 block">3 dusun pemukiman tertata</span>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-xs border border-emerald-100/60">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-2xl">rainy</span>
                </div>
                <span className="text-xs font-semibold text-gray-500 block">Iklim & Curah Hujan</span>
                <span className="text-2xl font-extrabold text-[#064e3b] block mt-1">2.500 mm</span>
                <span className="text-xs text-gray-600 mt-1 block">Per tahun, iklim sejuk 21°C</span>
              </div>
            </div>

            {/* Batas Wilayah */}
            <div className="mt-8 pt-6 border-t border-emerald-200/60">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                Batas-Batas Wilayah Teritorial
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { arah: "Sebelah Utara", batas: "Desa Losari", icon: "north" },
                  { arah: "Sebelah Timur", batas: "Desa Bumen", icon: "east" },
                  { arah: "Sebelah Selatan", batas: "Desa Sumowono", icon: "south" },
                  { arah: "Sebelah Barat", batas: "Desa Trayu", icon: "west" },
                ].map((b) => (
                  <div key={b.arah} className="p-3.5 bg-white/80 rounded-xl border border-emerald-200/50 flex items-center gap-3">
                    <span className="material-symbols-outlined text-base text-[#064e3b] bg-[#E5F8ED] p-2 rounded-lg">
                      {b.icon}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#064e3b] block">{b.arah}</span>
                      <span className="text-xs text-gray-700">{b.batas}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lokasi desa */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E5F8ED] text-[#064e3b] text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="material-symbols-outlined text-sm">pin_drop</span>
                  <span>Peta Lokasi Desa</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  Desa Mendongan di Google Maps
                </h3>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
              {/* Header Peta */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400">map</span>
                  <span className="text-sm font-bold">Peta Wilayah Sumowono & Desa Mendongan</span>
                </div>
                <a className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full" href="https://www.google.com/maps/search/?api=1&query=Desa%20Mendongan%2C%20Sumowono%2C%20Semarang" rel="noopener noreferrer" target="_blank">Buka di Google Maps</a>
              </div>

              {/* Map Display / Iframe */}
              <div className="relative h-[480px] w-full bg-slate-100 sm:h-[560px] lg:h-[640px]">
                <iframe
                  title="Peta Desa Mendongan Sumowono"
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 bg-slate-50 p-5 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700">commute</span>
                  <span><strong>Akses:</strong> Jalan beraspal mulus dapat dilalui kendaraan roda 4 dan bus mikro.</span>
                </div>
                <div className="flex items-center gap-4 font-semibold text-gray-700">
                  <span>Semarang: 42 km</span>
                  <span>•</span>
                  <span>Ambarawa: 16 km</span>
                  <span>•</span>
                  <span>Bandungan: 9 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
