import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-emerald-50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                M
              </div>
              <div className="font-bold text-xl tracking-tight text-white">
                Desa <span className="text-emerald-400">Mendongan</span>
              </div>
            </div>
            <p className="text-emerald-200/80 text-sm leading-relaxed">
              Website resmi Desa Mendongan, Kecamatan Sumowono, Kabupaten Semarang. Menyajikan informasi terkini seputar profil, potensi UMKM, dan layanan desa.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-6 relative inline-block">
              Tautan Cepat
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-emerald-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Beranda', href: '/' },
                { name: 'Profil Desa', href: '/profil' },
                { name: 'Potensi UMKM', href: '/umkm' },
                { name: 'Kabar Desa', href: '/berita' },
                { name: 'Layanan Publik', href: '/layanan' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-emerald-200/80 hover:text-white transition-colors text-sm flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-emerald-500 before:rounded-full before:opacity-0 hover:before:opacity-100 before:transition-opacity">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg text-white mb-6 relative inline-block">
              Kontak & Lokasi
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-emerald-500 rounded-full"></span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-200/80 leading-relaxed">
                    Jl. Raya Mendongan No. 1<br />
                    Kec. Sumowono, Kab. Semarang<br />
                    Jawa Tengah, Indonesia 50662
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-200/80">0812-3456-7890 (WhatsApp)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-200/80">pemdes@mendongan.desa.id</p>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="h-40 bg-emerald-900 rounded-xl overflow-hidden border border-emerald-800/50 relative group">
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-emerald-950 font-medium rounded-lg text-sm shadow-lg hover:scale-105 transition-transform">
                    Buka Google Maps
                  </a>
                </div>
                {/* Embed iframe maps as fallback in real app */}
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-emerald-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-emerald-400/60 text-center md:text-left">
            &copy; {currentYear} Pemerintah Desa Mendongan. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-sm text-emerald-400/60 flex items-center gap-1">
            Dibuat dengan <span className="text-red-400 animate-pulse">❤</span> oleh Tim KKN Undip
          </p>
        </div>
      </div>
    </footer>
  );
}
