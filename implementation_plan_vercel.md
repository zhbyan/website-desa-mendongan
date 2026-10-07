# 🏡 Implementation Plan — Website Profil Desa Mendongan
**Stack: Next.js 14 + Supabase + Vercel**
> KKN — Pengembangan Website untuk Mapping Potensi Desa  
> Desa Mendongan, Kec. Sumowono, Kab. Semarang | Deadline: 31 Oktober 2026

---

## 📦 Tech Stack Final

| Layer | Teknologi | Biaya |
|---|---|---|
| **Frontend + Backend** | Next.js 14 (App Router) | Gratis |
| **Database** | Supabase (PostgreSQL) | Gratis (500MB) |
| **File/Foto Storage** | Supabase Storage | Gratis (1GB) |
| **Authentication Admin** | Supabase Auth | Gratis |
| **Hosting** | Vercel | Gratis |
| **Domain** | `desamendongan.vercel.app` | Gratis selamanya |
| **Email Form Kontak** | Resend.com | Gratis (100 email/hari) |
| **Peta Interaktif** | Leaflet.js + OpenStreetMap | Gratis |
| **Rich Text Editor** | Tiptap | Gratis |
| **Chart Demografi** | Recharts | Gratis |
| **UI Components** | shadcn/ui + Tailwind CSS | Gratis |

**Total Biaya: Rp 0** *(hanya bayar domain `.desa.id` ~Rp 50rb/tahun jika mau resmi)*

---

## ⚙️ FASE 0 — Persiapan & Setup Lingkungan Kerja

### 0.1 Install Tools yang Dibutuhkan

#### Step 1 — Install Node.js (wajib pertama)
1. Buka https://nodejs.org
2. Download **LTS version** (misal: v20.x)
3. Install → Next, Next, Finish
4. Verifikasi di terminal/PowerShell:
```bash
node --version   # harusnya v20.x.x
npm --version    # harusnya v10.x.x
```

#### Step 2 — Install Git
1. Buka https://git-scm.com
2. Download untuk Windows → Install (semua default, klik Next)
3. Verifikasi:
```bash
git --version    # harusnya git version 2.x.x
```

#### Step 3 — Install VSCode (Code Editor)
1. Buka https://code.visualstudio.com
2. Download → Install
3. Install ekstensi yang disarankan di VSCode:
   - **ESLint**
   - **Prettier - Code formatter**
   - **Tailwind CSS IntelliSense**
   - **GitLens**

#### Step 4 — Buat Akun (semua gratis)
- [ ] **GitHub** → github.com — untuk menyimpan kode
- [ ] **Supabase** → supabase.com — database & storage
- [ ] **Vercel** → vercel.com — hosting (login pakai GitHub)
- [ ] **Resend** → resend.com — kirim email form kontak

---

### 0.2 Setup Supabase (Database)

#### Buat Project Supabase:
1. Login ke app.supabase.com
2. Klik **"New Project"**
3. Isi:
   - **Name:** `desa-mendongan`
   - **Database Password:** buat password kuat, **simpan di tempat aman!**
   - **Region:** `Southeast Asia (Singapore)` ← pilih ini biar cepat
4. Klik **"Create new project"** → tunggu ~2 menit
5. Setelah selesai, catat:
   - **Project URL** → `https://xxxxxxxx.supabase.co`
   - **Anon/Public Key** → di Settings → API
   - **Service Role Key** → di Settings → API (jangan share ke publik!)

#### Buat Database Schema:
Di Supabase, buka **SQL Editor**, copy-paste dan jalankan SQL berikut:

