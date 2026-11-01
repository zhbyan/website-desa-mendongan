"use client";

import PageShell from "../../components/PageShell";
import { IMG } from "../../components/shared";

const timelineEvents = [
  {
    year: "1920-an",
    title: "Awal Mula Permukiman & Asal Nama Desa",
    desc: "Para perantau dari daerah Demak dan Kendal mulai membuka lahan di lereng barat Gunung Ungaran. Mereka tertarik oleh kesuburan tanah andosol vulkanik dan kelimpahan sumber mata air alami. Nama 'Mendongan' diambil dari tumbuhan 'mendong' (Fimbristylis globulosa) yang tumbuh subur di sepanjang aliran sungai kecil yang membelah pemukiman pertama.",
    icon: "foundation",
    highlight: "Pembukaan Lahan Pertama",
  },
  {
    year: "1945",
    title: "Masa Perjuangan Kemerdekaan",
    desc: "Warga Mendongan berperan penting dalam perjuangan kemerdekaan sebagai pos logistik dan dapur umum bagi laskar pejuang di jalur gerilya Sumowono-Kendal. Jiwa gotong royong dan kebersamaan warga berakar kuat sejak masa perjuangan ini.",
    icon: "flag",
    highlight: "Pos Logistik Pejuang",
  },
  {
    year: "1970-an",
    title: "Sentra Kopi Robusta & Hortikultura",
    desc: "Program revitalisasi perkebunan mendorong penanaman massal kopi robusta dan tanaman sayur dataran tinggi. Mendongan mulai dikenal luas sebagai pemasok kopi berkualitas di pasar tradisional Ambarawa dan Semarang.",
    icon: "local_cafe",
    highlight: "Pendirian Kelompok Tani",
  },
  {
    year: "1998",
    title: "Era Otonomi & Pembangunan Partisipatif",
    desc: "Era reformasi memperkuat tata kelola pemerintahan desa. Badan Permusyawaratan Desa (BPD) dan Lembaga Ketahanan Masyarakat Desa (LKMD) dibentuk, mendorong musyawarah perencanaan pembangunan berbasis kebutuhan tiap dusun.",
    icon: "gavel",
    highlight: "Demokrasi Desa Mandiri",
  },
  {
    year: "2015 – 2020",
    title: "Modernisasi Infrastruktur & Kebangkitan UMKM",
    desc: "Akses jalan antar-dusun diaspal dan dibeton, sarana air bersih Pamsimas diperluas, dan kelompok perajin anyaman bambu serta pengolahan keripik jamur mulai mendapatkan pelatihan kemasan modern.",
    icon: "trending_up",
    highlight: "Akses Jalan & Air Bersih",
  },
  {
    year: "2026",
    title: "Transformasi Digital Bersama KKN Undip",
    desc: "Kolaborasi bersejarah antara Pemerintah Desa Mendongan dan Tim KKN Universitas Diponegoro melahirkan sistem pelayanan surat digital, katalog online UMKM desa, pemetaan potensi agrowisata, dan peluncuran portal resmi desa cerdas.",
    icon: "rocket_launch",
    highlight: "Peluncuran Website Desa Resmi",
  },
];

export default function SejarahPage() {
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
            <span className="material-symbols-outlined text-[#064e3b] text-sm">auto_stories</span>
            <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
              Profil Desa • Jejak Historis
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Sejarah & Asal-Usul Desa Mendongan
          </h1>
          <p className="text-base text-gray-700 mt-3 max-w-2xl leading-relaxed">
            Menelusuri jejak sejarah panjang berdirinya Desa Mendongan sejak era pembukaan lahan
            pra-kemerdekaan hingga berkembang menjadi desa agrowisata mandiri di lereng Sumowono.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="w-full py-16 bg-white">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Timeline Kolom Kiri */}
            <div className="lg:col-span-8">
              <div className="space-y-10 relative">
                {/* Garis vertikal timeline */}
                <div className="absolute left-6 top-4 bottom-4 w-1 bg-gradient-to-b from-[#064e3b] via-emerald-200 to-transparent hidden sm:block"></div>

                {timelineEvents.map((item, idx) => (
                  <div key={item.year} className="flex gap-6 sm:gap-8 relative group">
                    {/* Lingkaran Ikon */}
                    <div className="shrink-0 relative z-10">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
                          idx === timelineEvents.length - 1
                            ? "bg-[#064e3b] text-white ring-4 ring-emerald-100"
                            : "bg-[#E5F8ED] text-[#064e3b] border border-emerald-200"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      </div>
                    </div>

                    {/* Konten Card */}
                    <div className="flex-1 bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:bg-[#E5F8ED]/30 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-[#064e3b] text-white text-xs font-bold font-mono">
                          {item.year}
                        </span>
                        <span className="text-xs font-bold text-[#064e3b] bg-white px-3 py-1 rounded-full border border-gray-200">
                          {item.highlight}
                        </span>
                      </div>

                      <h3
                        className="text-xl font-bold text-gray-900 group-hover:text-[#064e3b] transition-colors mb-2"
                        style={{ fontFamily: "var(--font-bricolage)" }}
                      >
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Kolom Kanan */}
            <div className="lg:col-span-4 space-y-6">
              {/* Card Tahukah Anda */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                <div className="relative h-48 w-full">
                  <img
                    alt="Pemandangan Lereng Ungaran Mendongan"
                    className="w-full h-full object-cover"
                    src={IMG.hero}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider bg-[#064e3b]/80 px-3 py-1 rounded-full">
                      Fakta Sejarah
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4
                    className="text-lg font-bold text-[#064e3b] mb-2"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    Asal Usul Rumput Mendong
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nama <strong>Mendongan</strong> berakar dari kata &ldquo;mendong&rdquo; (Fimbristylis
                    globulosa), tanaman rawa berserat lentur yang di masa lalu menjadi bahan utama anyaman
                    tikar dan wadah hasil bumi warga lereng gunung.
                  </p>
                </div>
              </div>

              {/* Card Nilai Luhur Budaya */}
              <div className="rounded-3xl p-6 bg-[#E5F8ED] border border-emerald-100 space-y-3">
                <div className="flex items-center gap-2 text-[#064e3b] font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">favorite</span>
                  <span>Nilai Luhur Desa</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Semangat gotong royong (sambatan), musyawarah mufakat di pendopo desa, dan tradisi merti
                  dusun menjadi modal sosial terbesar masyarakat Mendongan dalam menjaga kerukunan antar 4
                  dusun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
