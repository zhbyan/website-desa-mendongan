'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  {
    name: 'Profil Desa',
    href: '#',
    subLinks: [
      { name: 'Tentang Desa', href: '/profil' },
      { name: 'Visi & Misi', href: '/profil/visi-misi' },
      { name: 'Struktur Organisasi', href: '/profil/struktur' },
      { name: 'Wilayah Desa', href: '/profil/wilayah' },
    ],
  },
  { name: 'Potensi & UMKM', href: '/umkm' },
  { name: 'Kabar Desa', href: '/berita' },
  { name: 'Galeri', href: '/galeri' },
  { name: 'Layanan Publik', href: '/layanan' },
  { name: 'FAQ & Kontak', href: '/kontak' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
              M
            </div>
            <div className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-gray-900' : 'text-emerald-950'}`}>
              Desa <span className="text-emerald-600">Mendongan</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                onMouseLeave={() => link.subLinks && setActiveDropdown(null)}
              >
                {link.subLinks ? (
                  <button className={`px-4 py-2 rounded-full font-medium flex items-center gap-1 transition-all ${isScrolled ? 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600' : 'text-gray-800 hover:bg-white/50'}`}>
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-full font-medium block transition-all ${isScrolled ? 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600' : 'text-gray-800 hover:bg-white/50'}`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.subLinks && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2"
                      >
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className="block px-5 py-2.5 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <div key={link.name}>
                  {link.subLinks ? (
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900 px-4 py-2">{link.name}</div>
                      <div className="flex flex-col pl-4 border-l-2 border-emerald-100 ml-4 space-y-1">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:text-emerald-600 rounded-lg"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 font-medium text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