```sql
-- =====================================================
-- DATABASE SCHEMA — Website Desa Mendongan
-- =====================================================

create extension if not exists "uuid-ossp";

-- 1. PENGATURAN WEBSITE
create table site_settings (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  value text,
  updated_at timestamp with time zone default now()
);

insert into site_settings (key, value) values
  ('site_name', 'Desa Mendongan'),
  ('site_tagline', 'Desa Mendongan, Kec. Sumowono, Kab. Semarang'),
  ('contact_phone', ''),
  ('contact_email', ''),
  ('contact_address', 'Desa Mendongan, Kec. Sumowono, Kab. Semarang'),
  ('contact_wa', ''),
  ('social_instagram', ''),
  ('social_facebook', ''),
  ('social_youtube', ''),
  ('hero_title_id', 'Selamat Datang di Desa Mendongan'),
  ('hero_title_en', 'Welcome to Mendongan Village'),
  ('kades_name', ''),
  ('kades_quote_id', ''),
  ('kades_photo_url', '');

-- 2. STATISTIK DESA
create table village_stats (
  id uuid default uuid_generate_v4() primary key,
  label_id text not null,
  label_en text,
  value text not null,
  icon text,
  sort_order int default 0
);

insert into village_stats (label_id, label_en, value, icon, sort_order) values
  ('Jumlah Penduduk', 'Total Population', '0 Jiwa', 'users', 1),
  ('Jumlah UMKM', 'Total MSMEs', '0 UMKM', 'store', 2),
  ('Jumlah RT/RW', 'RT/RW Count', '0 RT / 0 RW', 'home', 3),
  ('Luas Wilayah', 'Village Area', '0 Ha', 'map', 4);

-- 3. KATEGORI UMKM
create table umkm_categories (
  id uuid default uuid_generate_v4() primary key,
  name_id text not null,
  name_en text,
  slug text unique not null,
  icon text,
  sort_order int default 0
);

insert into umkm_categories (name_id, name_en, slug, sort_order) values
  ('Semua', 'All', 'all', 0),
  ('Makanan & Minuman', 'Food & Beverage', 'makanan-minuman', 1),
  ('Kerajinan', 'Handicrafts', 'kerajinan', 2),
  ('Pertanian', 'Agriculture', 'pertanian', 3),
  ('Jasa', 'Services', 'jasa', 4),
  ('Lainnya', 'Others', 'lainnya', 5);

-- 4. DATA UMKM
create table umkm (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  owner_name text,
  description_id text,
  description_en text,
  category_id uuid references umkm_categories(id),
  photo_urls text[] default '{}',
  phone_wa text,
  phone_other text,
  email text,
  address text,
  dusun text,
  latitude float,
  longitude float,
  is_active boolean default true,
  is_featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 5. PRODUK UMKM
create table umkm_products (
  id uuid default uuid_generate_v4() primary key,
  umkm_id uuid references umkm(id) on delete cascade,
  name text not null,
  description text,
  photo_url text,
  sort_order int default 0
);

-- 6. BERITA / ARTIKEL
create table articles (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title_id text not null,
  title_en text,
  content_id text,
  content_en text,
  excerpt_id text,
  thumbnail_url text,
  category text default 'Kegiatan',
  author text default 'Admin Desa',
  status text default 'draft' check (status in ('draft', 'published')),
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 7. GALERI ALBUM
create table gallery_albums (
  id uuid default uuid_generate_v4() primary key,
  name_id text not null,
  name_en text,
  slug text unique not null,
  cover_url text,
  sort_order int default 0
);

insert into gallery_albums (name_id, name_en, slug, sort_order) values
  ('Kegiatan Desa', 'Village Activities', 'kegiatan-desa', 1),
  ('Pembangunan', 'Development', 'pembangunan', 2),
  ('UMKM', 'MSMEs', 'umkm', 3),
  ('Hari Besar', 'Special Events', 'hari-besar', 4),
  ('Pemandangan', 'Scenery', 'pemandangan', 5);

-- 8. GALERI FOTO
create table gallery (
  id uuid default uuid_generate_v4() primary key,
  title_id text,
  title_en text,
  description_id text,
  photo_url text not null,
  album_id uuid references gallery_albums(id),
  sort_order int default 0,
  created_at timestamp with time zone default now()
);

-- 9. STRUKTUR ORGANISASI
create table officials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  position_id text not null,
  position_en text,
  photo_url text,
  contact text,
  period text,
  parent_id uuid references officials(id),
  sort_order int default 0
);

-- 10. LEMBAGA DESA
create table institutions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  chairman text,
  description_id text,
  description_en text,
  photo_url text,
  schedule text,
  sort_order int default 0
);

-- 11. DATA DEMOGRAFI
create table demographics (
  id uuid default uuid_generate_v4() primary key,
  category text not null,
  label text not null,
  value int not null default 0,
  year int default 2024,
  updated_at timestamp with time zone default now()
);

-- 12. DUSUN / WILAYAH
create table dusun (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  rt_count int default 0,
  rw_count int default 0,
  description_id text,
  description_en text,
  latitude float,
  longitude float,
  sort_order int default 0
);

-- 13. FAQ
create table faqs (
  id uuid default uuid_generate_v4() primary key,
  question_id text not null,
  question_en text,
  answer_id text not null,
  answer_en text,
  sort_order int default 0,
  is_active boolean default true
);

insert into faqs (question_id, answer_id, sort_order) values
  ('Bagaimana cara mengurus surat pengantar?', 'Datang ke Kantor Desa Mendongan pada jam pelayanan dengan membawa KTP/KK asli.', 1),
  ('Apa saja jam pelayanan Kantor Desa?', 'Senin–Jumat pukul 08.00–14.00 WIB.', 2),
  ('Bagaimana cara mendaftarkan UMKM di website ini?', 'Hubungi kantor desa atau kirim pesan melalui form Kontak di website ini.', 3);

-- 14. PESAN KONTAK
create table contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- ROW LEVEL SECURITY
alter table umkm enable row level security;
alter table articles enable row level security;
alter table gallery enable row level security;
alter table faqs enable row level security;
alter table contact_messages enable row level security;

create policy "Public read active umkm" on umkm for select using (is_active = true);
create policy "Public read published articles" on articles for select using (status = 'published');
create policy "Public read gallery" on gallery for select using (true);
create policy "Public read active faqs" on faqs for select using (is_active = true);
create policy "Public insert contact" on contact_messages for insert with check (true);
```

