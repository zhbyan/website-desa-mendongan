"use client";

import { useState } from "react";
import { FileText, MessageCircle, UsersRound } from "lucide-react";
import PageShell from "../components/PageShell";
import { PAGE_HERO_IMAGES } from "../components/shared";

type SuratType = "Surat Keterangan Usaha (SKU)" | "Surat Keterangan Domisili" | "Surat Pengantar SKCK";
type PopulationService = "KTP" | "Kartu Keluarga (KK)" | "Akta Kelahiran" | "Akta Kematian" | "Pindah Datang" | "Pindah Keluar" | "Kartu Identitas Anak (KIA)";
type ServiceType = SuratType | PopulationService;

const suratServices: SuratType[] = [
  "Surat Keterangan Usaha (SKU)",
  "Surat Keterangan Domisili",
  "Surat Pengantar SKCK",
];

const populationServices: PopulationService[] = [
  "KTP",
  "Kartu Keluarga (KK)",
  "Akta Kelahiran",
  "Akta Kematian",
  "Pindah Datang",
  "Pindah Keluar",
  "Kartu Identitas Anak (KIA)",
];

const serviceRequirements: Record<ServiceType, string[]> = {
  "Surat Keterangan Usaha (SKU)": ["KTP asli"],
  "Surat Keterangan Domisili": ["KTP asli"],
  "Surat Pengantar SKCK": ["Fotokopi Kartu Keluarga (KK)", "Fotokopi KTP"],
  KTP: ["Formulir F.1.02", "Berusia minimal 17 tahun", "Fotokopi Kartu Keluarga (KK)", "Surat kehilangan dari kepolisian (jika KTP hilang)", "KTP lama (jika rusak)"],
  "Kartu Keluarga (KK)": ["Formulir F.1.02", "Fotokopi dokumen/bukti peristiwa kependudukan dan peristiwa penting", "Formulir F.1.05 (jika perkawinan/perceraian belum tercatat)", "Formulir F.1.06 (jika ada perubahan elemen data)", "Kartu Keluarga dan KTP lama", "Surat kehilangan dari kepolisian (jika dokumen hilang)"],
  "Akta Kelahiran": ["Formulir F.2.01A", "Surat keterangan lahir dari dokter/rumah sakit", "Buku nikah orang tua", "Kartu Keluarga", "KTP kedua orang tua", "Nama lengkap anak dengan jelas"],
  "Akta Kematian": ["Formulir F.2.01A", "Surat keterangan kematian dari rumah sakit/desa", "Kartu Keluarga"],
  "Pindah Datang": ["Formulir F.1.02", "Formulir F.1.03A (selain orang tua kandung)", "Formulir F.1.03B (jika menumpang KK)", "Formulir F.1.03C (jika bukan alamat rumah sendiri)", "Kartu Keluarga", "SKPWNI", "KTP-el"],
  "Pindah Keluar": ["Formulir F.1.02", "Formulir F.1.03 (selain orang tua kandung)", "Kartu Keluarga"],
  "Kartu Identitas Anak (KIA)": ["Formulir F.1.02", "Fotokopi akta kelahiran", "Fotokopi Kartu Keluarga", "Pas foto 4×6 satu lembar untuk anak usia di atas 5 tahun; latar merah untuk tahun lahir ganjil dan biru untuk tahun lahir genap"],
};

