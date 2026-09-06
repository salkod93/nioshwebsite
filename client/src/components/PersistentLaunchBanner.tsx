import React from "react";

const BANNER_TEXT = "اطلاق تجريبي";
const REPEATED_LABELS = Array.from({ length: 12 }, (_, index) => `${BANNER_TEXT} —`);

export function PersistentLaunchBanner() {
  return (
    <aside
      className="launch-banner fixed inset-x-0 bottom-0 z-[100] h-10 overflow-hidden border-t border-[#172a45]/20 bg-[#d4af37] text-[#172a45] shadow-[0_-4px_18px_rgba(23,42,69,0.16)] sm:h-11"
      aria-live="polite"
      aria-label={BANNER_TEXT}
      dir="ltr"
    >
      <span className="sr-only">{BANNER_TEXT}</span>
      <div className="launch-banner-track flex h-full w-max items-center whitespace-nowrap font-semibold tracking-[0.12em]" aria-hidden="true">
        <span className="launch-banner-group flex shrink-0 items-center gap-5 pr-5 text-sm sm:gap-7 sm:pr-7 sm:text-base" dir="rtl">
          {REPEATED_LABELS.map((label, index) => (
            <span key={`first-${index}`}>{label}</span>
          ))}
        </span>
        <span className="launch-banner-group flex shrink-0 items-center gap-5 pr-5 text-sm sm:gap-7 sm:pr-7 sm:text-base" dir="rtl">
          {REPEATED_LABELS.map((label, index) => (
            <span key={`second-${index}`}>{label}</span>
          ))}
        </span>
      </div>
    </aside>
  );
}
