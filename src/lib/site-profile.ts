export type MissionItem = {
    id: string;
    icon: string;
    title: string;
    description: string;
    badge: string;
};

export type OfficialItem = {
    id: string;
    name: string;
    position: string;
    duties: string;
    term: string;
    photoUrl: string;
    icon: string;
    isVillageHead: boolean;
};

export type HamletItem = {
    id: string;
    name: string;
    hamlet: string;
    population: string;
    whatsapp: string;
};

export type InstitutionItem = {
    id: string;
    name: string;
    chair: string;
    members: string;
    icon: string;
    role: string;
};

export type SiteProfile = {
    welcome: {
        imageUrl: string;
        quote: string;
        supportingText: string;
        name: string;
        position: string;
        term: string;
        whatsapp: string;
    };
    vision: {
        title: string;
        intro: string;
        period: string;
        statement: string;
        supportingText: string;
        missionLabel: string;
        missionTitle: string;
        missions: MissionItem[];
    };
    structure: {
        title: string;
        intro: string;
        officialsLabel: string;
        officialsTitle: string;
        officialsDescription: string;
        officials: OfficialItem[];
        hamletsLabel: string;
        hamletsTitle: string;
        hamletsDescription: string;
        hamlets: HamletItem[];
        institutionsLabel: string;
        institutionsTitle: string;
        institutionsDescription: string;
        institutions: InstitutionItem[];
    };
};

export const VILLAGE_WELCOME_QUOTE = "Selamat datang di website resmi Desa Mendongan. Temukan berbagai potensi hasil tani, kerajinan tangan lokal, dan informasi pelayanan desa yang transparan untuk warga maupun pengunjung.";

export const EMPTY_SITE_PROFILE: SiteProfile = {
    welcome: {
        imageUrl: "",
        quote: VILLAGE_WELCOME_QUOTE,
        supportingText: "",
        name: "",
        position: "",
        term: "",
        whatsapp: "",
    },
    vision: {
        title: "",
        intro: "",
        period: "",
        statement: "",
        supportingText: "",
        missionLabel: "",
        missionTitle: "",
        missions: [],
    },
    structure: {
        title: "",
        intro: "",
        officialsLabel: "Aparatur Pemdes",
        officialsTitle: "Pemerintah Desa Mendongan",
        officialsDescription: "",
        officials: [],
        hamletsLabel: "Unsur Kewilayahan",
        hamletsTitle: "Kepala Dusun (Kadus)",
        hamletsDescription: "",
        hamlets: [],
        institutionsLabel: "Kelompok Masyarakat",
        institutionsTitle: "Wadah Warga Mendongan",
        institutionsDescription: "",
        institutions: [],
    },
};

export function mergeSiteProfile(value: unknown): SiteProfile {
    if (!value || typeof value !== "object") return EMPTY_SITE_PROFILE;

    const saved = value as Partial<SiteProfile>;
    const validHamlets = new Set(["Dusun Gondangsari", "Dusun Mendongan", "Dusun Setro"]);
    const savedHamlets = Array.isArray(saved.structure?.hamlets)
        ? saved.structure.hamlets.filter((item) => validHamlets.has(item.hamlet))
        : [];
    const hamletsDescription = saved.structure?.hamletsDescription?.replace(
        /\b4(\s+(?:wilayah\s+)?dusun)\b/gi,
        "3$1",
    );

    const welcome = { ...EMPTY_SITE_PROFILE.welcome, ...saved.welcome };
    if (!saved.welcome?.quote || saved.welcome.quote.startsWith("Selamat datang di gerbang digital Desa Mendongan.")) {
        welcome.quote = VILLAGE_WELCOME_QUOTE;
    }

    return {
        welcome,
        vision: {
            ...EMPTY_SITE_PROFILE.vision,
            ...saved.vision,
            missions: Array.isArray(saved.vision?.missions) ? saved.vision.missions : EMPTY_SITE_PROFILE.vision.missions,
        },
        structure: {
            ...EMPTY_SITE_PROFILE.structure,
            ...saved.structure,
            institutionsLabel: EMPTY_SITE_PROFILE.structure.institutionsLabel,
            institutionsTitle: EMPTY_SITE_PROFILE.structure.institutionsTitle,
            hamletsDescription: hamletsDescription ?? EMPTY_SITE_PROFILE.structure.hamletsDescription,
            officials: Array.isArray(saved.structure?.officials) ? saved.structure.officials : EMPTY_SITE_PROFILE.structure.officials,
            hamlets: Array.isArray(saved.structure?.hamlets) ? savedHamlets : EMPTY_SITE_PROFILE.structure.hamlets,
            institutions: Array.isArray(saved.structure?.institutions) ? saved.structure.institutions : EMPTY_SITE_PROFILE.structure.institutions,
        },
    };
}