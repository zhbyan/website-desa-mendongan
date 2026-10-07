# 🏡 Implementation Plan: Website Profil Desa Mendongan

> **Proyek KKN** — Pengembangan Website untuk Mapping Potensi Desa  
> **Lokasi:** Desa Mendongan, Kec. Sumowono, Kab. Semarang  
> **Deadline:** 31 Oktober 2026  
> **SDGs #9:** Industry, Innovation, and Infrastructure

---

## 📋 Ringkasan Proyek

Website profil desa yang menampilkan informasi lengkap Desa Mendongan, mapping potensi ekonomi (UMKM), berita/artikel kegiatan desa, dan dilengkapi panel admin agar perangkat desa bisa memperbarui konten secara mandiri setelah KKN selesai.

---

## 🧭 Struktur Navigasi (Navbar)

### Desktop Navbar

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [Logo Desa]  Beranda | Profil Desa ▼ | UMKM & Produk | Berita | Galeri │
│              | Wilayah Desa | Kontak  |  [🔍] [🌐 ID/EN]               │
└──────────────────────────────────────────────────────────────────────────┘
```

### Navbar Items Detail:

| No | Menu | Sub-Menu | Keterangan |
|----|------|----------|------------|
| 1 | **Beranda** | — | Landing page utama |
| 2 | **Profil Desa** ▼ | Sejarah Desa | Sejarah singkat Desa Mendongan |
| | | Visi & Misi | Visi misi pemerintah desa |
| | | Struktur Organisasi | Bagan organisasi perangkat desa |
| | | Data Demografi | Statistik penduduk (jumlah, usia, pekerjaan) |
| | | Lembaga Desa | BPD, LKMD, PKK, Karang Taruna, RT/RW |
| 3 | **UMKM & Produk** | — | Mapping potensi ekonomi + katalog produk desa |
| 4 | **Berita** | — | Artikel/berita kegiatan desa |
| 5 | **Galeri** | — | Foto & video kegiatan/potensi desa |
| 6 | **Wilayah Desa** | — | Peta interaktif + info dusun |
| 7 | **Kontak** | — | Form kontak + info pemerintah desa + FAQ |

### Mobile Navbar
```
┌───────────────────────────────┐
│ [Logo] Desa Mendongan    [☰]  │
└───────────────────────────────┘
```
Hamburger menu → slide drawer dari kanan

---

## 📄 Detail Setiap Halaman

### 1. 🏠 Beranda (Homepage)

Halaman landing utama yang memperkenalkan Desa Mendongan secara sekilas.

**Sections:**
| Section | Konten | Fitur |
|---------|--------|-------|
| **Hero Banner** | Foto panorama desa + tagline "Selamat Datang di Desa Mendongan" | Parallax scroll, overlay gradient |
| **Sambutan Kepala Desa** | Foto + kutipan sambutan Kepala Desa | Card dengan efek hover |
| **Statistik Desa** | Luas wilayah, jumlah penduduk, jumlah RT/RW, jumlah UMKM | Animated counter (angka bergerak) |
| **Potensi Unggulan** | 3-4 highlight potensi desa (pertanian, UMKM, kerajinan) | Card grid dengan ikon + link ke detail |
| **Berita Terkini** | 3 berita/artikel terbaru | Card carousel/grid, link "Lihat Semua" |
| **Galeri Singkat** | 6-8 foto terbaru kegiatan desa | Masonry grid + lightbox |
| **Peta Lokasi** | Embedded Google Maps lokasi Desa Mendongan | Interactive map |
| **CTA Section** | "Kenali Desa Kami Lebih Dekat" + tombol ke Profil | Gradient background |

### 2. 📖 Profil Desa

#### 2a. Sejarah Desa
- Narasi sejarah berdirinya Desa Mendongan
- Timeline visual (tahun-tahun penting)
- Foto historis (jika ada)
- Asal-usul nama "Mendongan"

#### 2b. Visi & Misi
- Visi pemerintah desa
- Daftar misi (dengan ikon per poin)
- Motto/tagline desa
- Desain visual yang menarik (bukan hanya teks)

#### 2c. Struktur Organisasi
- **Bagan organisasi interaktif** (Kepala Desa → Sekretaris → Kaur-kaur → Kepala Dusun)
- Klik pada jabatan → muncul modal/popup dengan:
  - Foto pejabat
  - Nama lengkap
  - Jabatan
  - Kontak (opsional)
  - Periode menjabat

#### 2d. Data Demografi
- **Jumlah penduduk** (pria/wanita) → pie chart
- **Berdasarkan usia** → bar chart
- **Berdasarkan pekerjaan** → donut chart
- **Berdasarkan pendidikan** → horizontal bar chart
- **Berdasarkan agama** → tabel
- Data bisa di-update admin lewat panel

#### 2e. Lembaga Desa
- Daftar lembaga (BPD, LKMD, PKK, Karang Taruna, Posyandu, dll)
- Setiap lembaga:
  - Nama lembaga
  - Ketua/pengurus
  - Deskripsi tugas & fungsi
  - Foto kegiatan
  - Jadwal kegiatan rutin (jika ada)

### 3. 🏪 UMKM & Produk Desa

**Halaman paling penting** — sesuai proker KKN: Mapping Potensi Ekonomi Desa

#### Tampilan Utama (Listing):
- **Filter & Search:**
  - Cari berdasarkan nama usaha/produk
  - Filter kategori (Makanan, Minuman, Kerajinan, Pertanian, Jasa, dll)
  - Filter dusun/lokasi
- **Grid Card UMKM** — setiap card berisi:
  - Foto utama usaha/produk
  - Nama usaha
  - Kategori (badge/tag)
  - Deskripsi singkat (truncated)
  - Lokasi (nama dusun)
  - Tombol "Lihat Detail" & "Hubungi via WhatsApp"

#### Halaman Detail UMKM:
| Komponen | Keterangan |
|----------|------------|
| **Galeri Foto** | Slider foto produk/tempat usaha (3-5 foto) |
| **Nama Usaha** | Judul besar |
| **Pemilik** | Nama pemilik usaha |
| **Deskripsi** | Deskripsi lengkap usaha dan produk |
| **Produk/Layanan** | Daftar produk yang dijual (nama + foto + deskripsi singkat) |
| **Kontak** | Nomor WA (klik langsung buka WA), Telp, Email |
| **Alamat** | Alamat lengkap + dusun |
| **Peta Lokasi** | Google Maps embed/pin lokasi UMKM |
| **Share Button** | Bagikan ke WhatsApp, Facebook, copy link |

#### Statistik UMKM:
- Total UMKM terdaftar
- Jumlah per kategori
- Visualisasi peta (cluster marker di Google Maps)

### 4. 📰 Berita & Kegiatan

- **Listing berita** dengan:
  - Thumbnail
  - Judul
  - Tanggal terbit
  - Kategori (Kegiatan, Pengumuman, Pembangunan, dll)
  - Cuplikan isi
  - Penulis
- **Halaman detail berita:**
  - Judul + tanggal + penulis
  - Konten lengkap (rich text: gambar, tabel, link, video embed)
  - Share button (WA, FB, Copy Link)
  - Berita terkait (sidebar/bottom)
- **Fitur:**
  - Pagination
  - Filter kategori
  - Search
  - Arsip berdasarkan bulan/tahun

### 5. 🖼️ Galeri

- **Filter berdasarkan album/kategori:**
  - Kegiatan Desa
  - Pembangunan
  - Hari Besar/Peringatan
  - UMKM
  - Pemandangan Desa
- **Tampilan:**
  - Masonry grid layout
  - Lightbox (klik foto → fullscreen dengan navigasi)
  - Judul + tanggal + deskripsi singkat per foto
- **Opsi video** (embed YouTube jika ada dokumentasi video)

### 6. 🗺️ Wilayah Desa

- **Peta interaktif** (Google Maps / Leaflet.js) menampilkan:
  - Batas wilayah desa
  - Lokasi dusun-dusun
  - Lokasi fasilitas umum (balai desa, masjid, sekolah, puskesmas, dll)
  - Marker UMKM (link ke detail UMKM)
- **Info wilayah:**
  - Luas wilayah
  - Batas desa (utara, selatan, timur, barat)
  - Daftar dusun + RT/RW
  - Topografi/ketinggian
  - Jarak ke kecamatan/kabupaten
- **Legenda peta** (warna/ikon untuk setiap tipe marker)

### 7. 📞 Kontak & FAQ

#### Form Kontak:
- Nama lengkap
- Email
- Subjek (dropdown: Pertanyaan Umum, Surat Menyurat, Kerja Sama, Lainnya)
- Pesan
- Tombol kirim → **langsung kirim ke email desa** (via EmailJS / Nodemailer / backend API)
- Notifikasi sukses/gagal

#### Info Kontak:
- Alamat Kantor Desa Mendongan
- Nomor telepon kantor
- Email desa
- Jam operasional
- Link Google Maps ke kantor desa
- Social media (jika ada: Instagram, Facebook, YouTube desa)

#### FAQ (Frequently Asked Questions):
- Accordion style (klik pertanyaan → jawaban muncul)
- Contoh pertanyaan:
  - "Bagaimana cara mengurus surat pengantar?"
  - "Di mana lokasi Balai Desa Mendongan?"
  - "Apa saja produk unggulan Desa Mendongan?"
  - "Bagaimana cara mendaftarkan UMKM di website?"
  - "Kapan jam pelayanan kantor desa?"
  - "Bagaimana prosedur pindah domisili?"
- FAQ bisa ditambah/edit admin

---

## 🔐 Panel Admin (CMS)

### Login Admin
- Halaman login terpisah (`/admin/login`)
- Username + Password
- Session-based authentication

### Dashboard Admin
```
┌──────────────────────────────────────────────────────────┐
│ [Logo] Admin Desa Mendongan       [Notif] [Profile] [⚙] │
├──────────┬───────────────────────────────────────────────┤
│ Sidebar  │  Dashboard Overview                          │
│          │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐            │
│ Dashboard│  │Total │ │Total│ │Total│ │Pesan│            │
│ Beranda  │  │UMKM  │ │Brita│ │Galri│ │Masuk│            │
│ Profil   │  │ 25   │ │ 48  │ │ 120 │ │  5  │            │
│ UMKM     │  └─────┘ └─────┘ └─────┘ └─────┘            │
│ Berita   │                                               │
│ Galeri   │  [Grafik kunjungan website]                   │
│ Wilayah  │  [Berita terbaru]                             │
│ FAQ      │  [Pesan masuk terbaru]                        │
│ Kontak   │                                               │
│ Pengatura│                                               │
│ Logout   │                                               │
└──────────┴───────────────────────────────────────────────┘
```

### Fitur Admin Panel:

| Menu | Fitur CRUD | Detail |
|------|-----------|--------|
| **Beranda** | Edit | Edit hero banner, sambutan kades, statistik desa, potensi unggulan |
| **Profil Desa** | Edit | Edit sejarah, visi-misi, struktur organisasi (upload foto, isi biodata), demografi (input angka), lembaga desa |
| **UMKM** | CRUD | Tambah/Edit/Hapus UMKM. Form: nama, pemilik, deskripsi, kategori, produk, foto (multiple upload), kontak WA, alamat, koordinat maps |
| **Berita** | CRUD | Tambah/Edit/Hapus berita. Rich text editor (bold, italic, heading, gambar, link, embed video). Kategori, thumbnail, status (draft/published) |
| **Galeri** | CRUD | Upload foto (batch), atur album/kategori, tambah caption |
| **Wilayah** | Edit | Edit info wilayah, daftar dusun, marker peta |
| **FAQ** | CRUD | Tambah/Edit/Hapus/Reorder pertanyaan & jawaban |
| **Pesan Masuk** | Read/Delete | Lihat pesan dari form kontak, tandai sudah dibaca, hapus |
| **Pengaturan** | Edit | Info kontak desa, social media, ganti password admin, pengaturan email |

---

## 🎨 Desain & Branding

### Color Palette
```
Primary:    #1B5E20 (Hijau tua — merepresentasikan alam/pedesaan Sumowono)
Secondary:  #2E7D32 (Hijau medium)
Accent:     #FFB300 (Kuning emas — kemakmuran)
Dark:       #1A1A2E (Dark navy — text & background gelap)
Light:      #F5F7F0 (Off-white kehijauan — background)
White:      #FFFFFF
Gray:       #6B7280 (text secondary)
Success:    #10B981
Warning:    #F59E0B
Error:      #EF4444
```

### Typography
- **Heading:** Plus Jakarta Sans (modern, clean, mendukung bahasa Indonesia)
- **Body:** Inter (sangat readable)
- **Accent/Quote:** Merriweather (untuk sambutan kades/quotes)

### Desain Style
- **Modern & Clean** — tidak berlebihan, tetap terlihat profesional untuk pemerintah desa
- **Green Nature Theme** — sesuai karakter Sumowono yang berbukit dan hijau
- **Glassmorphism** di card-card tertentu (UMKM, statistik)
- **Smooth animations** — fade in on scroll, hover effects pada card
- **Responsive** — mobile-first design
- **Dark/Light mode** (opsional, nice to have)

---

## 🏗️ Arsitektur Teknologi

### Rekomendasi Stack

> [!IMPORTANT]
> **Pertimbangan utama:** Website harus bisa dikelola perangkat desa yang mungkin tidak tech-savvy, dan budget hosting harus terjangkau.

#### Opsi A: Next.js + Supabase (⭐ RECOMMENDED)
```
Frontend:  Next.js 14 (App Router) — React-based, SSR/SSG
Backend:   Next.js API Routes + Supabase (PostgreSQL)
Database:  Supabase (free tier: 500MB, 50K requests/month)
Auth:      Supabase Auth (built-in)
Storage:   Supabase Storage (1GB free) untuk foto
Email:     EmailJS (200 email/bulan free) atau Resend
Maps:      Leaflet.js + OpenStreetMap (gratis, tanpa API key)
Hosting:   Vercel (free tier, cukup untuk desa)
Domain:    desamendongan.id (~Rp 150-250rb/tahun)
```

**Kelebihan:**
- ✅ Hosting 100% gratis (Vercel free tier)
- ✅ Database gratis (Supabase free tier)
- ✅ Modern, cepat, SEO-friendly (SSR)
- ✅ Admin panel custom, bisa disesuaikan
- ✅ Easy deployment (git push → auto deploy)

**Kekurangan:**
- ❌ Perlu belajar Next.js + React (jika belum familiar)
- ❌ Supabase free tier ada limitasi

#### Opsi B: Laravel + Filament + MySQL
```
Frontend:  Blade templates + Alpine.js + Tailwind CSS
Backend:   Laravel 11
Database:  MySQL
Admin:     Filament PHP (admin panel gratis, sangat powerful)
Email:     Laravel Mail (SMTP)
Maps:      Leaflet.js + OpenStreetMap
Hosting:   Hostinger/Niagahoster (~Rp 30-50rb/bulan)
Domain:    desamendongan.id (~Rp 150-250rb/tahun)
```

**Kelebihan:**
- ✅ Kamu sudah familiar Laravel
- ✅ Filament = admin panel profesional otomatis
- ✅ Ekosistem PHP besar, banyak tutorial Indonesia
- ✅ Hosting PHP murah dan banyak tersedia

**Kekurangan:**
- ❌ Hosting tidak gratis (tapi murah)
- ❌ Perlu setup server & database manual

#### Opsi C: Vite React + Firebase (Free Alternative)
```
Frontend:  Vite + React
Backend:   Firebase Cloud Functions
Database:  Firestore (free tier generous)
Auth:      Firebase Auth
Storage:   Firebase Storage (5GB free)
Hosting:   Firebase Hosting (free, 10GB bandwidth/month)
```

---

## 📌 Rekomendasi Fitur Tambahan (Saran)

Berikut fitur-fitur yang bisa **menggantikan Wisata Desa** dan membuat website lebih berguna:

### ✅ Wajib Ada
| Fitur | Alasan |
|-------|--------|
| **Potensi Desa** | Tampilkan potensi pertanian, peternakan, kerajinan (bukan hanya UMKM) |
| **Layanan Publik** | Info prosedur pengurusan surat (KTP, KK, SKTM, dll) + persyaratan + jam pelayanan |
| **Agenda Desa** | Kalender kegiatan desa (posyandu, musyawarah, gotong royong, dll) |

### 🎯 Nice to Have (Jika Waktu Cukup)
| Fitur | Alasan |
|-------|--------|
| **Pengumuman/Banner** | Popup atau banner untuk info penting (bencana, acara besar, dll) |
| **Download Area** | Unduh formulir surat-menyurat, peraturan desa, dll |
| **Infografis APBDes** | Transparansi anggaran desa secara visual |
| **Testimoni Warga** | Kutipan warga tentang desa/UMKM |
| **WhatsApp Float Button** | Tombol WA mengambang untuk kontak cepat |
| **Multi-bahasa (ID/EN)** | Untuk potensi wisatawan atau peneliti luar |

### 🔮 Pengembangan Masa Depan
| Fitur | Alasan |
|-------|--------|
| **Pengaduan Online** | Warga bisa lapor masalah via website |
| **E-Voting Musyawarah** | Voting online untuk musyawarah desa |
| **Marketplace Desa** | UMKM bisa terima pesanan langsung lewat website |
| **Dashboard Analitik** | Tracking pengunjung, UMKM paling dilihat, dll |

---

## 🗓️ Timeline Pengembangan (4 Minggu)

> Asumsi: mulai awal Oktober 2026, deadline 31 Oktober 2026

### Minggu 1 (1-7 Oktober) — Foundation & Core
| Hari | Task | Output |
|------|------|--------|
| 1-2 | Setup project, install dependencies, konfigurasi database + auth | Boilerplate siap |
| 2-3 | Design system: colors, typography, components, layout template | CSS variables, base components |
| 3-4 | **Beranda** — Hero, sambutan kades, statistik, CTA | Homepage responsive |
| 5-6 | **Profil Desa** — Sejarah, Visi Misi, Struktur Organisasi | 3 sub-halaman |
| 7 | **Profil Desa** — Data Demografi (chart), Lembaga Desa | Chart + accordion |

### Minggu 2 (8-14 Oktober) — UMKM & Berita
| Hari | Task | Output |
|------|------|--------|
| 8-9 | **UMKM** — Database schema, CRUD API, listing page (filter, search) | UMKM listing |
| 10-11 | **UMKM** — Detail page, peta lokasi, share button | UMKM detail |
| 12-13 | **Berita** — CRUD API, listing + detail, rich text | Berita system |
| 14 | **Galeri** — Upload, album, lightbox | Gallery page |

### Minggu 3 (15-21 Oktober) — Halaman Lain & Admin
| Hari | Task | Output |
|------|------|--------|
| 15-16 | **Wilayah Desa** — Peta interaktif, marker, info dusun | Map page |
| 17-18 | **Kontak & FAQ** — Form email, FAQ accordion, info kontak | Contact page |
| 19-21 | **Admin Panel** — Login, dashboard, CRUD semua konten | Admin CMS |

### Minggu 4 (22-31 Oktober) — Polish & Launch
| Hari | Task | Output |
|------|------|--------|
| 22-23 | Admin panel: upload foto, rich text editor, user management | Admin complete |
| 24-25 | **Input data real** — masukkan data UMKM, foto, berita asli | Real content |
| 26-27 | **Bilingual support** (ID/EN), SEO optimization, meta tags | i18n + SEO |
| 28-29 | **Testing** — responsive, cross-browser, form email, speed | Bug fixes |
| 30 | **Deploy** ke hosting, setup domain, SSL | Live website |
| 31 | **Dokumentasi** — buku panduan admin untuk perangkat desa | User guide PDF |

---

## 📁 Struktur Folder Project (Next.js + Supabase)

```
website-mendongan/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── logo/
│   │   └── placeholders/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (public)/              # Public-facing pages
│   │   │   ├── page.js            # Beranda
│   │   │   ├── profil/
│   │   │   │   ├── sejarah/
│   │   │   │   ├── visi-misi/
│   │   │   │   ├── struktur-organisasi/
│   │   │   │   ├── demografi/
│   │   │   │   └── lembaga-desa/
│   │   │   ├── umkm/
│   │   │   │   ├── page.js        # Listing UMKM
│   │   │   │   └── [slug]/        # Detail UMKM
│   │   │   ├── berita/
│   │   │   │   ├── page.js        # Listing berita
│   │   │   │   └── [slug]/        # Detail berita
│   │   │   ├── galeri/
│   │   │   ├── wilayah/
│   │   │   └── kontak/
│   │   ├── admin/                 # Admin panel
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── umkm/
│   │   │   ├── berita/
│   │   │   ├── galeri/
│   │   │   ├── faq/
│   │   │   ├── pesan/
│   │   │   └── pengaturan/
│   │   ├── api/                   # API routes
│   │   │   ├── umkm/
│   │   │   ├── berita/
│   │   │   ├── galeri/
│   │   │   ├── kontak/
│   │   │   └── auth/
│   │   ├── layout.js
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── ...
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── StatsCounter.jsx
│   │   │   ├── WelcomeSection.jsx
│   │   │   └── NewsPreview.jsx
│   │   ├── umkm/
│   │   │   ├── UmkmCard.jsx
│   │   │   ├── UmkmFilter.jsx
│   │   │   ├── UmkmMap.jsx
│   │   │   └── UmkmDetail.jsx
│   │   ├── berita/
│   │   │   ├── ArticleCard.jsx
│   │   │   └── ArticleContent.jsx
│   │   ├── galeri/
│   │   │   ├── GalleryGrid.jsx
│   │   │   └── Lightbox.jsx
│   │   └── shared/
│   │       ├── Map.jsx
│   │       ├── ShareButton.jsx
│   │       ├── LanguageSwitcher.jsx
│   │       ├── WhatsAppFloat.jsx
│   │       └── SEOHead.jsx
│   ├── lib/
│   │   ├── supabase.js            # Supabase client
│   │   ├── auth.js                # Auth helpers
│   │   ├── email.js               # Email service
│   │   └── i18n.js                # Internationalization
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useUmkm.js
│   │   └── useBerita.js
│   ├── locales/
│   │   ├── id.json                # Bahasa Indonesia
│   │   └── en.json                # English
│   └── styles/
│       ├── globals.css
│       ├── variables.css
│       └── components/
├── supabase/
│   └── migrations/                # Database schema
├── docs/
│   └── panduan-admin.md           # Buku panduan admin
├── .env.local
├── next.config.js
├── package.json
└── README.md
```

---

## 🗄️ Database Schema

### Tabel Utama:

```sql
-- Pengaturan Website
site_settings (
  id, key, value, updated_at
)

