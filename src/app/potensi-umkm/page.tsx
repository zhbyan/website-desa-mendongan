"use client";

import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { IMG } from "../components/shared";
import { getPublishedCmsContent } from "../public-cms";

type CategoryFilter = "Semua" | "Pertanian" | "Kuliner" | "Kerajinan" | "Peternakan" | "Jasa" | "Lainnya";

interface UMKMItem {
  id: string;
  name: string;
  category: "Pertanian" | "Kuliner" | "Kerajinan" | "Peternakan" | "Jasa" | "Lainnya";
  categoryBadge: string;
  image: string;
  price: string;
  owner: string;
  dusun: string;
  phone: string;
  rating: number | null;
  reviews: number;
  desc: string;
  tags: string[];
  features: string[];
}

export default function PotensiUMKMPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<UMKMItem | null>(null);
  const [managedItems, setManagedItems] = useState<UMKMItem[]>([]);

  useEffect(() => {
    getPublishedCmsContent().then((content) => {
      if (!content) {
        setManagedItems([]);
        return;
      }

      setManagedItems(
        content.umkm.length
          ? content.umkm.map((item, index) => ({
            id: item.id,
            name: item.name,
            category: item.category as UMKMItem["category"],
            categoryBadge: item.category,
            image: item.photo_url || [IMG.kopi, IMG.sayur, IMG.bambu, IMG.kuliner][index % 4],
            price: item.price_range,
            owner: item.owner_name || "Pelaku UMKM",
            dusun: item.dusun || "Desa Mendongan",
            phone: item.whatsapp.replace(/\D/g, ""),
            rating: null,
            reviews: 0,
            desc: item.description,
            tags: [],
            features: [],
          }))
          : []
      );
    });
  }, []);

  const items = managedItems;
  const categories: CategoryFilter[] = ["Semua", ...new Set(items.map((item) => item.category))];

  const filteredItems = items.filter((item) => {
    const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dusun.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

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
            <span className="material-symbols-outlined text-[#064e3b] text-sm">storefront</span>
            <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
              Ekonomi Desa • Produk Lokal
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Potensi Alam & UMKM Unggulan
          </h1>
          <p className="text-base text-gray-700 mt-3 max-w-2xl leading-relaxed">
            Jelajahi komoditas pertanian terbaik, olahan kuliner khas, dan kerajinan otentik karya
            masyarakat Desa Mendongan. Langsung terhubung dengan pengrajin dan petani lokal.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full py-12 bg-white">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          {/* Controls: Search and Filter Tabs */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-8 border-b border-gray-100">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${selectedCategory === cat
                    ? "bg-[#064e3b] text-white shadow-sm scale-105"
                    : "bg-[#E5F8ED] text-[#064e3b] hover:bg-[#d6f3e2]"
                    }`}
                  type="button"
                >
                  {cat === "Semua" ? "Semua Produk" : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Cari produk, komoditas, atau dusun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 bg-slate-50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Grid UMKM */}
          {items.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-gray-200">
              <span className="material-symbols-outlined text-5xl text-gray-400 mb-3 block">
                storefront
              </span>
              <h3 className="text-lg font-bold text-gray-700">Belum ada data potensi UMKM yang diterbitkan</h3>
              <p className="text-sm text-gray-500 mt-1">
                Setelah admin mengunggah produk atau usaha desa, data akan muncul di halaman ini.
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-gray-200">
              <span className="material-symbols-outlined text-5xl text-gray-400 mb-3 block">
                search_off
              </span>
              <h3 className="text-lg font-bold text-gray-700">Tidak ada produk yang cocok</h3>
              <p className="text-sm text-gray-500 mt-1">
                Coba gunakan kata kunci pencarian yang lain atau pilih kategori Semua.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("Semua");
                  setSearchQuery("");
                }}
                className="mt-4 px-5 py-2 rounded-full bg-[#064e3b] text-white text-xs font-bold hover:bg-[#08634c]"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Gambar Produk */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={item.image}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#064e3b] text-xs font-extrabold shadow-sm">
                          {item.categoryBadge}
                        </span>
                      </div>
                      {item.rating !== null && <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
                          <span className="material-symbols-outlined text-xs">star</span>
                          <span>{item.rating}</span>
                        </span>
                      </div>}
                    </div>

                    {/* Deskripsi & Konten */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                        <span className="material-symbols-outlined text-sm text-[#064e3b]">location_on</span>
                        <span>{item.dusun}</span>
                        <span>•</span>
                        <span>{item.owner}</span>
                      </div>

                      <h3
                        className="text-xl font-bold text-gray-900 group-hover:text-[#064e3b] transition-colors leading-snug"
                        style={{ fontFamily: "var(--font-bricolage)" }}
                      >
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Tag Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md bg-[#E5F8ED] text-[#064e3b] text-[11px] font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Card: Harga & Tombol Aksi */}
                  <div className="p-6 pt-0 border-t border-gray-50 mt-4 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold uppercase">Estimasi Harga</span>
                      <span className="text-sm font-extrabold text-[#064e3b]">{item.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold transition-colors"
                        type="button"
                      >
                        Detail
                      </button>
                      {item.phone && <a
                        href={`https://wa.me/${item.phone}?text=${encodeURIComponent(
                          `Halo ${item.owner}, saya tertarik dengan produk ${item.name} yang tertera di website resmi Desa Mendongan.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#08634c] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        <span>Pesan</span>
                      </a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section Keunggulan Iklim & Tanah Dataran Tinggi */}
      <section className="w-full py-16 bg-[#E5F8ED]">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#064e3b] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <span className="material-symbols-outlined text-sm">eco</span>
                <span>Karakter Geografis</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#064e3b] leading-tight"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Mengapa Hasil Alam Mendongan Memiliki Cita Rasa Istimewa?
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Terletak di ketinggian 850 – 1.100 mdpl di lereng barat Gunung Ungaran, Desa Mendongan
                diberkahi tanah andosol vulkanik yang kaya mineral, iklim mikro sejuk dengan suhu harian
                18°C – 23°C, serta air pegunungan alami yang mengalir sepanjang musim.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 rounded-2xl shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#064e3b] flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined">water_drop</span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900">Air Pegunungan Murni</h4>
                  <p className="text-xs text-gray-500 mt-1">Irigasi sawah & kebun langsung dari mata air Ungaran.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined">thermostat</span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900">Suhu Sejuk 21°C</h4>
                  <p className="text-xs text-gray-500 mt-1">Optimal untuk kopi arabika, sayur daun, dan peternakan sapi.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  alt="Hamparan Pertanian Desa Mendongan"
                  className="w-full h-80 sm:h-96 object-cover"
                  src={IMG.hero}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                      Kawasan Agrowisata Mandiri
                    </span>
                    <h3 className="text-xl font-bold mt-1" style={{ fontFamily: "var(--font-bricolage)" }}>
                      Pertanian Lestari Berwawasan Lingkungan
                    </h3>
                    <p className="text-xs text-gray-200 mt-1">
                      Didampingi program pembinaan KKN Universitas Diponegoro 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Detail UMKM */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="relative h-60 w-full overflow-hidden bg-slate-100">
              <img alt={selectedItem.name} className="w-full h-full object-cover" src={selectedItem.image} />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#064e3b] text-white text-xs font-bold shadow-md">
                  {selectedItem.categoryBadge}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <span className="material-symbols-outlined text-sm text-[#064e3b]">location_on</span>
                  <span>{selectedItem.dusun}</span>
                  <span>•</span>
                  <span>{selectedItem.owner}</span>
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  {selectedItem.name}
                </h3>
                <p className="text-sm text-gray-700 mt-3 leading-relaxed">{selectedItem.desc}</p>
              </div>

              {selectedItem.features.length > 0 && <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Spesifikasi & Keunggulan
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {selectedItem.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-[#064e3b] mt-0.5">check_circle</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>}

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-gray-500 block">Harga Satuan / Grosir</span>
                  <span className="text-lg font-extrabold text-[#064e3b]">{selectedItem.price}</span>
                </div>
                {selectedItem.phone && <a
                  href={`https://wa.me/${selectedItem.phone}?text=${encodeURIComponent(
                    `Halo ${selectedItem.owner}, saya ingin memesan/berdiskusi tentang produk ${selectedItem.name} dari website Desa Mendongan.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-[#064e3b] text-white text-sm font-bold flex items-center gap-2 hover:bg-[#08634c] transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Hubungi via WhatsApp</span>
                </a>}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
