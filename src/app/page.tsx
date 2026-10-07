import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Users, Building, Leaf } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-emerald-950/70 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1505322747495-6afdd3b70760?q=80&w=2070&auto=format&fit=crop)' }}
        />
        
        <div className="container relative z-20 mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-100 backdrop-blur-sm border border-emerald-500/30 text-sm font-medium mb-6">
            Selamat Datang di
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Desa <span className="text-emerald-400">Mendongan</span>
          </h1>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Mewujudkan masyarakat yang sejahtera, mandiri, dan berbudaya di kawasan asri pegunungan Sumowono.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/profil" 
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-900/20 hover:-translate-y-1"
            >
              Jelajahi Profil Desa
            </Link>
            <Link 
              href="/umkm" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold transition-all hover:-translate-y-1"
            >
              Potensi & UMKM
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Sambutan Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square max-w-md mx-auto">
                {/* Fallback image if no real image is provided */}
                <div className="absolute inset-0 bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-800/20 font-bold text-4xl text-center px-4">Foto Kepala Desa</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold uppercase tracking-wider text-sm">
                <span className="w-8 h-0.5 bg-emerald-600" />
                Sambutan Kepala Desa
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Membangun Desa Mendongan yang Lebih Baik dan Sejahtera
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi Desa Mendongan. Melalui platform ini, kami berkomitmen untuk mewujudkan tata kelola pemerintahan desa yang transparan, inovatif, dan melayani. Mari bersama-sama kita majukan desa tercinta ini."
              </p>
              <div className="pt-4">
                <p className="font-bold text-slate-900 text-lg">Bapak [Nama Kades]</p>
                <p className="text-emerald-600">Kepala Desa Mendongan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Menu / Features */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Layanan & Informasi</h2>
            <p className="text-slate-600">Akses cepat ke berbagai informasi dan layanan publik di Desa Mendongan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Profil Desa', desc: 'Sejarah, Visi Misi, dan Struktur', href: '/profil' },
              { icon: Building, title: 'UMKM', desc: 'Potensi ekonomi dan produk lokal', href: '/umkm' },
              { icon: Leaf, title: 'Layanan Publik', desc: 'Informasi administrasi surat', href: '/layanan' },
              { icon: MapPin, title: 'Peta Wilayah', desc: 'Batas dan peta wilayah desa', href: '/profil/wilayah' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all hover:-translate-y-2">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 mb-6">{item.desc}</p>
                <div className="flex items-center text-emerald-600 font-medium group-hover:gap-2 transition-all">
                  Lihat Detail <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
