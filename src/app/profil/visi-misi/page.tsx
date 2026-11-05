"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Handshake, Hammer, Network, Sprout, Moon, type LucideIcon } from "lucide-react";
import PageShell from "../../components/PageShell";
import { PAGE_HERO_IMAGES } from "../../components/shared";
import { getPublishedCmsContent } from "../../public-cms";
import { EMPTY_SITE_PROFILE, mergeSiteProfile } from "@/lib/site-profile";

const missionIconMap: Record<string, LucideIcon> = {
  account_tree: Network,
  favorite: Handshake,
  heart_handshake: Handshake,
  school: GraduationCap,
  nights_stay: Moon,
  nightlight: Moon,
  engineering: Hammer,
  forest: Sprout,
  agriculture: Sprout,
  handshake: Handshake,
};

const fallbackMissionIcons: LucideIcon[] = [Network, Handshake, GraduationCap, Moon, Hammer, Sprout];

export default function VisiMisiPage() {
  const [vision, setVision] = useState(EMPTY_SITE_PROFILE.vision);

  useEffect(() => {
    getPublishedCmsContent().then((content) => {
      if (content) setVision(mergeSiteProfile(content.profile).vision);
    });
  }, []);

  return (
    <PageShell>
      {/* Hero Banner */}
      <section className="relative w-full py-16 md:py-20 bg-[#E5F8ED] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${PAGE_HERO_IMAGES.visiMisi}')` }} />
        </div>
        <div className="w-full px-5 lg:px-12 xl:px-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcefe5] mb-4">
            <span className="material-symbols-outlined text-[#064e3b] text-sm">visibility</span>
            <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
              Profil Desa • Haluan Pembangunan
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            {vision.title}
          </h1>
          <p className="text-base text-gray-700 mt-3 max-w-2xl leading-relaxed">
            {vision.intro}
          </p>
        </div>
      </section>

      {/* Visi Section */}
      <section className="w-full py-16 bg-white">
        <div className="w-full px-5 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#064e3b] text-white mb-6 shadow-sm">
              <span className="material-symbols-outlined text-base">star</span>
              <span className="text-xs font-bold uppercase tracking-wider">Visi Desa Mendongan {vision.period}</span>
            </div>
            <blockquote
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              &ldquo;{vision.statement}&rdquo;
            </blockquote>
            <p className="text-sm text-gray-600 mt-6 max-w-xl mx-auto leading-relaxed">
              {vision.supportingText}
            </p>
          </div>

          {/* 6 Pilar Misi */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5F8ED] mb-3">
              <span className="material-symbols-outlined text-[#064e3b] text-sm">flag</span>
              <span className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
                {vision.missionLabel}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#064e3b]"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {vision.missionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {vision.missions.map((m, index) => {
              const MissionIcon = missionIconMap[m.icon.toLowerCase()] ?? fallbackMissionIcons[index % fallbackMissionIcons.length];
              return <div
                key={m.id}
                className="group p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-[#E5F8ED]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E5F8ED] text-[#064e3b] flex items-center justify-center shrink-0 group-hover:bg-[#064e3b] group-hover:text-white transition-colors shadow-2xs">
                      <MissionIcon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                    </div>
                    <span
                      className="text-3xl font-black text-emerald-200 group-hover:text-[#064e3b] transition-colors"
                      style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#064e3b] uppercase tracking-wider block mb-1">
                    {m.badge}
                  </span>

                  <h3
                    className="text-lg font-bold text-gray-900 group-hover:text-[#064e3b] transition-colors mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    {m.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">{m.description}</p>
                </div>
              </div>;
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
