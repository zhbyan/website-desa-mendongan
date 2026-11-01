"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Plus, Save, Trash2 } from "lucide-react";
import { saveSiteProfile, type AdminActionState } from "@/app/admin/actions";
import type { SiteProfile } from "@/lib/site-profile";

const initialState: AdminActionState = { message: "", status: "idle" };
const inputClass = "h-11 w-full rounded-lg border border-[#dce4dc] bg-white px-3 text-sm text-[#253229] outline-none focus:border-[#1a5c3a] focus:ring-3 focus:ring-[#1a5c3a]/10";
const textareaClass = "w-full resize-y rounded-lg border border-[#dce4dc] bg-white px-3 py-2.5 text-sm text-[#253229] outline-none focus:border-[#1a5c3a] focus:ring-3 focus:ring-[#1a5c3a]/10";

function Field({ label, value, onChange, multiline = false, rows = 3, type = "text" }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    rows?: number;
    type?: string;
}) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-[#354238]">{label}</span>
            {multiline
                ? <textarea className={textareaClass} onChange={(event) => onChange(event.target.value)} rows={rows} value={value} />
                : <input className={inputClass} onChange={(event) => onChange(event.target.value)} type={type} value={value} />}
        </label>
    );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
    return <div className="border-b border-[#edf0ed] pb-3"><h2 className="font-[family-name:var(--font-bricolage)] text-lg font-bold">{title}</h2><p className="mt-1 text-xs text-[#738078]">{description}</p></div>;
}