const SERVICE_WHATSAPP_NUMBER = "628170790161";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    dusun: "Dusun Mendongan",
    whatsapp: "",
    jenisLayanan: suratServices[0] as ServiceType,
    keperluan: "",
  });

  const [serviceCategory, setServiceCategory] = useState<"surat" | "administrasi">("surat");
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.nik || !formData.whatsapp) {
      alert("Mohon lengkapi Nama, NIK, dan Nomor WhatsApp.");
      return;
    }
    const message = [
      "Halo Admin Layanan Desa Mendongan, saya ingin mengajukan layanan:",
      "",
      `Nama: ${formData.nama.trim()}`,
      `Dusun: ${formData.dusun}`,
      `Nomor WhatsApp pemohon: ${formData.whatsapp.trim()}`,
      `Jenis layanan: ${formData.jenisLayanan}`,
      `Keperluan: ${formData.keperluan.trim() || "-"}`,
      "",
      "Persyaratan yang disiapkan:",
      ...serviceRequirements[formData.jenisLayanan].map((requirement) => `- ${requirement}`),
      "",
      "NIK tidak disertakan dalam pesan ini demi privasi.",
    ].join("\n");
    const whatsappUrl = `https://wa.me/${SERVICE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      nik: "",
      dusun: "Dusun Mendongan",
      whatsapp: "",
      jenisLayanan: suratServices[0],
      keperluan: "",
    });
    setServiceCategory("surat");
    setSubmitted(false);
  };

  const faqs = [
    {
      q: "Berapa lama proses pembuatan surat keterangan di balai desa?",
      a: "Melalui sistem pengajuan daring ini, surat keterangan Anda diverifikasi dalam waktu 1x24 jam kerja. Dokumen dapat langsung diambil di kantor desa atau dikirim dalam bentuk file PDF ber-stempel digital.",
    },
    {
      q: "Apakah layanan persuratan di Desa Mendongan dipungut biaya?",
      a: "Seluruh layanan administrasi kependudukan dan persuratan di Desa Mendongan adalah 100% GRATIS (tidak dipungut biaya apa pun).",
    },
    {
      q: "Apa saja syarat untuk mengurus Surat Keterangan Usaha (SKU)?",
      a: "Pemohon membawa KTP asli.",
    },
    {
      q: "Bagaimana cara mengakses mobil siaga desa saat kondisi darurat medis?",
      a: "Warga dapat langsung menghubungi hotline siaga Poskesdes atau nomor Kepala Dusun setempat yang tercantum pada daftar kontak darurat di bawah. Mobil siaga siap 24 jam gratis untuk rujukan ke Puskesmas Sumowono atau RSUD Ambarawa.",
    },
  ];

  return (
    <PageShell>
      {/* Hero Banner */}
      <section className="relative w-full py-16 md:py-20 bg-[#E5F8ED] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${PAGE_HERO_IMAGES.kontak}')` }}
          ></div>
        </div>
        <div className="w-full px-5 lg:px-12 xl:px-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcefe5] mb-4">
            <span className="material-symbols-outlined text-[#064e3b] text-sm">support_agent</span>
            <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
              Pelayanan Publik Digital
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Kontak & Pusat Layanan Warga
          </h1>
          <p className="text-base text-gray-700 mt-3 max-w-2xl leading-relaxed">
            Ajukan surat administrasi secara daring, hubungi perangkat desa via WhatsApp, atau temukan
            informasi operasional kantor Pemerintah Desa Mendongan.
          </p>
        </div>
      </section>

      {/* Section Pusat Bantuan & Layanan Cepat (Green Container) */}
      <section className="w-full py-12 bg-white">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="bg-[#E5F8ED] rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm mb-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#064e3b] block mb-1">
                  Respon Cepat Warga
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#064e3b]"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  Pusat Bantuan & Layanan Cepat
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#064e3b] bg-white px-4 py-2 rounded-full border border-emerald-200">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Kantor Buka: Senin – Jumat</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Chat WhatsApp Pelayanan */}
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-emerald-100 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#064e3b] flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">chat</span>
                  </div>
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    Konsultasi WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    Tanya syarat surat, cek status permohonan, atau laporkan kendala fasilitas umum
                    langsung ke staf balai desa.
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-gray-100">
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Admin%20Layanan%20Desa%20Mendongan,%20saya%20ingin%20berkonsultasi%20mengenai..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#064e3b] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#08634c] transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">send</span>
                    <span>Chat WhatsApp Resmi</span>
                  </a>
                </div>
              </div>

              {/* Card 2: Pengajuan Daring */}
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-emerald-100 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">description</span>
                  </div>
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    Formulir Surat Daring
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    Isi formulir online di halaman ini tanpa perlu antre di balai desa. Surat siap diambil
                    atau dikirim file PDF.
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-gray-100">
                  <a
                    href="#form-pengajuan"
                    className="w-full py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-amber-700 transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">edit_document</span>
                    <span>Isi Formulir Bawah</span>
                  </a>
                </div>
              </div>

              {/* Card 3: Hotline Siaga 24 Jam */}
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-emerald-100 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">emergency</span>
                  </div>
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    Bantuan Kesehatan Desa
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    Butuh pertolongan pertama atau arahan rujukan ke puskesmas dan rumah sakit terdekat? Hubungi Bidan Desa
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-gray-100">
                  <a
                    href="tel:081234567899"
                    className="w-full py-2.5 rounded-xl bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">call</span>
                    <span>Hubungi Bidan Desa</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Pengajuan Surat Daring & Lokasi Balai Desa */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16" id="form-pengajuan">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-lg">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F8ED] text-[#064e3b] text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="material-symbols-outlined text-sm">assignment</span>
                  <span>Layanan Tanpa Antre</span>
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  Formulir Pengajuan Surat Administrasi
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  NIK tidak disertakan. WhatsApp akan membuka draf pesan untuk Anda tinjau dan kirim sendiri.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-[#E5F8ED] rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-16 h-16 bg-[#064e3b] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <span className="material-symbols-outlined text-3xl">check</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#064e3b]">
                      Draf WhatsApp Siap
                    </span>
                    <h4
                      className="text-2xl font-bold text-gray-900 mt-1"
                      style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                      Tinjau dan kirim permohonan
                    </h4>
                    <p className="text-sm text-gray-700 mt-2 max-w-md mx-auto">
                      Draf untuk layanan <strong>{formData.jenisLayanan}</strong> sudah dibuka di WhatsApp.
                      Periksa pesannya, lalu tekan <strong>Kirim</strong> di WhatsApp agar permohonan diterima petugas.
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full bg-[#064e3b] text-white text-xs font-bold hover:bg-[#08634c] transition-colors"
                  >
                    Ajukan Surat Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap Sesuai KTP *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 bg-slate-50"
                    />
                  </div>

                  <div className="mb-2">
                    <span className="mb-2 block text-xs font-bold text-gray-700">Pilih jenis layanan</span>
                    <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#E5F8ED] p-1.5">
                      <button
                        aria-pressed={serviceCategory === "surat"}
                        className={`flex min-h-10 items-center justify-center gap-2 rounded-lg px-2 py-2 text-xs font-bold transition-colors ${serviceCategory === "surat" ? "bg-[#064e3b] text-white shadow-sm" : "text-[#064e3b] hover:bg-white/70"}`}
                        onClick={() => {
                          setServiceCategory("surat");
                          setFormData({ ...formData, jenisLayanan: suratServices[0] });
                        }}
                        type="button"
                      >
                        <FileText aria-hidden="true" className="size-4" /> Surat
                      </button>
                      <button
                        aria-pressed={serviceCategory === "administrasi"}
                        className={`flex min-h-10 items-center justify-center gap-2 rounded-lg px-2 py-2 text-xs font-bold transition-colors ${serviceCategory === "administrasi" ? "bg-[#064e3b] text-white shadow-sm" : "text-[#064e3b] hover:bg-white/70"}`}
                        onClick={() => {
                          setServiceCategory("administrasi");
                          setFormData({ ...formData, jenisLayanan: populationServices[0] });
                        }}
                        type="button"
                      >
                        <UsersRound aria-hidden="true" className="size-4" /> Administrasi Kependudukan
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Nomor Induk Kependudukan (NIK) *</label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        placeholder="16 digit NIK"
                        value={formData.nik}
                        onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 bg-slate-50 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Nomor WhatsApp Aktif *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Dusun Asal *</label>
                      <select
                        value={formData.dusun}
                        onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 bg-slate-50"
                      >
                        <option value="Dusun Gondangsari">Dusun Gondangsari</option>
                        <option value="Dusun Mendongan">Dusun Mendongan</option>
                        <option value="Dusun Setro">Dusun Setro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{serviceCategory === "surat" ? "Jenis Surat yang Diajukan *" : "Jenis Layanan Kependudukan *"}</label>
                      <select
                        value={formData.jenisLayanan}
                        onChange={(e) =>
                          setFormData({ ...formData, jenisLayanan: e.target.value as ServiceType })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 bg-slate-50"
                      >
                        {(serviceCategory === "surat" ? suratServices : populationServices).map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div aria-live="polite" className="rounded-xl border border-emerald-100 bg-[#F4FAF6] p-4">
                    <h4 className="text-sm font-bold text-[#064e3b]">Syarat yang perlu dibawa</h4>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-gray-700">
                      {serviceRequirements[formData.jenisLayanan].map((requirement) => (
                        <li className="flex gap-2" key={requirement}><span aria-hidden="true" className="font-bold text-[#32835c]">•</span><span>{requirement}</span></li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Keterangan / Keperluan Surat (Opsional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan secara singkat keperluan surat (contoh: Pengajuan pinjaman KUR Bank, syarat melamar pekerjaan, dsb)"
                      value={formData.keperluan}
                      onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 bg-slate-50"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#064e3b] text-white text-sm font-bold hover:bg-[#08634c] transition-all shadow-md flex items-center justify-center gap-2 mt-4"
                  >
                    <MessageCircle aria-hidden="true" className="size-5" />
                    <span>Lanjutkan ke WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar Column: Info Kantor & Kontak Darurat */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card Lokasi Kantor */}
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#064e3b] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4
                      className="text-base font-bold text-gray-900"
                      style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                      Kantor Pemerintah Desa
                    </h4>
                    <span className="text-xs text-gray-500">Kecamatan Sumowono, Kab. Semarang</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                  Jl. Raya Mendongan No. 01, Desa Mendongan, Kec. Sumowono, Kabupaten Semarang,
                  Jawa Tengah 50662.
                </p>

                <div className="space-y-2 text-xs text-gray-700 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Email Resmi:</span>
                    <span className="font-semibold text-[#064e3b]">desamendongankecamatansumowono@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Telepon Kantor:</span>
                    <span className="font-semibold text-gray-800">(0298) 592-XXXX</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Kode Pos:</span>
                    <span className="font-semibold text-gray-800">50662</span>
                  </div>
                </div>
              </div>

              {/* Card Kontak Darurat */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
                <h4
                  className="text-base font-bold text-gray-900 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  <span className="material-symbols-outlined text-rose-600 text-lg">emergency</span>
                  <span>Kontak Darurat Desa</span>
                </h4>

                <div className="space-y-3">
                  {[
                    { peran: "Bidan Desa", nama: "Ibu Bidan Tanty Suharto", tel: "0812-4894-9835" },
                    { peran: "Kepala Dusun Gondangsari", nama: "Riza Arifiyanto", tel: "0813-9876-5432" },
                    { peran: "Kepala Dusun Mendongan", nama: "Dwi Setiyono", tel: "0821-4567-8901" },
                    { peran: "Kepala Dusun Setro", nama: "Pak Jono", tel: "0852-1122-3344" },
                  ].map((kd) => (
                    <div
                      key={kd.peran}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 block">{kd.peran}</span>
                        <span className="text-xs font-semibold text-gray-800">{kd.nama}</span>
                      </div>
                      <a
                        href={`tel:${kd.tel.replace(/[^0-9]/g, "")}`}
                        className="p-2 rounded-lg bg-[#E5F8ED] text-[#064e3b] hover:bg-[#d2f3e0] transition-colors"
                        title={`Hubungi ${kd.nama}`}
                      >
                        <span className="material-symbols-outlined text-base">call</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-[#E5F8ED]/40 rounded-3xl p-6 sm:p-10 border border-emerald-100">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#064e3b] block mb-1">
                Tanya Jawab Warga
              </span>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#064e3b]"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Pertanyaan Sering Diajukan (FAQ)
              </h3>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-2xs"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900"
                      type="button"
                    >
                      <span>{faq.q}</span>
                      <span
                        className={`material-symbols-outlined text-lg text-[#064e3b] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                          }`}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