-- Perangkat Desa / Struktur Organisasi
officials (
  id, name, position, photo_url, contact, period, sort_order,
  created_at, updated_at
)

-- UMKM
umkm (
  id, slug, name, owner_name, description,
  category, products, photo_urls[],
  phone_wa, address, dusun, 
  latitude, longitude,
  is_active, created_at, updated_at
)

-- Produk UMKM (relasi ke UMKM)
umkm_products (
  id, umkm_id, name, description, photo_url,
  sort_order, created_at
)

-- Kategori UMKM
umkm_categories (
  id, name, slug, icon, sort_order
)

-- Berita / Artikel
articles (
  id, slug, title, content, excerpt,
  thumbnail_url, category, author,
  status (draft/published), published_at,
  created_at, updated_at
)

-- Galeri
gallery (
  id, title, description, photo_url, album,
  sort_order, created_at
)

-- Album Galeri
gallery_albums (
  id, name, slug, description, sort_order
)

-- FAQ
faqs (
  id, question, answer, sort_order,
  is_active, created_at, updated_at
)

-- Pesan Kontak
contact_messages (
  id, name, email, subject, message,
  is_read, created_at
)

-- Wilayah / Dusun
villages (
  id, name, rt_count, rw_count, description,
  latitude, longitude, sort_order
)

