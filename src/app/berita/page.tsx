"use client";

import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { IMG, PAGE_HERO_IMAGES } from "../components/shared";
import PublicGallery from "@/components/PublicGallery";
import { getPublishedCmsContent } from "../public-cms";

interface Article {
  id: string;
  title: string;
  category: "Pembangunan" | "Pertanian & KKN" | "Pelayanan" | "Budaya";
  categoryBadge: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  featured?: boolean;
}

export default function BeritaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [managedArticles, setManagedArticles] = useState<Article[]>([]);
  const [activeSection, setActiveSection] = useState<"berita" | "dokumentasi">("berita");

  useEffect(() => {
    getPublishedCmsContent().then((content) => {
      if (!content) {
        setManagedArticles([]);
        return;
      }

      if (!content.articles.length) {
        setManagedArticles([]);
        return;
      }

      setManagedArticles(content.articles.map((article, index) => ({
        id: article.id,
        title: article.title,
        category: article.category as Article["category"],
        categoryBadge: article.category,
        date: article.published_at ? new Date(article.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "",
        author: "Admin Desa",
        readTime: `${Math.max(1, Math.ceil((article.content || "").split(/\s+/).length / 200))} menit baca`,
        image: article.cover_image || [IMG.berita1, IMG.berita2, IMG.berita3][index % 3],
        excerpt: article.excerpt,
        content: article.content.split(/\n\s*\n/).filter(Boolean),
        featured: index === 0,
      })));
    });
  }, []);

  const articlesToShow = managedArticles;
  const categories = ["Semua", ...new Set(articlesToShow.map((article) => article.category))];

  const filteredArticles = articlesToShow.filter((art) => {
    const matchCat = selectedCategory === "Semua" || art.category === selectedCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = articlesToShow.find((a) => a.featured) || articlesToShow[0];

  return (
    <PageShell>
      {/* Hero Banner */}
      <section className="relative w-full py-16 md:py-20 bg-[#E5F8ED] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${PAGE_HERO_IMAGES.berita}')` }}
          ></div>
        </div>
        <div className="w-full px-5 lg:px-12 xl:px-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcefe5] mb-4">
            <span className="material-symbols-outlined text-[#064e3b] text-sm">newspaper</span>
            <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
              Berita & Dokumentasi Desa
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Berita & Dokumentasi Desa
          </h1>
          <p className="text-base text-gray-700 mt-3 max-w-2xl leading-relaxed">
            Kabar terbaru, kegiatan warga, serta dokumentasi foto kehidupan Desa Mendongan.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full py-12 bg-white">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div aria-label="Jenis konten" className="mb-8 inline-flex rounded-full border border-[#dce7dd] bg-[#f4f8f4] p-1" role="tablist">
            <button aria-selected={activeSection === "berita"} className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${activeSection === "berita" ? "bg-[#064e3b] text-white shadow-sm" : "text-[#536057] hover:text-[#064e3b]"}`} onClick={() => setActiveSection("berita")} role="tab" type="button">Berita</button>
            <button aria-selected={activeSection === "dokumentasi"} className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${activeSection === "dokumentasi" ? "bg-[#064e3b] text-white shadow-sm" : "text-[#536057] hover:text-[#064e3b]"}`} onClick={() => { setActiveArticle(null); setActiveSection("dokumentasi"); }} role="tab" type="button">Dokumentasi</button>
          </div>

          {activeSection === "berita" ? (
            <>
              {articlesToShow.length === 0 ? (
                <div className="mb-14 rounded-3xl border border-dashed border-[#cfe0d3] bg-[#f7faf7] px-6 py-12 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f3ec] text-[#064e3b]">
                    <span className="material-symbols-outlined text-3xl">newspaper</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1c2a22]">Belum ada berita yang dipublikasikan</h3>
                  <p className="mt-2 text-sm text-[#647168]">Konten berita dari admin desa akan muncul di sini setelah diterbitkan.</p>
                </div>
              ) : (
                <>
                  {selectedCategory === "Semua" && !searchQuery && featured && (
                    <div
                      onClick={() => setActiveArticle(featured)}
                      className="mb-14 rounded-3xl overflow-hidden bg-slate-900 text-white cursor-pointer group shadow-xl hover:shadow-2xl transition-all"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                          <img
                            alt={featured.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            src={featured.image}
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                              Sorotan Utama
                            </span>
                          </div>
                        </div>

                        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-xs text-emerald-300">
                              <span>{featured.categoryBadge}</span>
                              <span>•</span>
                              <span>{featured.date}</span>
                              <span>•</span>
                              <span>{featured.readTime}</span>
                            </div>

                            <h2
                              className="text-2xl sm:text-3xl font-bold group-hover:text-emerald-300 transition-colors leading-snug"
                              style={{ fontFamily: "var(--font-bricolage)" }}
                            >
                              {featured.title}
                            </h2>

                            <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                              {featured.excerpt}
                            </p>
                          </div>

                          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 mt-6">
                            {featured.author && featured.author !== "Admin Desa" && (
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-emerald-400 text-sm">edit_note</span>
                                <span>{featured.author}</span>
                              </div>
                            )}
                            <span className="font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Baca Selengkapnya
                              <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${selectedCategory === cat
                            ? "bg-[#064e3b] text-white shadow-sm scale-105"
                            : "bg-[#E5F8ED] text-[#064e3b] hover:bg-[#d5f3e2]"
                            }`}
                          type="button"
                        >
                          {cat === "Semua" ? "Semua Berita" : cat}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full md:w-80">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                        search
                      </span>
                      <input
                        type="text"
                        placeholder="Cari berita atau pengumuman..."
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

                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-gray-200">
                      <span className="material-symbols-outlined text-5xl text-gray-400 mb-3 block">
                        article
                      </span>
                      <h3 className="text-lg font-bold text-gray-700">Tidak ada artikel yang ditemukan</h3>
                      <p className="text-sm text-gray-500 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
                      <button
                        onClick={() => {
                          setSelectedCategory("Semua");
                          setSearchQuery("");
                        }}
                        className="mt-4 px-5 py-2 rounded-full bg-[#064e3b] text-white text-xs font-bold"
                      >
                        Reset Filter
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredArticles.map((art) => (
                        <article
                          key={art.id}
                          onClick={() => setActiveArticle(art)}
                          className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
                        >
                          <div>
                            <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                              <img
                                alt={art.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src={art.image}
                              />
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#064e3b] text-xs font-extrabold shadow-sm">
                                  {art.categoryBadge}
                                </span>
                              </div>
                            </div>

                            <div className="p-6">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <span className="material-symbols-outlined text-sm text-[#064e3b]">calendar_today</span>
                                <span>{art.date}</span>
                                <span>•</span>
                                <span>{art.readTime}</span>
                              </div>

                              <h3
                                className="text-lg font-bold text-gray-900 group-hover:text-[#064e3b] transition-colors leading-snug line-clamp-2"
                                style={{ fontFamily: "var(--font-bricolage)" }}
                              >
                                {art.title}
                              </h3>

                              <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                                {art.excerpt}
                              </p>
                            </div>
                          </div>

                          <div className="p-6 pt-0 border-t border-gray-50 mt-4 flex items-center justify-between text-xs">
                            {art.author && art.author !== "Admin Desa" && (
                              <span className="text-gray-500 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">person</span>
                                {art.author}
                              </span>
                            )}
                            <span className="font-bold text-[#064e3b] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                              Baca artikel
                              <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </span>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <PublicGallery />
          )}
        </div>
      </section>

      {/* Modal Baca Artikel Lengkap */}
      {activeArticle && activeSection === "berita" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 bg-slate-100">
              <img
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                src={activeArticle.image}
              />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#064e3b] text-white text-xs font-bold shadow-md">
                  {activeArticle.categoryBadge}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1 text-[#064e3b] font-semibold">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    {activeArticle.date}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                  {activeArticle.author && activeArticle.author !== "Admin Desa" && (
                    <>
                      <span>•</span>
                      <span>Penulis: {activeArticle.author}</span>
                    </>
                  )}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  {activeArticle.title}
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                {activeArticle.content.map((par, idx) => (
                  <p key={idx}>{par}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  Diterbitkan oleh Portal Resmi Pemerintah Desa Mendongan
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-[#064e3b] text-white text-xs font-bold hover:bg-[#08634c] transition-colors"
                  type="button"
                >
                  Tutup Artikel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
