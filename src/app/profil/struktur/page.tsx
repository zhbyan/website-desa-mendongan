import { Suspense } from "react";
import PageShell from "../../components/PageShell";
import { PAGE_HERO_IMAGES } from "../../components/shared";
import { getPublishedSiteProfile } from "../../public-cms";
import { mergeSiteProfile } from "@/lib/site-profile";

function whatsappHref(number: string) {
    const digits = number.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits.startsWith("0") ? `62${digits.slice(1)}` : digits}` : "";
}

export default function StrukturPage() {
    return (
        <Suspense fallback={<PageShell><div aria-busy="true" className="w-full px-5 py-20 text-center text-sm text-gray-600">Memuat profil desa...</div></PageShell>}>
            <StructureContent />
        </Suspense>
    );
}

async function StructureContent() {
    const profileData = await getPublishedSiteProfile();
    if (!profileData) {
        return <PageShell><section className="w-full px-5 py-20 text-center"><h1 className="text-2xl font-bold text-[#064e3b]">Data struktur belum tersedia</h1><p className="mt-2 text-sm text-gray-600">Informasi akan ditampilkan setelah profil desa tersedia.</p></section></PageShell>;
    }
    const structure = mergeSiteProfile(profileData).structure;

    return (
        <PageShell>
            <section className="relative w-full overflow-hidden bg-[#E5F8ED] py-16 md:py-20">
                <div className="absolute inset-0 opacity-10"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${PAGE_HERO_IMAGES.struktur}')` }} /></div>
                <div className="relative z-10 w-full px-5 lg:px-12 xl:px-16">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#dcefe5] px-3 py-1.5"><span className="material-symbols-outlined text-sm text-[#064e3b]">badge</span><span className="text-xs font-bold uppercase tracking-wider text-[#064e3b]">Profil Desa • Tata Kelola</span></div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#064e3b] sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-bricolage)" }}>{structure.title}</h1>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">{structure.intro}</p>
                </div>
            </section>

            <section className="w-full bg-white py-16">
                <div className="w-full px-5 lg:px-12 xl:px-16">
                    <div className="mx-auto mb-12 max-w-xl text-center">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E5F8ED] px-3.5 py-1.5"><span className="material-symbols-outlined text-sm text-[#064e3b]">corporate_fare</span><span className="text-xs font-bold uppercase tracking-wider text-[#064e3b]">{structure.officialsLabel}</span></div>
                        <h2 className="text-2xl font-bold text-[#064e3b] sm:text-3xl" style={{ fontFamily: "var(--font-bricolage)" }}>{structure.officialsTitle}</h2>
                        <p className="mt-2 text-sm text-gray-600">{structure.officialsDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {structure.officials.map((item) => (
                            <article className={`flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 sm:p-7 ${item.isVillageHead ? "border-emerald-300 bg-[#E5F8ED] shadow-md ring-2 ring-emerald-500/20 md:col-span-2 lg:col-span-1" : "border-slate-100 bg-slate-50 hover:border-emerald-200 hover:bg-[#E5F8ED]/30 hover:shadow-lg"}`} key={item.id}>
                                <div>
                                    <div className="mb-4 flex items-center gap-4">
                                        {item.photoUrl ? <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border-2 border-[#064e3b] shadow-md"><img alt={item.name} className="h-full w-full object-cover" src={item.photoUrl} /></div> : <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-[#064e3b]"><span className="material-symbols-outlined text-2xl">{item.icon}</span></div>}
                                        <div>
                                            {item.isVillageHead && <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#064e3b] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"><span className="material-symbols-outlined text-xs">verified</span>Kepala Desa</span>}
                                            <h3 className="text-lg font-bold leading-snug text-gray-900" style={{ fontFamily: "var(--font-bricolage)" }}>{item.name}</h3>
                                            <p className="text-xs font-semibold text-[#064e3b]">{item.position}</p>
                                        </div>
                                    </div>
                                    <p className="mb-4 text-xs leading-relaxed text-gray-600 sm:text-sm">{item.duties}</p>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200/60 pt-3 text-xs text-gray-500"><span>Masa Tugas:</span><span className="font-semibold text-gray-800">{item.term}</span></div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#E5F8ED] py-16">
                <div className="w-full px-5 lg:px-12 xl:px-16">
                    <div className="mx-auto mb-12 max-w-xl text-center">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[#064e3b] shadow-sm"><span className="material-symbols-outlined text-sm">home_work</span><span className="text-xs font-bold uppercase tracking-wider">{structure.hamletsLabel}</span></div>
                        <h2 className="text-2xl font-bold text-[#064e3b] sm:text-3xl" style={{ fontFamily: "var(--font-bricolage)" }}>{structure.hamletsTitle}</h2>
                        <p className="mt-2 text-sm text-gray-600">{structure.hamletsDescription}</p>
                    </div>

                    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${structure.hamlets.length === 3 ? "mx-auto max-w-[920px] lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                        {structure.hamlets.map((item, index) => {
                            const href = whatsappHref(item.whatsapp);
                            const centerLastCard = structure.hamlets.length % 2 === 1 && structure.hamlets.length !== 3 && index === structure.hamlets.length - 1;
                            return <article className={`flex flex-col justify-between rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-md ${centerLastCard ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-4 lg:w-[calc(25%-1.125rem)]" : ""}`} key={item.id}>
                                <div>
                                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#064e3b] text-white shadow-sm"><span className="material-symbols-outlined text-xl">person_pin</span></div>
                                    <span className="block text-xs font-bold uppercase tracking-wider text-[#064e3b]">{item.hamlet}</span>
                                    {item.name && <h3 className="mt-1 text-base font-bold text-gray-900" style={{ fontFamily: "var(--font-bricolage)" }}>{item.name}</h3>}
                                    {item.population && <p className="mt-1 text-xs text-gray-500">{item.population}</p>}
                                </div>
                                {href && <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4"><span className="text-[11px] text-gray-400">Hubungi Kadus</span><a aria-label={`WhatsApp ${item.name}`} className="rounded-xl bg-[#E5F8ED] p-2 text-[#064e3b] transition-colors hover:bg-[#cbebd7]" href={href} rel="noopener noreferrer" target="_blank"><span className="material-symbols-outlined text-sm">chat</span></a></div>}
                            </article>;
                        })}
                    </div>
                </div>
            </section>

            <section className="w-full bg-white py-16">
                <div className="w-full px-5 lg:px-12 xl:px-16">
                    <div className="mx-auto mb-12 max-w-xl text-center">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E5F8ED] px-3.5 py-1.5"><span className="material-symbols-outlined text-sm text-[#064e3b]">diversity_3</span><span className="text-xs font-bold uppercase tracking-wider text-[#064e3b]">{structure.institutionsLabel}</span></div>
                        <h2 className="text-2xl font-bold text-[#064e3b] sm:text-3xl" style={{ fontFamily: "var(--font-bricolage)" }}>{structure.institutionsTitle}</h2>
                        <p className="mt-2 text-sm text-gray-600">{structure.institutionsDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                        {structure.institutions.map((item) => <article className="flex flex-col items-start gap-5 rounded-3xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-emerald-200 hover:shadow-lg sm:flex-row sm:p-8" key={item.id}>
                            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#E5F8ED] text-[#064e3b]"><span className="material-symbols-outlined text-2xl">{item.icon}</span></div>
                            <div className="flex-1">
                                <h3 className="mb-1 text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-bricolage)" }}>{item.name}</h3>
                                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-500"><span className="font-semibold text-[#064e3b]">Ketua: {item.chair}</span><span>•</span><span>{item.members}</span></div>
                                <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">{item.role}</p>
                            </div>
                        </article>)}
                    </div>
                </div>
            </section>
        </PageShell>
    );
}