-- Lembaga Desa
institutions (
  id, name, chairman, description, photo_url,
  activities, schedule, sort_order
)

-- Data Demografi
demographics (
  id, category, label, value, year,
  updated_at
)

-- Admin Users
admin_users (
  id, username, email, password_hash, role,
  last_login, created_at
)

-- Translations (untuk bilingual)
translations (
  id, table_name, record_id, field_name,
  locale, value
)
```

---

## 🚀 Checklist Sebelum Launch

- [ ] Semua halaman responsive (mobile, tablet, desktop)
- [ ] Data UMKM real sudah diinput (minimal 10 UMKM)
- [ ] Foto-foto real sudah diupload (hero, galeri, UMKM, perangkat desa)
- [ ] Form kontak berfungsi (email terkirim)
- [ ] Admin bisa login dan update semua konten
- [ ] SEO meta tags di semua halaman
- [ ] Favicon dan logo sudah benar
- [ ] SSL/HTTPS aktif
- [ ] Kecepatan loading < 3 detik
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Buku panduan admin sudah ditulis
- [ ] Training perangkat desa cara pakai admin panel
- [ ] Domain sudah diarahkan

---

## 📝 Deliverables

1. **Website live** di domain `desamendongan.id` (atau subdomain sementara)
2. **Admin panel** dengan akun admin untuk perangkat desa
3. **Data UMKM** minimal 10-15 UMKM sudah diinput lengkap
4. **Buku panduan** cara menggunakan admin panel (PDF)
5. **Source code** dengan dokumentasi di GitHub
6. **Training session** untuk perangkat desa (1-2 jam)

---

> [!NOTE]
> Plan ini bisa disesuaikan. Jika waktu tidak cukup, prioritaskan: **Beranda → UMKM → Profil → Berita → Kontak**. Galeri, Wilayah, dan fitur tambahan bisa ditambahkan bertahap.