#### Setup Supabase Storage:
1. Di Supabase → **Storage** → **"New bucket"**
2. Buat bucket: Name: `images` | Public: ✅ ON
3. Buat folder: `hero/` `umkm/` `gallery/` `officials/` `articles/` `institutions/`

---

### 0.3 Setup Project Next.js

Buka terminal PowerShell di folder KKN:

```bash
cd "D:\Documents\SEMESTER 7\KKN\website mendongan"

npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Saat ditanya pilih:
# TypeScript? → Yes
# ESLint? → Yes
# Tailwind CSS? → Yes
# src/ directory? → Yes
# App Router? → Yes
# Customize import alias? → Yes (@/*)
```

#### Install semua dependency:
```bash
# Supabase
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# shadcn/ui setup
npx shadcn@latest init

# Komponen shadcn yang dipakai
npx shadcn@latest add button card input label badge dialog sheet
npx shadcn@latest add dropdown-menu accordion toast skeleton

# Peta
npm install leaflet react-leaflet
npm install -D @types/leaflet

# Chart demografi
npm install recharts

# Rich text editor (admin berita)
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link

# Form & validasi
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend

# Animasi
npm install framer-motion

# Slug generator
npm install slugify
```

#### Buat file `.env.local` di root project:
```env
# Supabase (ambil dari Settings → API di dashboard Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Resend Email (ambil dari dashboard resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_TO=emaildesa@gmail.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Desa Mendongan
NEXT_PUBLIC_WA_NUMBER=628xxxxxxxxxx
```

> **PENTING:** Tambahkan `.env.local` ke `.gitignore` agar tidak ter-upload ke GitHub!

---

### 0.4 Setup GitHub & Vercel

#### Push ke GitHub:
```bash
git init
git add .
git commit -m "chore: initial setup Next.js + Supabase"

# Buat repo baru di github.com (nama: website-desa-mendongan)
git remote add origin https://github.com/USERNAME/website-desa-mendongan.git
git branch -M main
git push -u origin main
```

#### Deploy ke Vercel:
1. Login ke vercel.com → **"New Project"**
2. Import repo `website-desa-mendongan` dari GitHub
3. Di **Environment Variables**, tambahkan isi `.env.local`
4. Klik **"Deploy"** → tunggu ~2 menit
5. ✅ Website live di: `desamendongan.vercel.app`

> Setiap `git push` ke branch `main` → Vercel otomatis deploy ulang!

#### Cek lokal:
```bash
npm run dev
# Buka http://localhost:3000
```

---

## 📁 Struktur Folder Project

