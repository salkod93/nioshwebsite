import React from "react";
import { useLang } from "@/contexts/LanguageContext";
import type { Language } from "@/lib/content";

const BANNER_LABELS: Record<Language, string> = {
  ar: "اطلاق تجريبي",
  en: "Soft Launch",
};

export function PersistentLaunchBanner({ langOverride }: { langOverride?: Language }) {
  const { lang: contextLang } = useLang();
  const lang = langOverride ?? contextLang;
  const bannerText = BANNER_LABELS[lang];
  const repeatedLabels = Array.from({ length: 4 }, () => bannerText);

  return (
    <aside
      className="launch-banner fixed inset-x-0 bottom-0 z-[100] h-10 overflow-hidden border-t border-[#172a45]/20 bg-[#d4af37] text-[#172a45] shadow-[0_-4px_18px_rgba(23,42,69,0.16)] sm:h-11"
      aria-live="polite"
      aria-label={bannerText}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <span className="sr-only">{bannerText}</span>
      <div className="launch-banner-track flex h-full w-max items-center whitespace-nowrap font-semibold tracking-[0.12em]" aria-hidden="true">
        <span className="launch-banner-group flex shrink-0 items-center gap-14 pr-14 text-sm sm:gap-28 sm:pr-28 sm:text-base" dir={lang === "ar" ? "rtl" : "ltr"}>
          {repeatedLabels.map((label, index) => (
            <span key={`first-${index}`}>{label}</span>
          ))}
        </span>
        <span className="launch-banner-group flex shrink-0 items-center gap-14 pr-14 text-sm sm:gap-28 sm:pr-28 sm:text-base" dir={lang === "ar" ? "rtl" : "ltr"}>
          {repeatedLabels.map((label, index) => (
            <span key={`second-${index}`}>{label}</span>
          ))}
        </span>
      </div>
    </aside>
  );
}
