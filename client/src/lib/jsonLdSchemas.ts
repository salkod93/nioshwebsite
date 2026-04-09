const SITE_URL = "https://niosh.sa";
const NIOSH_LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/logo-ar(1)_4b7d030f.png";
const VCOSH_LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/vcosh_logo_transparent_4a6acfd5.png";

// ─── Organization + GovernmentOrganization (Homepage) ─────────────────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "المعهد الوطني للسلامة والصحة المهنية - NIOSH",
  alternateName: "National Institute of Occupational Safety and Health",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: NIOSH_LOGO_URL,
    width: 2048,
    height: 485,
  },
  description:
    "NIOSH is Saudi Arabia's national institute for occupational safety and health — offering training, consultancy, accreditation, and OSH certification services.",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+966500407755",
      contactType: "customer service",
      email: "info@niosh.sa",
      availableLanguage: ["Arabic", "English"],
    },
  ],
  sameAs: [],
  parentOrganization: {
    "@type": "GovernmentOrganization",
    name: "المجلس الوطني للسلامة والصحة المهنية - NCOSH",
    alternateName: "National Council for Occupational Safety and Health",
  },
};

// ─── WebSite (search engine site links & site-wide search) ────────────────────
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "NIOSH – National Institute of Occupational Safety and Health",
  alternateName: "المعهد الوطني للسلامة والصحة المهنية",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["ar", "en"],
};

// ─── WebPage – Homepage ───────────────────────────────────────────────────────
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "NIOSH – Occupational Safety & Health",
  description:
    "NIOSH is Saudi Arabia's national institute for occupational safety and health — offering training, consultancy, accreditation, and OSH certification services.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["ar", "en"],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// ─── WebPage – Board of Directors ─────────────────────────────────────────────
export const boardOfDirectorsPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/board-of-directors#webpage`,
  url: `${SITE_URL}/board-of-directors`,
  name: "Board of Directors – NIOSH",
  alternateName: "مجلس الإدارة – المعهد الوطني للسلامة والصحة المهنية",
  description:
    "Meet the Board of Directors of the National Institute of Occupational Safety and Health (NIOSH) in Saudi Arabia.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  inLanguage: ["ar", "en"],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// ─── WebPage – Kawader Accreditation ──────────────────────────────────────────
export const kawaderPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/kawader#webpage`,
  url: `${SITE_URL}/kawader`,
  name: "Kawader – OSH Professional Accreditation",
  alternateName: "كوادر – اعتماد ممارسي السلامة والصحة المهنية",
  description:
    "Apply for Kawader accreditation as an OSH Practitioner or Professional through the National Institute of Occupational Safety and Health (NIOSH).",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  inLanguage: ["ar", "en"],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// ─── SoftwareApplication – VCOSH ──────────────────────────────────────────────
export const vcoshAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/vcosh#app`,
  name: "VCOSH – Virtual Center of Occupational Safety and Health",
  alternateName: "المركز الافتراضي لخدمات السلامة والصحة المهنية",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS, Android",
  description:
    "VCOSH is the world's first AI-powered occupational health virtual center — built for Saudi Arabia's workforce. It delivers 8 pillars of occupational health services in 9 languages.",
  url: `${SITE_URL}/vcosh`,
  image: VCOSH_LOGO_URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "SAR",
    availability: "https://schema.org/InStock",
  },
  installUrl: [
    "https://apps.apple.com/sa/app/vcosh/id6754536603",
    "https://play.google.com/store/apps/details?id=occupational.health",
  ],
  creator: { "@id": `${SITE_URL}/#organization` },
  inLanguage: [
    "ar", "en", "ur", "hi", "bn", "tl", "id", "ne", "si",
  ],
};

// ─── WebPage – VCOSH Landing ──────────────────────────────────────────────────
export const vcoshPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/vcosh#webpage`,
  url: `${SITE_URL}/vcosh`,
  name: "VCOSH – Virtual Center of Occupational Safety and Health",
  alternateName: "المركز الافتراضي للسلامة والصحة المهنية",
  description:
    "Explore VCOSH — the AI-powered virtual center for occupational safety and health services, built for Saudi Arabia's workforce.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  inLanguage: ["ar", "en"],
  publisher: { "@id": `${SITE_URL}/#organization` },
  about: { "@id": `${SITE_URL}/vcosh#app` },
};