```
website-desa-mendongan/
│
├── public/
│   ├── images/logo-desa.png
│   ├── locales/
│   │   ├── id.json          ← teks Bahasa Indonesia
│   │   └── en.json          ← teks English
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── (public)/                    ← Halaman publik
│   │   │   ├── layout.tsx               ← Layout Navbar + Footer + WA Float
│   │   │   ├── page.tsx                 ← Beranda
│   │   │   ├── profil/
│   │   │   │   ├── sejarah/page.tsx
│   │   │   │   ├── visi-misi/page.tsx
│   │   │   │   ├── struktur-organisasi/page.tsx
│   │   │   │   ├── demografi/page.tsx
│   │   │   │   └── lembaga-desa/page.tsx
│   │   │   ├── umkm/
│   │   │   │   ├── page.tsx             ← Listing UMKM
│   │   │   │   └── [slug]/page.tsx      ← Detail UMKM
│   │   │   ├── berita/
│   │   │   │   ├── page.tsx             ← Listing berita
│   │   │   │   └── [slug]/page.tsx      ← Detail artikel
│   │   │   ├── galeri/page.tsx
│   │   │   ├── wilayah/page.tsx
│   │   │   └── kontak/page.tsx
│   │   │
│   │   ├── admin/                       ← Panel Admin (protected)
│   │   │   ├── layout.tsx               ← Layout Admin + Sidebar
│   │   │   ├── login/page.tsx
│   │   │   ├── page.tsx                 ← Dashboard
│   │   │   ├── umkm/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── tambah/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── berita/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── tambah/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── galeri/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── pesan/page.tsx
│   │   │   └── pengaturan/page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── umkm/route.ts
│   │   │   ├── berita/route.ts
│   │   │   ├── galeri/route.ts
│   │   │   ├── kontak/route.ts          ← Kirim email via Resend
│   │   │   └── upload/route.ts          ← Upload ke Supabase Storage
│   │   │
│   │   ├── layout.tsx                   ← Root layout + fonts
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               ← Sticky, glassmorphism, dropdown
│   │   │   ├── Footer.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── WhatsAppFloat.tsx        ← ⭐ Tombol WA mengambang
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsSection.tsx         ← Animated counter
│   │   │   ├── WelcomeKades.tsx
│   │   │   ├── UmkmPreview.tsx
│   │   │   ├── NewsPreview.tsx
│   │   │   ├── GalleryPreview.tsx
│   │   │   └── MapSection.tsx
│   │   │
│   │   ├── umkm/
│   │   │   ├── UmkmCard.tsx
│   │   │   ├── UmkmFilter.tsx
│   │   │   ├── UmkmMapView.tsx
│   │   │   └── UmkmDetail.tsx
│   │   │
│   │   ├── berita/
│   │   │   ├── ArticleCard.tsx
│   │   │   └── RichTextContent.tsx
│   │   │
│   │   ├── galeri/
│   │   │   ├── GalleryGrid.tsx
│   │   │   └── Lightbox.tsx
│   │   │
│   │   ├── profil/
│   │   │   ├── OrgChart.tsx
│   │   │   ├── DemographyChart.tsx
│   │   │   └── Timeline.tsx
│   │   │
│   │   └── admin/
│   │       ├── RichTextEditor.tsx
│   │       ├── ImageUploader.tsx
│   │       └── DataTable.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                ← Browser Supabase client
│   │   │   └── server.ts                ← Server Supabase client
│   │   ├── email.ts
│   │   ├── utils.ts
│   │   └── types.ts                     ← TypeScript types semua tabel
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useLanguage.ts
│   │
│   └── middleware.ts                    ← Proteksi route /admin/*
│
├── .env.local                           ← ⚠️ JANGAN commit ke GitHub
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🧭 Struktur Navbar

```
┌─────────────────────────────────────────────────────────────────────┐
│ 🏡 Desa Mendongan  Beranda | Profil Desa ▼ | UMKM | Berita | Galeri│
│                    | Wilayah | Kontak         [🌐 ID/EN]  [☰ mobile]│
└─────────────────────────────────────────────────────────────────────┘
```

| Menu | Sub-Menu | URL |
|------|----------|-----|
| **Beranda** | — | `/` |
| **Profil Desa** ▼ | Sejarah Desa | `/profil/sejarah` |
| | Visi & Misi | `/profil/visi-misi` |
| | Struktur Organisasi | `/profil/struktur-organisasi` |
| | Data Demografi | `/profil/demografi` |
| | Lembaga Desa | `/profil/lembaga-desa` |
| **UMKM & Produk** | — | `/umkm` |
| **Berita** | — | `/berita` |
| **Galeri** | — | `/galeri` |
| **Wilayah Desa** | — | `/wilayah` |
| **Kontak & FAQ** | — | `/kontak` |

---

## 📄 Detail Halaman

### 1. 🏠 Beranda
| Section | Konten | Fitur |
|---------|--------|-------|
| **Hero** | Foto panorama desa + tagline + 2 CTA button | Parallax, overlay gradient |
| **Sambutan Kades** | Foto + nama + kutipan | Card hover |
| **Statistik** | Penduduk, UMKM, RT/RW, Luas wilayah | Animated counter Framer Motion |
| **UMKM Unggulan** | 4 UMKM featured | Grid card |
| **Berita Terkini** | 3 artikel terbaru | Grid 3 kolom |
| **Galeri Singkat** | 6 foto terbaru | Masonry mini |
| **Lokasi Desa** | Peta Leaflet | Interactive map |

### 2. 📖 Profil Desa
- **Sejarah** — Narasi + timeline visual + foto
- **Visi & Misi** — Card visi + list misi dengan ikon
- **Struktur Organisasi** — Bagan klik → modal foto + biodata perangkat
- **Demografi** — 4 chart Recharts: gender, usia, pekerjaan, pendidikan
- **Lembaga Desa** — Accordion: BPD, PKK, Karang Taruna, Posyandu, dll

### 3. 🏪 UMKM & Produk
- Search bar + filter kategori + filter dusun
- Grid card: foto, nama, kategori badge, dusun, tombol WA langsung
- **Detail UMKM:** galeri slider, deskripsi, list produk, kontak WA, peta lokasi Leaflet, share button

### 4. 📰 Berita
- Grid listing + filter kategori + search + pagination
- **Detail:** judul, thumbnail, konten rich text, share (WA/FB/copy link), berita terkait

### 5. 🖼️ Galeri
- Filter per album, masonry grid, lightbox fullscreen

### 6. 🗺️ Wilayah Desa
- Peta Leaflet dengan marker dusun + marker UMKM
- Info: luas, batas wilayah, tabel dusun RT/RW, topografi

### 7. 📞 Kontak & FAQ
- Form: nama, email, subjek, pesan → kirim email via Resend
- Info kontak + embedded peta kantor desa
- FAQ accordion bilingual (ID/EN)

---

## 🔐 Admin Panel

### Login
- URL: `desamendongan.vercel.app/admin/login`
- Login via Supabase Auth (email + password)
- Middleware redirect jika belum login

### Dashboard
```
┌──────────────┬──────────────────────────────────────────────┐
│ 📊 Dashboard │ Selamat datang!                              │
│ 🏠 Beranda   │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │
│ 📖 Profil    │ │UMKM │ │Brita│ │Galri│ │Pesan│           │
│ 🏪 UMKM      │ │ 25  │ │ 48  │ │ 120 │ │  5  │           │
│ 📰 Berita    │ └─────┘ └─────┘ └─────┘ └─────┘           │
│ 🖼 Galeri    │                                              │
│ ❓ FAQ       │ [Berita terbaru]  [Pesan masuk terbaru]      │
│ 💬 Pesan     │                                              │
│ ⚙ Pengaturan │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