export default function SiteProfileManager({ initialProfile }: { initialProfile: SiteProfile }) {
    const [profile, setProfile] = useState(initialProfile);
    const [state, formAction, pending] = useActionState(saveSiteProfile, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.status === "success") router.refresh();
    }, [router, state.status]);

    function updateWelcome(key: keyof SiteProfile["welcome"], value: string) {
        setProfile((current) => ({ ...current, welcome: { ...current.welcome, [key]: value } }));
    }

    function updateVision(key: Exclude<keyof SiteProfile["vision"], "missions">, value: string) {
        setProfile((current) => ({ ...current, vision: { ...current.vision, [key]: value } }));
    }

    function updateStructure(key: Exclude<keyof SiteProfile["structure"], "officials" | "hamlets" | "institutions">, value: string) {
        setProfile((current) => ({ ...current, structure: { ...current.structure, [key]: value } }));
    }

    function addItem(list: "missions" | "officials" | "hamlets" | "institutions") {
        const id = crypto.randomUUID();
        setProfile((current) => {
            if (list === "missions") return { ...current, vision: { ...current.vision, missions: [...current.vision.missions, { id, icon: "flag", title: "", description: "", badge: "" }] } };
            if (list === "officials") return { ...current, structure: { ...current.structure, officials: [...current.structure.officials, { id, name: "", position: "", duties: "", term: "", photoUrl: "", icon: "person", isVillageHead: false }] } };
            if (list === "hamlets") return { ...current, structure: { ...current.structure, hamlets: [...current.structure.hamlets, { id, name: "", hamlet: "", population: "", whatsapp: "" }] } };
            return { ...current, structure: { ...current.structure, institutions: [...current.structure.institutions, { id, name: "", chair: "", members: "", icon: "groups", role: "" }] } };
        });
    }

    function updateMission(id: string, key: "icon" | "title" | "description" | "badge", value: string) {
        setProfile((current) => ({ ...current, vision: { ...current.vision, missions: current.vision.missions.map((item) => item.id === id ? { ...item, [key]: value } : item) } }));
    }

    function updateOfficial(id: string, key: "name" | "position" | "duties" | "term" | "photoUrl" | "icon" | "isVillageHead", value: string | boolean) {
        setProfile((current) => ({ ...current, structure: { ...current.structure, officials: current.structure.officials.map((item) => item.id === id ? { ...item, [key]: value } : item) } }));
    }

    function updateHamlet(id: string, key: "name" | "hamlet" | "population" | "whatsapp", value: string) {
        setProfile((current) => ({ ...current, structure: { ...current.structure, hamlets: current.structure.hamlets.map((item) => item.id === id ? { ...item, [key]: value } : item) } }));
    }

    function updateInstitution(id: string, key: "name" | "chair" | "members" | "icon" | "role", value: string) {
        setProfile((current) => ({ ...current, structure: { ...current.structure, institutions: current.structure.institutions.map((item) => item.id === id ? { ...item, [key]: value } : item) } }));
    }

    function removeItem(list: "missions" | "officials" | "hamlets" | "institutions", id: string) {
        setProfile((current) => {
            if (list === "missions") return { ...current, vision: { ...current.vision, missions: current.vision.missions.filter((item) => item.id !== id) } };
            if (list === "officials") return { ...current, structure: { ...current.structure, officials: current.structure.officials.filter((item) => item.id !== id) } };
            if (list === "hamlets") return { ...current, structure: { ...current.structure, hamlets: current.structure.hamlets.filter((item) => item.id !== id) } };
            return { ...current, structure: { ...current.structure, institutions: current.structure.institutions.filter((item) => item.id !== id) } };
        });
    }

    return (
        <form action={formAction} className="space-y-5">
            <input name="profile" type="hidden" value={JSON.stringify(profile)} />

            <section className="space-y-5 rounded-xl border border-[#e1e8e1] bg-white p-4 sm:p-6">
                <SectionHeading description="Foto, isi sambutan, identitas kepala desa, dan kontak WhatsApp." title="Sambutan Kepala Desa" />
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-3 sm:row-span-3">
                        {profile.welcome.imageUrl && <img alt="Pratinjau foto kepala desa" className="h-56 w-full rounded-lg border border-[#e4eae4] object-cover" src={profile.welcome.imageUrl} />}
                        <label className="flex min-h-11 items-center gap-2 rounded-lg border border-dashed border-[#cbd7cd] bg-[#fafcf9] px-3 text-xs text-[#647168]">
                            <ImagePlus size={17} /> Ganti foto (JPG, PNG, WebP, maks. 10 MB)
                            <input accept="image/jpeg,image/png,image/webp" className="ml-auto max-w-[190px] text-[11px]" name="welcome_image" type="file" />
                        </label>
                        <Field label="URL foto saat ini" onChange={(value) => updateWelcome("imageUrl", value)} value={profile.welcome.imageUrl} />
                    </div>
                    <Field label="Nama kepala desa" onChange={(value) => updateWelcome("name", value)} value={profile.welcome.name} />
                    <Field label="Jabatan / keterangan" onChange={(value) => updateWelcome("position", value)} value={profile.welcome.position} />
                    <Field label="Periode masa bakti" onChange={(value) => updateWelcome("term", value)} value={profile.welcome.term} />
                    <Field label="Nomor WhatsApp" onChange={(value) => updateWelcome("whatsapp", value)} value={profile.welcome.whatsapp} type="tel" />
                    <Field label="Kutipan sambutan" multiline onChange={(value) => updateWelcome("quote", value)} rows={5} value={profile.welcome.quote} />
                    <Field label="Teks pendamping" multiline onChange={(value) => updateWelcome("supportingText", value)} rows={4} value={profile.welcome.supportingText} />
                </div>
            </section>

            <section className="space-y-5 rounded-xl border border-[#e1e8e1] bg-white p-4 sm:p-6">
                <SectionHeading description="Semua judul, keterangan, visi, dan daftar misi dapat diubah." title="Visi & Misi" />
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Judul halaman" onChange={(value) => updateVision("title", value)} value={profile.vision.title} />
                    <Field label="Periode visi" onChange={(value) => updateVision("period", value)} value={profile.vision.period} />
                    <Field label="Pengantar halaman" multiline onChange={(value) => updateVision("intro", value)} value={profile.vision.intro} />
                    <Field label="Pernyataan visi" multiline onChange={(value) => updateVision("statement", value)} rows={4} value={profile.vision.statement} />
                    <Field label="Keterangan visi" multiline onChange={(value) => updateVision("supportingText", value)} value={profile.vision.supportingText} />
                    <Field label="Label bagian misi" onChange={(value) => updateVision("missionLabel", value)} value={profile.vision.missionLabel} />
                    <Field label="Judul daftar misi" onChange={(value) => updateVision("missionTitle", value)} value={profile.vision.missionTitle} />
                </div>
                <div className="space-y-3">
                    {profile.vision.missions.map((item, index) => <article className="grid gap-3 rounded-lg border border-[#e7ece7] bg-[#fafcf9] p-4 sm:grid-cols-2" key={item.id}>
                        <div className="flex items-center justify-between gap-3 sm:col-span-2"><h3 className="text-sm font-bold">Misi {index + 1}</h3><button aria-label={`Hapus misi ${index + 1}`} className="flex size-8 items-center justify-center rounded-md text-[#8a5148] hover:bg-[#fff0ed]" onClick={() => removeItem("missions", item.id)} type="button"><Trash2 size={15} /></button></div>
                        <Field label="Judul" onChange={(value) => updateMission(item.id, "title", value)} value={item.title} />
                        <Field label="Label" onChange={(value) => updateMission(item.id, "badge", value)} value={item.badge} />
                        <Field label="Ikon Material Symbols" onChange={(value) => updateMission(item.id, "icon", value)} value={item.icon} />
                        <Field label="Uraian" multiline onChange={(value) => updateMission(item.id, "description", value)} value={item.description} />
                    </article>)}
                    <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#cdd9ce] px-3 text-xs font-bold text-[#12603e] hover:bg-[#f4f8f4]" onClick={() => addItem("missions")} type="button"><Plus size={15} />Tambah misi</button>
                </div>
            </section>

            <section className="space-y-5 rounded-xl border border-[#e1e8e1] bg-white p-4 sm:p-6">
                <SectionHeading description="Edit bagian halaman dan kelola nama/jabatan tanpa mengubah kode." title="Struktur Organisasi" />
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Judul halaman" onChange={(value) => updateStructure("title", value)} value={profile.structure.title} />
                    <Field label="Pengantar halaman" multiline onChange={(value) => updateStructure("intro", value)} value={profile.structure.intro} />
                    <Field label="Label aparatur" onChange={(value) => updateStructure("officialsLabel", value)} value={profile.structure.officialsLabel} />
                    <Field label="Judul aparatur" onChange={(value) => updateStructure("officialsTitle", value)} value={profile.structure.officialsTitle} />
                    <Field label="Keterangan aparatur" multiline onChange={(value) => updateStructure("officialsDescription", value)} value={profile.structure.officialsDescription} />
                    <Field label="Label kepala dusun" onChange={(value) => updateStructure("hamletsLabel", value)} value={profile.structure.hamletsLabel} />
                    <Field label="Judul kepala dusun" onChange={(value) => updateStructure("hamletsTitle", value)} value={profile.structure.hamletsTitle} />
                    <Field label="Keterangan kepala dusun" multiline onChange={(value) => updateStructure("hamletsDescription", value)} value={profile.structure.hamletsDescription} />
                    <Field label="Keterangan lembaga" multiline onChange={(value) => updateStructure("institutionsDescription", value)} value={profile.structure.institutionsDescription} />
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-bold">Aparatur Pemerintah Desa</h3>
                    {profile.structure.officials.map((item, index) => <article className="grid gap-3 rounded-lg border border-[#e7ece7] bg-[#fafcf9] p-4 sm:grid-cols-2" key={item.id}>
                        <div className="flex items-center justify-between gap-3 sm:col-span-2"><h4 className="text-xs font-bold">Aparatur {index + 1}</h4><button aria-label={`Hapus aparatur ${index + 1}`} className="flex size-8 items-center justify-center rounded-md text-[#8a5148] hover:bg-[#fff0ed]" onClick={() => removeItem("officials", item.id)} type="button"><Trash2 size={15} /></button></div>
                        <Field label="Nama" onChange={(value) => updateOfficial(item.id, "name", value)} value={item.name} />
                        <Field label="Jabatan" onChange={(value) => updateOfficial(item.id, "position", value)} value={item.position} />
                        <Field label="Tugas / keterangan" multiline onChange={(value) => updateOfficial(item.id, "duties", value)} value={item.duties} />
                        <Field label="Masa tugas" onChange={(value) => updateOfficial(item.id, "term", value)} value={item.term} />
                        <Field label="URL foto" onChange={(value) => updateOfficial(item.id, "photoUrl", value)} value={item.photoUrl} />
                        <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#354238]">Unggah foto aparatur (maks. 10 MB)</span><input accept="image/jpeg,image/png,image/webp" className="w-full text-xs" name={`official_image_${item.id}`} type="file" /></label>
                        <Field label="Ikon Material Symbols" onChange={(value) => updateOfficial(item.id, "icon", value)} value={item.icon} />
                        <label className="flex items-center gap-2 text-xs font-semibold text-[#354238]"><input checked={item.isVillageHead} className="size-4 accent-[#064e3b]" onChange={(event) => updateOfficial(item.id, "isVillageHead", event.target.checked)} type="checkbox" />Tandai sebagai kepala desa</label>
                    </article>)}
                    <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#cdd9ce] px-3 text-xs font-bold text-[#12603e] hover:bg-[#f4f8f4]" onClick={() => addItem("officials")} type="button"><Plus size={15} />Tambah aparatur</button>
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-bold">Kepala Dusun</h3>
                    {profile.structure.hamlets.map((item, index) => <article className="grid gap-3 rounded-lg border border-[#e7ece7] bg-[#fafcf9] p-4 sm:grid-cols-2" key={item.id}>
                        <div className="flex items-center justify-between gap-3 sm:col-span-2"><h4 className="text-xs font-bold">Dusun {index + 1}</h4><button aria-label={`Hapus kepala dusun ${index + 1}`} className="flex size-8 items-center justify-center rounded-md text-[#8a5148] hover:bg-[#fff0ed]" onClick={() => removeItem("hamlets", item.id)} type="button"><Trash2 size={15} /></button></div>
                        <Field label="Nama kepala dusun" onChange={(value) => updateHamlet(item.id, "name", value)} value={item.name} />
                        <Field label="Nama dusun" onChange={(value) => updateHamlet(item.id, "hamlet", value)} value={item.hamlet} />
                        <Field label="Data penduduk" onChange={(value) => updateHamlet(item.id, "population", value)} value={item.population} />
                        <Field label="Nomor WhatsApp" onChange={(value) => updateHamlet(item.id, "whatsapp", value)} value={item.whatsapp} type="tel" />
                    </article>)}
                    <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#cdd9ce] px-3 text-xs font-bold text-[#12603e] hover:bg-[#f4f8f4]" onClick={() => addItem("hamlets")} type="button"><Plus size={15} />Tambah kepala dusun</button>
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-bold">Lembaga Kemasyarakatan</h3>
                    {profile.structure.institutions.map((item, index) => <article className="grid gap-3 rounded-lg border border-[#e7ece7] bg-[#fafcf9] p-4 sm:grid-cols-2" key={item.id}>
                        <div className="flex items-center justify-between gap-3 sm:col-span-2"><h4 className="text-xs font-bold">Lembaga {index + 1}</h4><button aria-label={`Hapus lembaga ${index + 1}`} className="flex size-8 items-center justify-center rounded-md text-[#8a5148] hover:bg-[#fff0ed]" onClick={() => removeItem("institutions", item.id)} type="button"><Trash2 size={15} /></button></div>
                        <Field label="Nama lembaga" onChange={(value) => updateInstitution(item.id, "name", value)} value={item.name} />
                        <Field label="Ketua" onChange={(value) => updateInstitution(item.id, "chair", value)} value={item.chair} />
                        <Field label="Jumlah/komposisi anggota" onChange={(value) => updateInstitution(item.id, "members", value)} value={item.members} />
                        <Field label="Ikon Material Symbols" onChange={(value) => updateInstitution(item.id, "icon", value)} value={item.icon} />
                        <Field label="Peran / keterangan" multiline onChange={(value) => updateInstitution(item.id, "role", value)} value={item.role} />
                    </article>)}
                    <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#cdd9ce] px-3 text-xs font-bold text-[#12603e] hover:bg-[#f4f8f4]" onClick={() => addItem("institutions")} type="button"><Plus size={15} />Tambah lembaga</button>
                </div>
            </section>

            {state.message && <p aria-live="polite" className={`rounded-lg px-3 py-2.5 text-xs font-semibold ${state.status === "error" ? "bg-[#fff0ed] text-[#9d3d31]" : "bg-[#e7f5ec] text-[#155b39]"}`}>{state.message}</p>}
            <div className="sticky bottom-3 flex justify-end"><button className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#064e3b] px-5 text-xs font-bold text-white shadow-lg hover:bg-[#0b6848] disabled:opacity-60" disabled={pending} type="submit"><Save size={16} />{pending ? "Menyimpan..." : "Simpan Profil Desa"}</button></div>
        </form>
    );
}