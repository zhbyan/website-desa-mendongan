"use client";

import { useState } from "react";
import PageShell from "../../components/PageShell";
import { PAGE_HERO_IMAGES } from "../../components/shared";

type TabType = "sebaran" | "pekerjaan" | "pendidikan" | "fasilitas";

export default function DemografiPage() {
  const [activeTab, setActiveTab] = useState<TabType>("sebaran");

  const statCards = [
    {
      label: "Total Penduduk",
      val: "1.368±",
      sub: "Jumlah dari data usia",
      icon: "groups",
      bgIcon: "bg-emerald-100 text-emerald-800",
    },
    {
      label: "Usia 0–14",
      val: "277",
      sub: "Orang",
      icon: "child_care",
      bgIcon: "bg-blue-100 text-blue-800",
    },
    {
      label: "Usia 15–44",
      val: "560",
      sub: "Orang",
      icon: "person",
      bgIcon: "bg-amber-100 text-amber-800",
    },
    {
      label: "Usia 45–64",
      val: "364",
      sub: "Orang",
      icon: "groups",
      bgIcon: "bg-rose-100 text-rose-800",
    },
    {
      label: "Usia 64+",
      val: "167",
      sub: "Orang",
      icon: "elderly",
      bgIcon: "bg-purple-100 text-purple-800",
    },
  ];

  const dusunData = [
    {
      nama: "Dusun Gondangsari",
      jiwa: 314,
      kk: 80,
      peran: "Peternakan puyuh, posyandu, PAUD, Pertanian.",
      potensi: "Perdagangan dan pertanian.",
      icon: "local_florist",
      color: "from-emerald-500 to-green-600",
    },
    {
      nama: "Dusun Mendongan",
      jiwa: 717,
      kk: 143,
      peran: "Pusat pemerintahan desa, balai desa, BUMDes, dan Pusat UMKM.",
      potensi: "Pertanian sayuran, UMKM Kuliner, dan Peternakan Kelinci",
      icon: "domain",
      color: "from-amber-500 to-yellow-600",
    },
    {
      nama: "Dusun Setro",
      jiwa: 330,
      kk: 124,
      peran: "Pusat peternakan sapi dan kambing, pertanian sayuran, dan perkebunan bunga",
      potensi: "Bunga, sapi, kambing, dan daun bawang.",
      icon: "agriculture",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const ageGroups = [
    { label: "Usia 0–14 tahun", count: 277, color: "bg-emerald-600" },
    { label: "Usia 15–44 tahun", count: 560, color: "bg-[#064e3b]" },
    { label: "Usia 45–64 tahun", count: 364, color: "bg-blue-600" },
    { label: "Usia 64+ tahun", count: 167, color: "bg-amber-600" },
  ];
  const ageTotal = ageGroups.reduce((total, item) => total + item.count, 0);

  const occupations = [
    { label: "Petani dan buruh harian", count: 376, color: "bg-emerald-600", icon: "agriculture" },
    { label: "Pengurus rumah tangga", count: 34, color: "bg-rose-600", icon: "home" },
    { label: "Karyawan swasta dan wiraswasta", count: 404, color: "bg-amber-600", icon: "storefront" },
    { label: "Perdagangan", count: 11, color: "bg-cyan-600", icon: "shopping_bag" },
    { label: "PNS, guru, tenaga kesehatan & TNI/Polri", count: 15, color: "bg-blue-600", icon: "badge" },
    { label: "Perangkat desa", count: 6, color: "bg-[#064e3b]", icon: "account_balance" },
  ];
  const occupationTotal = occupations.reduce((total, item) => total + item.count, 0);

  const educationLevels = [
    { label: "SD", count: 491 },
    { label: "SMP", count: 225 },
    { label: "SMA", count: 157 },
    { label: "D1/D3", count: 7 },
    { label: "S1/S2", count: 25 },
  ];
  const educationTotal = educationLevels.reduce((total, item) => total + item.count, 0);

  return (
    <PageShell>
      {/* Hero Banner */}
      <section className="relative w-full py-16 md:py-20 bg-[#E5F8ED] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${PAGE_HERO_IMAGES.demografi}')` }}
          ></div>
        </div>
        <div className="w-full px-5 lg:px-12 xl:px-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcefe5] mb-4">
            <span className="material-symbols-outlined text-[#064e3b] text-sm">groups</span>
            <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
              Profil Desa • Statistik 2026
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Demografi & Kependudukan
          </h1>
          <p className="text-base text-gray-700 mt-3 max-w-2xl leading-relaxed">
            Data agregat kependudukan, struktur usia, sebaran 3 dusun, serta mata pencaharian warga
            Desa Mendongan, Kecamatan Sumowono, Kabupaten Semarang.
          </p>
        </div>
      </section>

      {/* 4 Stat Cards */}
      <section className="relative z-20 -mt-8 w-full">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
            {statCards.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm ${item.bgIcon}`}
                >
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">{item.label}</span>
                  <span
                    className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] leading-tight"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    {item.val}
                  </span>
                  <span className="text-[11px] text-gray-600 block mt-0.5">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Konten Tab Interaktif */}
      <section className="w-full py-16 bg-white">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          {/* Navigation Tabs - Sejajar 4 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 bg-[#E5F8ED] rounded-2xl max-w-4xl mx-auto mb-12 shadow-2xs">
            {[
              { id: "sebaran", label: "Sebaran 3 Dusun", icon: "map" },
              { id: "pekerjaan", label: "Mata Pencaharian", icon: "work" },
              { id: "pendidikan", label: "Pendidikan & Usia", icon: "school" },
              { id: "fasilitas", label: "Sarana Publik", icon: "apartment" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as TabType)}
                className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all w-full text-center ${activeTab === t.id
                  ? "bg-[#064e3b] text-white shadow-sm"
                  : "text-gray-700 hover:text-[#064e3b] hover:bg-white/70"
                  }`}
                type="button"
              >
                <span className="material-symbols-outlined text-base sm:text-lg shrink-0">{t.icon}</span>
                <span className="whitespace-nowrap">{t.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: Sebaran Dusun */}
          {activeTab === "sebaran" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#064e3b]"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  Distribusi Penduduk Per Dusun
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Desa Mendongan terbagi atas 3 dusun dengan karakteristik dan
                  keunggulan ekonomi masing-masing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dusunData.map((d, index) => (
                  <div
                    key={d.nama}
                    className={`p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-[#E5F8ED]/30 transition-all flex flex-col justify-between ${dusunData.length % 2 === 1 && index === dusunData.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]" : ""}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center shadow-md">
                            <span className="material-symbols-outlined text-xl">{d.icon}</span>
                          </div>
                          <div>
                            <h3
                              className="text-xl font-bold text-gray-900"
                              style={{ fontFamily: "var(--font-bricolage)" }}
                            >
                              {d.nama}
                            </h3>
                            <span className="text-xs text-gray-500">Kawasan Pemukiman Warga</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-extrabold text-[#064e3b] block">
                            {d.jiwa} <span className="text-xs font-semibold text-gray-500">Jiwa</span>
                          </span>
                          <span className="text-xs font-semibold text-gray-500">{d.kk} KK</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed mb-4">{d.peran}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-600">Komoditas / Keunggulan:</span>
                      <span className="font-semibold text-[#064e3b] bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
                        {d.potensi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Mata Pencaharian */}
          {activeTab === "pekerjaan" && (
            <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#064e3b]"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  Mata Pencaharian Penduduk
                </h2>
                <p className="text-sm text-gray-600 mt-2">Persentase dari {occupationTotal} warga pada kelompok pekerjaan yang dirinci.</p>
              </div>

              <div className="space-y-6 rounded-3xl border border-emerald-100 bg-[#E5F8ED]/50 p-6 sm:p-8">
                {occupations.map((item) => {
                  const percentage = (item.count / occupationTotal) * 100;
                  return <div className="space-y-2" key={item.label}>
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <div className="flex min-w-0 items-start gap-2">
                        <span className="material-symbols-outlined mt-0.5 text-lg text-[#064e3b]">{item.icon}</span>
                        <span className="font-bold text-gray-800">{item.label}</span>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="mr-2 font-extrabold text-[#064e3b]">{percentage.toFixed(1)}%</span>
                        <span className="text-xs text-gray-500">({item.count} orang)</span>
                      </div>
                    </div>
                    <div aria-label={`${item.label}: ${percentage.toFixed(1)}%`} className="h-3 w-full overflow-hidden rounded-full border border-emerald-200 bg-white" role="img">
                      <div className={`h-full rounded-full transition-all duration-500 ${item.color}`} style={{ width: `${percentage}%` }} />
                    </div>
                  </div>;
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Pendidikan & Usia */}
          {activeTab === "pendidikan" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-200">
              {/* Kolom Usia */}
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#064e3b] flex items-center justify-center">
                    <span className="material-symbols-outlined">diversity_3</span>
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-gray-900"
                      style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                      Piramida Kelompok Usia
                    </h3>
                    <p className="text-xs text-gray-500">Persentase dari total {ageTotal.toLocaleString("id-ID")} penduduk</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {ageGroups.map((item) => {
                    const percentage = (item.count / ageTotal) * 100;
                    return <div className="rounded-2xl border border-gray-100 bg-white p-4" key={item.label}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-gray-800">{item.label}</span>
                        <span className="shrink-0 text-sm font-extrabold text-[#064e3b]">{percentage.toFixed(1)}%</span>
                      </div>
                      <div aria-label={`${item.label}: ${percentage.toFixed(1)}%`} className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100" role="img">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{item.count.toLocaleString("id-ID")} jiwa</span>
                    </div>;
                  })}
                </div>
              </div>

              {/* Kolom Pendidikan */}
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-gray-900"
                      style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                      Tingkat Pendidikan Terakhir
                    </h3>
                    <p className="text-xs text-gray-500">Persentase dari {educationTotal.toLocaleString("id-ID")} data pendidikan</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {educationLevels.map((item) => {
                    const percentage = (item.count / educationTotal) * 100;
                    return <div className="rounded-xl border border-gray-100 bg-white p-3.5" key={item.label}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                        <span className="shrink-0 text-xs font-bold text-[#064e3b]">{percentage.toFixed(1)}% <span className="ml-1 font-normal text-gray-500">({item.count} orang)</span></span>
                      </div>
                      <div aria-label={`${item.label}: ${percentage.toFixed(1)}%`} className="h-2 w-full overflow-hidden rounded-full bg-slate-100" role="img">
                        <div className="h-full rounded-full bg-blue-600" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>;
                  })}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: Sarana Publik */}
          {activeTab === "fasilitas" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {[
                {
                  kategori: "Pendidikan",
                  items: [
                    "1 Unit SD Negeri Mendongan",
                    "1 Unit TK dan PAUD",
                    "5 TPQ (Taman Pendidikan Al-Qur'an)",
                  ],
                  icon: "school",
                  badgeBg: "bg-blue-100 text-blue-800",
                },
                {
                  kategori: "Kesehatan Warga",
                  items: [
                    "3 Posyandu Balita & Lansia Utama",
                    "1 Puskesmas Pembantu",
                    "1 Rumah Bersalin",
                  ],
                  icon: "medical_services",
                  badgeBg: "bg-rose-100 text-rose-800",
                },
                {
                  kategori: "Keagamaan & Ibadah",
                  items: [
                    "3 Unit Masjid",
                    "6 Unit Musholla",
                    "8 Kelompok Pengajian Laki Laki & 7 Kelompok Pengajian Perempuan",
                  ],
                  icon: "mosque",
                  badgeBg: "bg-emerald-100 text-emerald-800",
                },
                {
                  kategori: "Pemerintahan & Umum",
                  items: [
                    "1 Balai Desa & Pendopo Pertemuan",
                    "Kantor Pelayanan Administrasi",
                    "1 Gedung Serbaguna",
                  ],
                  icon: "account_balance",
                  badgeBg: "bg-amber-100 text-amber-800",
                },
                {
                  kategori: "Olahraga & Seni Budaya",
                  items: [
                    "1 Lapangan Sepak Bola Desa",
                    "1 Lapangan Bulutangkis",
                    "1 Meja Ping Pong",
                  ],
                  icon: "sports_soccer",
                  badgeBg: "bg-purple-100 text-purple-800",
                },
                {
                  kategori: "Air Bersih & Sanitasi",
                  items: [
                    "Sistem Pamsimas Sumber Mata Air Alami",
                    "100% Rumah Tangga Memiliki Jamban Sehat",
                    "Program Desa ODF (Open Defecation Free)",
                  ],
                  icon: "water_drop",
                  badgeBg: "bg-cyan-100 text-cyan-800",
                },
              ].map((f) => (
                <div
                  key={f.kategori}
                  className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${f.badgeBg}`}
                      >
                        <span className="material-symbols-outlined text-lg">{f.icon}</span>
                      </div>
                      <h4
                        className="text-base font-bold text-gray-900"
                        style={{ fontFamily: "var(--font-bricolage)" }}
                      >
                        {f.kategori}
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                      {f.items.map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-xs text-[#064e3b] mt-1 shrink-0">
                            check_circle
                          </span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