### Fitur Admin per Menu

| Menu | Fitur |
|------|-------|
| **Beranda** | Edit hero (foto, judul, subtitle), sambutan kades, statistik |
| **Profil** | Edit sejarah, visi-misi; struktur org (foto+biodata); demografi (input angka); lembaga desa |
| **UMKM** | Tambah/Edit/Hapus — upload multiple foto, input koordinat, daftar produk |
| **Berita** | Tambah/Edit/Hapus — Tiptap rich text editor, upload thumbnail, draft/publish |
| **Galeri** | Upload foto batch, atur album, caption |
| **Wilayah** | Edit info wilayah, kelola data dusun |
| **FAQ** | Tambah/Edit/Hapus/Urutkan pertanyaan-jawaban (bilingual) |
| **Pesan** | Lihat pesan kontak, tandai baca, hapus |
| **Pengaturan** | Nama desa, kontak, sosmed, link Google Maps, ganti password |

---

## 🎨 Design System

### Color Palette
```css
--primary:    #1B5E20;  /* Hijau tua — alam pegunungan Sumowono */
--secondary:  #2E7D32;  /* Hijau medium */
--accent:     #FFB300;  /* Kuning emas — kemakmuran */
--bg:         #F5F7F0;  /* Off-white kehijauan */
--dark:       #1A2E1A;  /* Text utama */
--gray:       #6B7280;  /* Text sekunder */
```

