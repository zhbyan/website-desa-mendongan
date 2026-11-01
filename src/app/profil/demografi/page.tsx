"use client";

import { useState } from "react";
import PageShell from "../../components/PageShell";
import { IMG } from "../../components/shared";

type TabType = "sebaran" | "pekerjaan" | "pendidikan" | "fasilitas";

export default function DemografiPage() {
  const [activeTab, setActiveTab] = useState<TabType>("sebaran");

  const statCards = [
    {
      label: "Total Penduduk",
      val: "1.378",
      sub: "701 Laki-laki • 677 Perempuan",
      icon: "groups",
      bgIcon: "bg-emerald-100 text-emerald-800",
    },
    {
      label: "Kepala Keluarga",
      val: "546",
      sub: "Rata-rata 3.4 jiwa per KK",
      icon: "home",
      bgIcon: "bg-amber-100 text-amber-800",
    },
    {
      label: "Usia Produktif (15-64)",
      val: "68.2%",
      sub: "1.256 jiwa siap kerja",
      icon: "person_celebrate",
      bgIcon: "bg-blue-100 text-blue-800",
    },
    {
      label: "Kepadatan Wilayah",
      val: "537",
      sub: "Jiwa / km² (Luas 342.5 Ha)",
      icon: "terrain",
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

  return (
    <PageShell>
      {/* Hero Banner */}
      <section className="relative w-full py-16 md:py-20 bg-[#E5F8ED] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${IMG.hero}')` }}
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
      <section className="w-full -mt-8 relative z-20">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                <p className="text-sm text-gray-600 mt-2">
                  Mayoritas warga Mendongan bergerak di sektor pertanian dataran tinggi dan peternakan
                  sapi perah penghasil susu segar.
                </p>
              </div>

              <div className="bg-[#E5F8ED]/50 border border-emerald-100 rounded-3xl p-6 sm:p-8 space-y-6">
                {[
                  {
                    sektor: "Petani & Pekebun Hortikultura (Kopi, Kol, Wortel, Alpukat)",
                    persen: 58,
                    jiwa: "728 Jiwa",
                    icon: "agriculture",
                    color: "bg-emerald-600",
                  },
                  {
                    sektor: "Peternak Sapi Perah & Unggas Rakyat",
                    persen: 16,
                    jiwa: "201 Jiwa",
                    icon: "pets",
                    color: "bg-blue-600",
                  },
                  {
                    sektor: "Pelaku UMKM, Pedagang & Pengrajin Anyaman Bambu",
                    persen: 12,
                    jiwa: "150 Jiwa",
                    icon: "storefront",
                    color: "bg-amber-600",
                  },
                  {
                    sektor: "Karyawan Swasta, Buruh Jasa & Transportasi",
                    persen: 9,
                    jiwa: "113 Jiwa",
                    icon: "commute",
                    color: "bg-purple-600",
                  },
                  {
                    sektor: "PNS, Guru, Tenaga Kesehatan & TNI/Polri",
                    persen: 5,
                    jiwa: "64 Jiwa",
                    icon: "local_police",
                    color: "bg-rose-600",
                  },
                ].map((item) => (
                  <div key={item.sektor} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg text-[#064e3b]">
                          {item.icon}
                        </span>
                        <span className="font-bold text-gray-800">{item.sektor}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-[#064e3b] mr-2">{item.persen}%</span>
                        <span className="text-xs text-gray-500">({item.jiwa})</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-emerald-200">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${item.persen}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
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
                    <p className="text-xs text-gray-500">Komposisi generasi produktif desa</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { kelompok: "Anak-Anak (0 – 14 Tahun)", persen: 20.7, jumlah: "382 Jiwa", ket: "Generasi penerus & pelajar dasar" },
                    { kelompok: "Usia Produktif (15 – 64 Tahun)", persen: 68.2, jumlah: "1.256 Jiwa", ket: "Kekuatan utama ekonomi & pertanian" },
                    { kelompok: "Lansia (65+ Tahun)", persen: 11.1, jumlah: "204 Jiwa", ket: "Warga sepuh dalam binaan Posyandu Lansia" },
                  ].map((u) => (
                    <div key={u.kelompok} className="p-4 bg-white rounded-2xl border border-gray-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-gray-800">{u.kelompok}</span>
                        <span className="text-sm font-extrabold text-[#064e3b]">{u.persen}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-[#064e3b] rounded-full"
                          style={{ width: `${u.persen}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{u.jumlah}</span>
                        <span>{u.ket}</span>
                      </div>
                    </div>
                  ))}
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
                    <p className="text-xs text-gray-500">Warga usia 15 tahun ke atas</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { tingkat: "SD / Sederajat", persen: 32, label: "468 Orang" },
                    { tingkat: "SMP / MTs Sederajat", persen: 28, label: "410 Orang" },
                    { tingkat: "SMA / SMK / MA", persen: 31, label: "453 Orang" },
                    { tingkat: "Diploma & Sarjana (D3 / S1 / S2)", persen: 9, label: "132 Orang" },
                  ].map((p) => (
                    <div key={p.tingkat} className="p-3.5 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">{p.tingkat}</span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#064e3b] mr-2">{p.persen}%</span>
                        <span className="text-xs text-gray-400">({p.label})</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-[#E5F8ED] border border-emerald-100 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#064e3b]">verified</span>
                  <p className="text-xs text-gray-700">
                    Pemerintah desa bersama Tim KKN secara aktif menyelenggarakan bimbingan belajar,
                    literasi perpustakaan desa, dan pelatihan vokasi komputer untuk generasi muda.
                  </p>
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
