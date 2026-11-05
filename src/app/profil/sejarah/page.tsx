import { BookOpenText, Footprints, Landmark, MapPinned, Trees } from "lucide-react";
import PageShell from "../../components/PageShell";
import { PAGE_HERO_IMAGES } from "../../components/shared";

const villageOrigins = ["Gondangsari", "Suatu", "Kauman", "Pancas", "Setro"];

export default function SejarahPage() {
    return (
        <PageShell>
            <section className="relative w-full overflow-hidden bg-[#E5F8ED] py-16 md:py-20">
                <div className="absolute inset-0 opacity-15">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${PAGE_HERO_IMAGES.sejarah}')` }} />
                </div>
                <div className="relative z-10 w-full px-5 lg:px-12 xl:px-16">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5">
                        <BookOpenText aria-hidden="true" className="size-4 text-[#064e3b]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#064e3b]">Profil Desa • Jejak Sejarah</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#064e3b] sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-bricolage)" }}>
                        Sejarah Desa Mendongan
                    </h1>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
                        Kisah pembukaan hutan di kaki Gunung Ungaran dan awal terbentuknya permukiman Mendongan.
                    </p>
                </div>
            </section>

            <section className="w-full bg-white py-12 md:py-16">
                <div className="mx-auto w-full max-w-5xl px-5 lg:px-12 xl:px-16">
                    <article className="space-y-10">
                        <div className="border-l-4 border-emerald-300 pl-5 sm:pl-7">
                            <p className="text-lg font-semibold leading-relaxed text-[#173c2c] sm:text-xl">
                                Dahulu Mendongan merupakan hutan di kaki Gunung Ungaran yang belum dapat dihuni. Kisah lisan tentang bagaimana hutan itu dibuka dan menjadi Desa Mendongan diceritakan turun-temurun.
                            </p>
                        </div>

                        <section aria-labelledby="pengembaraan-title" className="grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-[48px_1fr] sm:gap-5">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-[#E5F8ED] text-[#064e3b] sm:size-12"><Footprints aria-hidden="true" className="size-5 sm:size-6" /></div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#32835c]">Sekitar tahun 1830</p>
                                <h2 id="pengembaraan-title" className="mt-1 text-xl font-bold text-[#064e3b] sm:text-2xl" style={{ fontFamily: "var(--font-bricolage)" }}>Pengembaraan pasca Perang Diponegoro</h2>
                                <p className="mt-3 text-sm leading-7 text-gray-700">
                                    Setelah Perang Diponegoro melawan Belanda, keadaan di Magelang dan sekitarnya menjadi tidak menentu. Situasi mencekam membuat penduduk mencari tempat perlindungan yang aman dan tidak diketahui Belanda. Sejumlah prajurit yang lolos dari kejaran Belanda meneruskan perjalanan untuk mencari daerah baru.
                                </p>
                                <p className="mt-3 text-sm leading-7 text-gray-700">
                                    Walaupun Pangeran Diponegoro dan Sentot Prawiro Dirjo berhasil ditangkap Belanda, sebagian prajurit tetap lolos dan meneruskan perjuangan dengan mencari daerah yang aman.
                                </p>
                                <p className="mt-3 text-sm leading-7 text-gray-700">
                                    Menurut kisah yang disampaikan, tiga orang yang merupakan murid Kyai Mojo, yaitu Kyai Gusti, Kyai Mendong, dan istri Kyai Mendong, mengembara ke arah barat laut.
                                </p>
                            </div>
                        </section>

                        <section aria-labelledby="bubak-alas-title" className="grid grid-cols-[40px_1fr] gap-4 border-t border-gray-100 pt-8 sm:grid-cols-[48px_1fr] sm:gap-5">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-[#E5F8ED] text-[#064e3b] sm:size-12"><Trees aria-hidden="true" className="size-5 sm:size-6" /></div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#32835c]">Pembukaan permukiman</p>
                                <h2 id="bubak-alas-title" className="mt-1 text-xl font-bold text-[#064e3b] sm:text-2xl" style={{ fontFamily: "var(--font-bricolage)" }}>Bubak alas di Gunung Gendol</h2>
                                <p className="mt-3 text-sm leading-7 text-gray-700">
                                    Setelah menempuh perjalanan, mereka tiba di sebuah hutan di anak kaki gunung yang saat itu disebut Gunung Gendol. Mereka mulai membuka hutan atau “bubak alas”. Tanah yang subur dan air yang mudah didapat membuat mereka menetap di sana. Daerah inilah yang kemudian berkembang menjadi Desa Mendongan.
                                </p>
                                <blockquote className="mt-5 border-l-2 border-emerald-400 bg-[#F4FAF6] px-4 py-3 text-sm leading-7 text-gray-700 sm:px-5">
                                    Menurut legenda yang diwariskan masyarakat, bangsa jin membantu mereka membuka hutan atas izin Allah SWT. Dalam waktu yang tidak begitu lama, beberapa kampung kemudian terbentuk di sekitar Mendongan.
                                </blockquote>
                            </div>
                        </section>

                        <section aria-labelledby="kampung-title" className="grid grid-cols-[40px_1fr] gap-4 border-t border-gray-100 pt-8 sm:grid-cols-[48px_1fr] sm:gap-5">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-[#E5F8ED] text-[#064e3b] sm:size-12"><MapPinned aria-hidden="true" className="size-5 sm:size-6" /></div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#32835c]">Permukiman awal</p>
                                <h2 id="kampung-title" className="mt-1 text-xl font-bold text-[#064e3b] sm:text-2xl" style={{ fontFamily: "var(--font-bricolage)" }}>Kampung-kampung yang terbentuk</h2>
                                <p className="mt-3 text-sm leading-7 text-gray-700">Kisah sejarah menyebut lima kampung yang terbentuk di sekitar Mendongan:</p>
                                <ol className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {villageOrigins.map((village, index) => (
                                        <li className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-gray-800" key={village}>
                                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#E5F8ED] text-xs font-bold text-[#064e3b]">{index + 1}</span>
                                            Kampung {village}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </section>

                        <section aria-labelledby="lanjan-title" className="grid grid-cols-[40px_1fr] gap-4 border-t border-gray-100 pt-8 sm:grid-cols-[48px_1fr] sm:gap-5">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-[#E5F8ED] text-[#064e3b] sm:size-12"><Landmark aria-hidden="true" className="size-5 sm:size-6" /></div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#32835c]">Kyai Gusti dan Lanjan</p>
                                <h2 id="lanjan-title" className="mt-1 text-xl font-bold text-[#064e3b] sm:text-2xl" style={{ fontFamily: "var(--font-bricolage)" }}>Jejak yang tersimpan di dua desa</h2>
                                <p className="mt-3 text-sm leading-7 text-gray-700">
                                    Setelah Desa Mendongan terbentuk, Kyai Gusti kembali ke Desa Lanjan, tempat tinggalnya sebelumnya. Ia meninggal dan dimakamkan di Lanjan. Istri Kyai Mendong juga dimakamkan di Lanjan setelah bersilaturahmi ke tempat Kyai Gusti dan jatuh sakit.
                                </p>
                            </div>
                        </section>
                    </article>
                </div>
            </section>
        </PageShell>
    );
}