### Font (Google Fonts — tambahkan di `layout.tsx`)
- **Heading:** Plus Jakarta Sans (modern, readable)
- **Body:** Inter (clean, high readability)
- **Quote:** Merriweather (sambutan kades)

### Komponen Khas
- Sticky navbar dengan **glassmorphism** saat scroll
- Card UMKM: hover naik + shadow + badge kategori warna
- Animated counter (Framer Motion) di statistik beranda
- **⭐ WhatsApp Float Button** — pojok kanan bawah, ikon hijau, bounce animation
- Language switcher 🇮🇩 / 🇬🇧 di navbar
- Toast notification untuk feedback form

---

## 🗓️ Timeline 4 Minggu

### Minggu 0 — Sebelum mulai coding (Persiapan)
- [ ] Install Node.js, Git, VSCode
- [ ] Buat akun GitHub, Supabase, Vercel, Resend
- [ ] Jalankan SQL schema di Supabase
- [ ] `npx create-next-app`, install dependencies
- [ ] Setup `.env.local`
- [ ] Push ke GitHub → deploy ke Vercel
- [ ] Cek: `desamendongan.vercel.app` bisa diakses ✅

### 🔵 Minggu 1 (1–7 Oktober) — Fondasi & Halaman Utama

| Hari | Task | Output |
|------|------|--------|
| 1 | Setup Supabase client (server + browser), TypeScript types | `lib/supabase/`, `lib/types.ts` |
| 1 | Tailwind config (custom colors, fonts), globals.css | Design system siap |
| 2 | Navbar (dropdown Profil, language switcher, mobile hamburger) | `Navbar.tsx` |
| 2 | Footer + WhatsApp Float Button | `Footer.tsx`, `WhatsAppFloat.tsx` |
| 3 | Beranda — Hero Section (foto, tagline, CTA) | Hero |
| 3 | Beranda — Sambutan Kades + Stats Counter animasi | Sections |
| 4 | Beranda — Preview UMKM + Preview Berita | Sections |
| 4 | Beranda — Preview Galeri + Map Section (Leaflet) | Sections |
| 5 | Profil — Sejarah (narasi + timeline) | Sub-halaman |
| 5 | Profil — Visi & Misi (card + list ikon) | Sub-halaman |
| 6 | Profil — Struktur Organisasi (bagan + modal biodata) | Org chart |
| 7 | Profil — Demografi (4 chart Recharts) + Lembaga Desa | Charts + accordion |

### 🟢 Minggu 2 (8–14 Oktober) — UMKM, Berita, Galeri

| Hari | Task | Output |
|------|------|--------|
| 8 | API Route UMKM (GET list, GET detail) | `/api/umkm` |
| 8 | UMKM — Listing: search bar, filter kategori & dusun, grid card | UMKM listing |
| 9 | UMKM — Card component hover animation | Card UI |
| 10 | UMKM — Halaman detail: galeri, produk, kontak WA, peta Leaflet, share | Detail page |
| 11 | API Route Berita + Berita listing + filter | `/api/berita`, listing |
| 12 | Berita — Halaman detail (rich text content, share button) | Detail page |
| 13 | Galeri — Masonry grid + filter album + Lightbox | Gallery page |
| 14 | Wilayah Desa — Peta Leaflet multi-marker + info dusun | Map page |

### 🟡 Minggu 3 (15–21 Oktober) — Kontak & Admin Panel

| Hari | Task | Output |
|------|------|--------|
| 15 | Kontak — Form (react-hook-form + zod) + API kirim email Resend | Form + email |
| 16 | Kontak — FAQ accordion bilingual | FAQ section |
| 16 | Middleware proteksi route `/admin/*` | Auth guard |
| 17 | Admin Login — UI + Supabase Auth | Login page |
| 17 | Admin Dashboard — Stats cards + recent items | Dashboard |
| 18 | Admin UMKM — DataTable list + form tambah/edit | CRUD UMKM UI |
| 19 | Admin UMKM — Multiple foto upload ke Supabase Storage | Upload berfungsi |
| 20 | Admin Berita — DataTable + Tiptap rich text editor + draft/publish | CRUD berita |
| 21 | Admin Galeri — Upload batch + atur album + caption | Galeri admin |

### 🔴 Minggu 4 (22–31 Oktober) — Finishing & Launch

| Hari | Task | Output |
|------|------|--------|
| 22 | Admin FAQ — CRUD + reorder | FAQ management |
| 22 | Admin Pesan — Inbox, tandai baca, hapus | Pesan admin |
| 23 | Admin Pengaturan — Edit info desa, kontak, sosmed | Settings |
| 24 | Admin Profil — Edit sejarah, visi-misi, struktur org, demografi | Profil admin |
| 25 | **Input data real** — 10–15 UMKM dengan foto lengkap | Real content |
| 26 | **Input data real** — Foto galeri, berita kegiatan, demografi | Content penuh |
| 27 | Bilingual — `id.json` + `en.json` + language switcher aktif | ID/EN berfungsi |
| 28 | SEO — meta tags, Open Graph, sitemap.xml, robots.txt | SEO optimized |
| 28 | Testing — responsive HP/tablet/desktop, form email, cross-browser | Bug fixes |
| 29 | Performance — optimasi gambar `next/image`, lazy loading | Lighthouse > 90 |
| 30 | **Deploy final** — push → Vercel auto-deploy | 🌐 Website live! |
| 31 | Buku panduan admin (PDF) + training perangkat desa | ✅ KKN selesai |

---

## ✅ Checklist Pre-Launch

### Fungsionalitas
- [ ] Semua halaman publik bisa diakses dan responsive
- [ ] Form kontak berfungsi → email masuk ke inbox desa
- [ ] Admin bisa login dan logout
- [ ] Admin bisa CRUD UMKM + upload foto ke Supabase Storage
- [ ] Admin bisa CRUD berita dengan rich text editor
- [ ] Admin bisa upload foto galeri
- [ ] Admin bisa kelola FAQ
- [ ] Admin bisa lihat pesan masuk
- [ ] Peta Leaflet menampilkan lokasi yang benar
- [ ] Language switcher (🇮🇩 ID / 🇬🇧 EN) berfungsi
- [ ] WhatsApp float button mengarah ke nomor desa yang benar

### Konten
- [ ] Minimal 10–15 data UMKM diinput dengan foto
- [ ] Minimal 3–5 artikel/berita ditulis
- [ ] Minimal 15–20 foto galeri diunggah
- [ ] Data demografi diisi
- [ ] Info kontak & jam operasional desa diisi
- [ ] Foto dan nama perangkat desa diinput

### Teknis
- [ ] HTTPS aktif (otomatis di Vercel ✅)
- [ ] Meta title & description di semua halaman
- [ ] Favicon sudah logo desa
- [ ] Loading speed < 3 detik (cek Lighthouse)
- [ ] Tidak ada error di console browser
- [ ] `.env.local` TIDAK ada di GitHub

---

## 📝 Deliverables KKN

| No | Deliverable | Deadline |
|----|-------------|----------|
| 1 | Website live di `desamendongan.vercel.app` | 30 Oktober 2026 |
| 2 | Admin panel aktif + akun perangkat desa | 30 Oktober 2026 |
| 3 | Minimal 10 UMKM terdata lengkap | 26 Oktober 2026 |
| 4 | Source code di GitHub | 30 Oktober 2026 |
| 5 | Buku panduan admin (PDF) | 31 Oktober 2026 |
| 6 | Training perangkat desa (1–2 jam) | 31 Oktober 2026 |

---

> **Langkah Selanjutnya:**
> 1. Install Node.js + Git + VSCode
> 2. Buat akun Supabase + Vercel + GitHub + Resend
> 3. Jalankan SQL schema di Supabase SQL Editor
> 4. Jalankan `npx create-next-app@latest .` di folder KKN
> 5. Bilang ke saya → kita mulai coding komponen pertama! 💻
