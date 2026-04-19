import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import PageMeta from "@/components/PageMeta";
import { ImageCarousel } from "@/components/ImageCarousel";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import { vcoshAppSchema, vcoshPageSchema } from "@/lib/jsonLdSchemas";

// ─── Asset URLs (all from the original vcosh-landingpage.manus.space CDN) ───
const VCOSH_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/vcosh_logo_transparent_4a6acfd5.png";
const NIOSH_LOGO_AR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/logo-ar(1)_4b7d030f.png";
const NCOSH_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/logo-arabic-1_cbe1630f.webp";
const NCSP_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/NCSPLOGO-cropped_47ccb151.png";

// Hero app screenshots (correct ones from original page)
const HERO_SCREEN_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at11.22.38PM_0639cebd.png";
const HERO_SCREEN_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/WhatsAppImage2026-04-06at21.43.49(1)_dda8c94b.webp";
const HERO_SCREEN_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at10.55.54PM_68b08f21.png";

// Features section screenshots (one per pillar)
const FEAT_REALAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at11.43.52PM_a290dcc4.png";
const FEAT_LIBRARY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at11.06.03PM_66d92f70.png";
const FEAT_ACTIVITY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/WhatsAppImage2026-04-06at21.43.51_60a11338.webp";
const FEAT_COMMUNITY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at11.35.05PM_5b9a79b9.png";
const FEAT_CONNECT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at10.55.54PM_68b08f21.png";
const FEAT_REWARDS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at10.56.56PM_c5737e33.png";
const FEAT_AI = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/WhatsAppImage2026-04-06at21.43.49_26ab0e58.webp";

// 9 Languages section - wide screenshot
const LANGUAGES_SCREENSHOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at10.54.18PM_e49aea86.png";

// Rewards Ecosystem section - 4 phones
const REWARDS_SCREEN_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at10.56.56PM_c5737e33.png";
const REWARDS_SCREEN_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at8.15.38PM_a8183ee5.png";
const REWARDS_SCREEN_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at8.15.14PM_63a4ba1f.png";
const REWARDS_SCREEN_4 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at8.15.23PM_61cb47c0.png";

// App store links
const BOOKING_URL = "https://calendar.app.google/BMXEVoHiriKVdqxY6";
const APP_STORE_URL = "https://apps.apple.com/sa/app/vcosh/id6754536603";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=occupational.health";

// ─── Bilingual content ────────────────────────────────────────────────────────
type Lang = "en" | "ar";

const t = {
  en: {
    dir: "ltr" as const,
    nav: {
      whatIs: "What Is VCOSH",
      howItWorks: "How It Works",
      features: "Features",
      whyVcosh: "Why VCOSH",
      cta: "Book a Strategic Call →",
      langBtn: "عربي",
    },
    hero: {
      badge: "VCOSH",
      badgeSub: "Virtual Center of Occupational Safety and Health",
      headline1: "Your Workforce",
      headline2: "Is Your Most",
      headline3: "Expensive Asset.",
      headline4: "Are You Protecting It?",
      body: "Saudi enterprises lose billions annually to preventable absenteeism, disengaged workers, and health risks that go undetected — because there has never been a center built for the Saudi workforce. Until now.",
      cta1: "Book a Strategic Call →",
      cta2: "See How It Works ↓",
      appStore: "Download on the",
      appStoreName: "App Store",
      googlePlay: "Get it on",
      googlePlayName: "Google Play",
    },
    whatIs: {
      tag: "THE CENTER",
      title: "What Exactly Is VCOSH?",
      body: "VCOSH is Saudi Arabia's first occupational health and workforce wellness center — built under NIOSH and approved by the National Council for Occupational Safety and Health (NCOSH). It is not a generic wellness app. It is a clinically-grounded, government-endorsed system designed for the Saudi enterprise workforce.",
      cards: [
        { emoji: "🏢", title: "For HR & Leadership", desc: "A command center that gives you real-time visibility into workforce health, engagement levels, and absenteeism risk — so you can act before problems become costs." },
        { emoji: "👷", title: "For Your Employees", desc: "A mobile app available in 9 languages that helps every worker — from the C-suite to the construction site — track health, earn rewards, and access professional support." },
        { emoji: "__NCOSH__", title: "Built for Saudi Arabia", desc: "Developed under NIOSH standards and approved by NCOSH — not a foreign center adapted for the Kingdom. Fully compliant, culturally relevant, Vision 2030 aligned." },
      ],
    },
    business: {
      tag: "THE BUSINESS CASE",
      title: "3 Problems Every Saudi Enterprise Faces Today",
      problems: [
        { num: "01", emoji: "📉", title: "Absenteeism Is Costing You More Than You Think", desc: "Unplanned absences, chronic health issues, and burnout silently drain productivity. Global enterprises using workforce wellness virtual centers report up to 28% reduction in absenteeism. Saudi enterprises deserve the same tool." },
        { num: "02", emoji: "🌍", title: "Your Workforce Speaks 9 Languages — Your Health Center Speaks 1", desc: "40%+ of Saudi enterprise workforces are non-Arabic speakers. When health content, safety protocols, and wellness guidance aren't in their language, they disengage — and risk goes unmanaged." },
        { num: "03", emoji: "📊", title: "You Can't Measure What You Can't See", desc: "Most HR teams have no dashboard for workforce health. No data on participation, no early warning on health risks, no way to show the board the ROI of their people investment." },
      ],
      stats: [
        { value: "9.7%", label: "Of Saudi GDP projected lost to ill-health & absenteeism by 2030", source: "US Chamber of Commerce" },
        { value: "72%", label: "Of Saudi employees are not fully engaged at work", source: "Gallup KSA Report, 2024" },
        { value: "28%", label: "Reduction in absenteeism with workforce wellness virtual centers", source: "Global Wellness Institute" },
        { value: "SAR 884M", label: "KSA corporate wellness market — growing 6.3% annually", source: "IMARC Group, 2025" },
      ],
    },
    howItWorks: {
      tag: "THE PROCESS",
      title: "How It Works",
      subtitle: "From deployment to measurable results in 3 steps.",
      steps: [
        { num: "1", title: "Deploy in Days", desc: "VCOSH is deployed across your organization within days — no complex IT integration. Employees download the app in their language and onboard themselves." },
        { num: "2", title: "Employees Engage Daily", desc: "Workers complete health assessments, earn points through wellness activities, redeem rewards at 100+ brands, and access professional health consultations — all from their phone." },
        { num: "3", title: "You Measure the Impact", desc: "Your HR dashboard tracks participation rates, health trends, absenteeism patterns, and engagement scores — giving you the data to make informed workforce decisions." },
      ],
    },
    features: {
      tag: "THE CENTER",
      title: "What's Inside VCOSH",
      subtitle: "Eight pillars that cover every dimension of workforce health and engagement.",
      pillars: [
        { emoji: "🧬", tag: "PILLAR #1", title: "RealAge Test", desc: "Employees discover their biological age versus chronological age through a science-backed assessment. A powerful engagement hook that drives immediate personal investment in health — and gives HR a baseline workforce health score.", img: FEAT_REALAGE },
        { emoji: "📚", tag: "", title: "Library of Digital Therapeutics", desc: "A comprehensive content library spanning Occupational Safety, Mental Health, and Overall Wellbeing — structured as interactive programs, videos, and guided modules. Evidence-based, NIOSH-aligned, and delivered in 9 languages.", img: FEAT_LIBRARY },
        { emoji: "🏃", tag: "", title: "Activity & Wellness Tracking", desc: "Employees earn points by walking, sleeping well, and completing wellness tasks. Syncs with Apple Health and Google Fit to reward healthy behavior automatically.", img: FEAT_ACTIVITY },
        { emoji: "👥", tag: "", title: "Community & Social Engagement", desc: "Employees connect, share achievements, and motivate each other. A social layer that drives participation and builds a culture of health across your organization.", img: FEAT_COMMUNITY },
        { emoji: "🩺", tag: "", title: "Connect with Professionals", desc: "Employees can request direct consultations with occupational health professionals — not just chatbots. Schedule by urgency, get real clinical guidance.", img: FEAT_CONNECT },
        { emoji: "🎁", tag: "", title: "Rewards Marketplace", desc: "100+ brand partners across food, fashion, medical, services, and more. Employees redeem real points for real rewards — driving daily engagement that no other platform can match.", img: FEAT_REWARDS },
        { emoji: "🤖", tag: "", title: "AI Occupational Health Coach", desc: "Employees speak directly with an AI coach trained on occupational health guidelines. Get instant answers on symptoms, safety protocols, and wellness recommendations — available 24/7 in any of the 9 supported languages.", img: FEAT_AI },
        { emoji: "📊", tag: "", title: "HR & Manager Dashboards", desc: "Real-time visibility into workforce health engagement, absenteeism trends, and wellness participation rates. Give HR leaders and managers the data they need to make proactive, evidence-based decisions.", img: null },
      ],
    },
    languages: {
      tag: "MULTILINGUAL BY DESIGN",
      title: "9 Languages.\nOne Center.\nEvery Worker.",
      body: "VCOSH is available in Arabic, English, Hindi, Bengali, Tagalog, Indonesian, Sinhala, Amharic, and Urdu — covering the full linguistic diversity of the Saudi enterprise workforce. When every worker can access health content in their own language, participation rates soar and health outcomes improve.",
      langs: [
        { flag: "🇸🇦", name: "Arabic" }, { flag: "🇬🇧", name: "English" }, { flag: "🇮🇳", name: "Hindi" },
        { flag: "🇧🇩", name: "Bengali" }, { flag: "🇵🇭", name: "Filipino" }, { flag: "🇮🇩", name: "Indonesian" },
        { flag: "🇱🇰", name: "Sinhala" }, { flag: "🇪🇹", name: "Amharic" }, { flag: "🇵🇰", name: "Urdu" },
      ],
    },
    whyVcosh: {
      tag: "THE DIFFERENCE",
      title: "Why VCOSH — Not Any Other App",
      subtitle: "There are wellness apps. And then there is VCOSH.",
      reasons: [
        { emoji: "🏛️", title: "Saudi-First, Not Adapted", desc: "Built from the ground up under NIOSH and approved by NCOSH. Compliance and cultural relevance are built in — not retrofitted." },
        { emoji: "🌍", title: "9 Languages for the Real Workforce", desc: "The only occupational health center that serves Arabic, Hindi, Bengali, Tagalog, Sinhala, Amharic, and Urdu workers in their native language." },
        { emoji: "🦺", title: "Occupational Health, Not Just Wellness", desc: "Built on NIOSH occupational safety science — covering hazard reporting, RealAge testing, and clinical consultations. Not a step counter." },
        { emoji: "🎁", title: "Real Rewards, Real Engagement", desc: "100+ brand partners. Employees earn points and redeem real vouchers — not badges. This is what drives daily, sustained engagement." },
        { emoji: "📊", title: "Measurable ROI for the Board", desc: "Your HR dashboard tracks participation, health trends, and absenteeism reduction. You can show the board exactly what your wellness investment is delivering." },
        { emoji: "🩺", title: "AI + Human Professional Access", desc: "Employees connect with real occupational health professionals — not just AI chatbots. A clinical-grade tool that generic wellness apps cannot offer." },
      ],
    },
    rewards: {
      tag: "THE REWARDS ECOSYSTEM",
      title: "100+ Brand Partners.\nReal Rewards. Real Motivation.",
      subtitle: "Employees earn points through healthy behaviors and redeem them at leading brands across food, fashion, medical, services, and more.",
      endorsements: [
        { logo: NIOSH_LOGO_AR, alt: "NIOSH", title: "Developed Under NIOSH", desc: "Built in alignment with the National Institute for Occupational Safety and Health — the Kingdom's authority on workforce health standards." },
        { logo: NCOSH_LOGO, alt: "NCOSH", title: "Approved by NCOSH", desc: "Officially endorsed by the National Council for Occupational Safety and Health (NCOSH) — giving your organization full regulatory confidence in the center." },
        { logo: null, emoji: "🌐", title: "Proven Global Model", desc: "Enterprise wellness virtual centers globally have demonstrated 28–36% reductions in absenteeism and 6:1 ROI on workforce health investment. VCOSH brings this to Saudi Arabia." },
      ],
    },
    finalCta: {
      badge: "Limited Strategic Partnerships Available",
      title: "Ready to Transform\nYour Workforce?",
      body: "Book a direct call with our team to explore a tailored VCOSH deployment for your organization — and see exactly how it will reduce absenteeism, boost engagement, and deliver measurable ROI.",
      cta: "Book Your Strategic Call →",
    },
    footer: {
      line1: "Virtual Center of Occupational Safety & Health Services",
      line2: "© 2026 VCOSH. All rights reserved.",
    },
  },
  ar: {
    dir: "rtl" as const,
    nav: {
      whatIs: "ما هو VCOSH",
      howItWorks: "كيف يعمل",
      features: "المميزات",
      whyVcosh: "لماذا VCOSH",
      cta: "← احجز موعدك",
      langBtn: "English",
    },
    hero: {
      badge: "VCOSH",
      badgeSub: "المركز الافتراضي للسلامة والصحة المهنية",
      headline1: "موظفوك هم أساس نجاحك.",
      headline2: "استثمر في صحتهم",
      headline3: "وارتقِ بأداء منشأتك",
      headline4: "",
      body: "تواجه المنشآت في المملكة العربية السعودية خسائر سنوية كبيرة بسبب الغياب ومشكلات صحية يمكن الوقاية منها. كما يؤثر ضعف التفاعل على الأداء العام. اليوم، أصبح لديك حل متكامل يساعدك على تقليل هذه التحديات وتحسين بيئة العمل.",
      cta1: "← احجز موعدك",
      cta2: "↓ تعرّف على طريقة عمل المنصة",
      appStore: "حمّل من",
      appStoreName: "App Store",
      googlePlay: "احصل عليه من",
      googlePlayName: "Google Play",
    },
    whatIs: {
      tag: "المركز",
      title: "ما هو المركز الافتراضي لخدمات السلامة والصحة المهنية؟",
      body: "المركز الافتراضي لخدمات السلامة والصحة المهنية هو أول مركز رقمي متكامل في المملكة العربية السعودية يُعنى بالصحة المهنية ورفاهية الموظفين. تم تطويره تحت إشراف المعهد الوطني للسلامة والصحة المهنية ومعتمد من المجلس الوطني للسلامة والصحة المهنية. هذا ليس تطبيق رفاهية تقليدي، بل نظام متكامل مبني على أسس علمية ومعتمد رسميًا ومصمم لبيئة العمل في المملكة العربية السعودية.",
      cards: [
        { emoji: "🏢", title: "للموارد البشرية والقيادة", desc: "لوحة تحكم توفّر لك رؤية واضحة لصحة الموظفين ومستوى التفاعل واحتمالية الغياب، مما يساعدك على اتخاذ قرارات دقيقة في الوقت المناسب." },
        { emoji: "👷", title: "للموظفين", desc: "تطبيق متوفر بعدة لغات يمكّن الموظفين من متابعة صحتهم والمشاركة في برامج صحية والحصول على دعم من مختصين." },
        { emoji: "__NCOSH__", title: "مصمم للمملكة العربية السعودية", desc: "تم تطويره وفق معايير المعهد الوطني للسلامة والصحة المهنية، ومعتمد من المجلس الوطني للسلامة والصحة المهنية، ومصمم ليتوافق مع بيئة العمل في المملكة العربية السعودية ويواكب مستهدفات رؤية 2030." },
      ],
    },
    business: {
      tag: "الحالة التجارية",
      title: "تحديات تؤثر على أداء منشأتك في المملكة العربية السعودية",
      problems: [
        { num: "01", emoji: "📉", title: "ارتفاع الغياب وتراجع الإنتاجية", desc: "الغياب والمشكلات الصحية والإرهاق تؤدي إلى انخفاض الإنتاجية وزيادة التكاليف التشغيلية." },
        { num: "02", emoji: "🌍", title: "تنوع الموظفين واختلاف اللغات", desc: "تعتمد العديد من المنشآت في المملكة العربية السعودية على موظفين من جنسيات متعددة. وعندما لا تتوفر الإرشادات الصحية بلغاتهم، يقل التفاعل وتزداد المخاطر." },
        { num: "03", emoji: "📊", title: "عدم توفر بيانات واضحة يعيق اتخاذ القرار", desc: "غياب البيانات الدقيقة حول صحة الموظفين يجعل من الصعب تقييم الوضع واتخاذ قرارات فعالة لتحسين الأداء." },
      ],
      stats: [
        { value: "9.7%", label: "من الناتج المحلي السعودي المتوقع خسارته بسبب المرض والغياب بحلول 2030", source: "غرفة التجارة الأمريكية" },
        { value: "72%", label: "من الموظفين السعوديين غير منخرطين بالكامل في العمل", source: "تقرير غالوب للمملكة 2024" },
        { value: "28%", label: "انخفاض في الغياب مع منصات صحة القوى العاملة", source: "معهد العافية العالمي" },
        { value: "884 مليون ريال", label: "سوق العافية المؤسسية في المملكة — ينمو بنسبة 6.3% سنوياً", source: "مجموعة IMARC، 2025" },
      ],
    },
    howItWorks: {
      tag: "العملية",
      title: "كيف يعمل",
      subtitle: "من الإطلاق إلى نتائج قابلة للقياس عبر ثلاث خطوات واضحة",
      steps: [
        { num: "1", title: "الإطلاق خلال أيام", desc: "يتم إطلاق المنصة في المنشأة خلال أيام، حيث يقوم الموظفون بتحميل التطبيق بلغتهم وإتمام التسجيل بسهولة." },
        { num: "2", title: "الموظفون يتفاعلون يومياً", desc: "يتفاعل الموظفون يوميًا من خلال التقييمات الصحية والأنشطة والبرامج والحصول على مكافآت." },
        { num: "3", title: "تقيس الأثر", desc: "توفر لوحة التحكم تقارير دقيقة حول التفاعل والصحة ونسب الغياب، مما يساعد الإدارة على اتخاذ قرارات مبنية على بيانات." },
      ],
    },
    features: {
      tag: "المركز",
      title: "ماذا يقدم المركز؟",
      subtitle: "ثمانية محاور تغطي كل أبعاد صحة القوى العاملة وتفاعلها.",
      pillars: [
        { emoji: "🧬", tag: "المحور الأول", title: "اختبار العمر الحقيقي", desc: "تقييم صحي متقدم يساعد الموظف على فهم حالته الصحية مقارنة بعمره الفعلي.", img: FEAT_REALAGE },
        { emoji: "📚", tag: "", title: "مكتبة المحتوى الرقمي", desc: "مكتبة محتوى رقمية تغطي السلامة المهنية والصحة النفسية والصحة العامة.", img: FEAT_LIBRARY },
        { emoji: "🏃", tag: "", title: "تتبع النشاط والعافية", desc: "متابعة النشاط اليومي مثل الحركة والنوم لتعزيز السلوك الصحي.", img: FEAT_ACTIVITY },
        { emoji: "👥", tag: "", title: "المجتمع والتفاعل الاجتماعي", desc: "بيئة تفاعلية تشجع التواصل والمشاركة بين الموظفين.", img: FEAT_COMMUNITY },
        { emoji: "🩺", tag: "", title: "التواصل مع المختصين", desc: "إمكانية التواصل مع مختصين في الصحة المهنية.", img: FEAT_CONNECT },
        { emoji: "🎁", tag: "", title: "نظام المكافآت", desc: "نظام مكافآت يتيح استبدال النقاط بمزايا حقيقية.", img: FEAT_REWARDS },
        { emoji: "🤖", tag: "", title: "مساعد الذكاء الاصطناعي للصحة المهنية", desc: "مساعد ذكي يقدّم إرشادات صحية فورية.", img: FEAT_AI },
        { emoji: "📊", tag: "", title: "لوحات تحكم الموارد البشرية والمديرين", desc: "لوحات تحكم متقدمة توفّر رؤية شاملة للإدارة.", img: null },
      ],
    },
    languages: {
      tag: "متعدد اللغات بالتصميم",
      title: "تسع لغات في مركز واحد يخدم جميع الموظفين",
      body: "يدعم المركز العربية والإنجليزية والهندية والبنغالية والفلبينية والإندونيسية والسنهالية والأمهرية والأردية لتلبية احتياجات الموظفين في المملكة العربية السعودية.",
      langs: [
        { flag: "🇸🇦", name: "العربية" }, { flag: "🇬🇧", name: "الإنجليزية" }, { flag: "🇮🇳", name: "الهندية" },
        { flag: "🇧🇩", name: "البنغالية" }, { flag: "🇵🇭", name: "الفلبينية" }, { flag: "🇮🇩", name: "الإندونيسية" },
        { flag: "🇱🇰", name: "السنهالية" }, { flag: "🇪🇹", name: "الأمهرية" }, { flag: "🇵🇰", name: "الأردية" },
      ],
    },
    whyVcosh: {
      tag: "الفارق",
      title: "لماذا المركز الافتراضي لخدمات السلامة والصحة المهنية",
      subtitle: "تقدم المنصة مفهوماً مختلفاً يركز على الصحة المهنية بشكل عملي.",
      reasons: [
        { emoji: "🏛️", title: "مصمم خصيصًا لبيئة العمل في المملكة العربية السعودية", desc: "تم تطويره وفق معايير المعهد الوطني للسلامة والصحة المهنية، ومعتمد من المجلس الوطني للسلامة والصحة المهنية، مع مراعاة متطلبات الامتثال وبيئة العمل." },
        { emoji: "🦺", title: "يركز على الصحة المهنية بشكل متكامل وليس فقط على الرفاهية", desc: "يغطي جوانب الصحة المهنية بشكل شامل، بما في ذلك الإبلاغ عن المخاطر والفحوصات الصحية والاستشارات المتخصصة." },
        { emoji: "🎁", title: "مكافآت حقيقية تعزز التفاعل", desc: "يضم أكثر من ١٠٠ شريك من العلامات التجارية، حيث يكسب الموظفون نقاطاً يمكن استبدالها بقسائم حقيقية، مما يعزز التفاعل بشكل مستمر." },
        { emoji: "📊", title: "يوفّر نتائج قابلة للقياس تدعم قرارات الإدارة", desc: "تعرض لوحة التحكم معدلات المشاركة والاتجاهات الصحية وانخفاض الغياب، مما يساعد في متابعة أثر الاستثمار بشكل واضح." },
        { emoji: "🩺", title: "يجمع بين التقنية الحديثة ودعم المختصين", desc: "يتيح للموظفين التواصل مع مختصي الصحة المهنية والاستفادة من أدوات ذكية تدعم المتابعة والتوجيه." },
      ],
    },
    rewards: {
      tag: "نظام المكافآت",
      title: "أكثر من ١٠٠ شريك يقدمون مكافآت حقيقية تعزز التحفيز",
      titleLine2: "",
      subtitle: "يكسب الموظفون نقاطاً من خلال السلوكيات الصحية، ويمكنهم استبدالها لدى علامات تجارية في مجالات مختلفة.",
      endorsements: [
        { logo: NIOSH_LOGO_AR, alt: "NIOSH", title: "مطوَّر تحت إشراف المعهد الوطني", desc: "تم تطويره بما يتوافق مع المعهد الوطني للسلامة والصحة المهنية، الجهة المرجعية في المملكة لمعايير الصحة والسلامة المهنية." },
        { logo: NCOSH_LOGO, alt: "NCOSH", title: "معتمد من المجلس الوطني (NCOSH)", desc: "معتمد رسمياً من المجلس الوطني للسلامة والصحة المهنية، مما يمنح منشأتك ثقة تنظيمية كاملة." },
        { logo: null, emoji: "🌐", title: "نموذج عالمي مثبت", desc: "تُظهر التجارب العالمية أن تطبيق برامج الصحة المهنية في الشركات يساعد في تقليل الغياب وتحقيق عائد واضح على الاستثمار، ويتم تقديم هذا النموذج بما يتناسب مع بيئة العمل في المملكة العربية السعودية." },
      ],
    },
    finalCta: {
      badge: "شراكات استراتيجية محدودة متاحة",
      title: "ابدأ اليوم في رفع كفاءة موظفيك",
      body: "احجز موعدك مع فريقنا لمعرفة كيف يمكن تطبيق المنصة في منشأتك، وما الأثر الذي ستحققه في تقليل الغياب، وزيادة التفاعل، وتحسين الأداء بشكل ملموس.",
      cta: "← احجز موعدك",
    },
    footer: {
      line1: "المركز الافتراضي لخدمات السلامة والصحة المهنية",
      line2: "© 2026 VCOSH. جميع الحقوق محفوظة.",
    },
  },
};

// ─── App Store Badges ─────────────────────────────────────────────────────────
function AppStoreBadges({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <div className="flex gap-3 flex-wrap">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
      >
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div>
          <div className="text-xs text-gray-400 leading-none">{c.hero.appStore}</div>
          <div className="text-sm font-semibold leading-tight">{c.hero.appStoreName}</div>
        </div>
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
      >
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.18 23.76c.3.17.65.19.98.08l12.49-7.17-2.83-2.83-10.64 9.92zM.54 1.52C.2 1.86 0 2.4 0 3.1v17.8c0 .7.2 1.24.54 1.58l.08.08 9.96-9.96v-.24L.62 1.44l-.08.08zM20.15 10.3l-2.83-1.63-3.17 3.17 3.17 3.17 2.86-1.65c.82-.47.82-1.24-.03-1.06zM3.18.24L15.67 7.4l-2.83 2.83L2.2.31c.33-.11.68-.09.98.08v-.15z" />
        </svg>
        <div>
          <div className="text-xs text-gray-400 leading-none">{c.hero.googlePlay}</div>
          <div className="text-sm font-semibold leading-tight">{c.hero.googlePlayName}</div>
        </div>
      </a>
    </div>
  );
}

// ─── Smooth-scroll helper ────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const c = t[lang];
  const isRTL = lang === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      dir={c.dir}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logos — always on the left in LTR, right in RTL */}
        <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <Link href="/">
            <img src={NIOSH_LOGO_AR} alt="NIOSH" className="h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>
          <div className="w-px h-8 bg-gray-200" />
          <img src={VCOSH_LOGO} alt="VCOSH" className="h-[60px] object-contain" />
        </div>

        {/* Center: nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: c.nav.whatIs, id: "what-is-vcosh" },
            { label: c.nav.howItWorks, id: "how-it-works" },
            { label: c.nav.features, id: "features" },
            { label: c.nav.whyVcosh, id: "why-vcosh" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
              style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: CTA + lang toggle */}
        <div className={`hidden md:flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {c.nav.langBtn}
          </button>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #1a7a5e 0%, #2da882 100%)",
              fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit",
            }}
          >
            {c.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ lang }: { lang: Lang }) {
  const c = t[lang];
  const isRTL = lang === "ar";

  return (
    <section
      dir={c.dir}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c42 40%, #1e6b4a 70%, #0f4a35 100%)" }}
    >
      {/* Riyadh skyline background — faint, same treatment as main homepage */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/riyadh-night-skyline_ae5307a2.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.12,
        }}
      />
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text side */}
        <div className={isRTL ? "text-right" : "text-left"}>
          {/* Badge */}
          <div className={`inline-flex flex-col mb-8 px-5 py-3 rounded-2xl border border-emerald-400/30 bg-emerald-900/30 backdrop-blur-sm items-center`}>
            <span
              className="font-extrabold text-white"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.12em", fontSize: "42px", textAlign: 'center' }}
            >
              {c.hero.badge}
            </span>
            <span
              className="text-xs font-medium text-emerald-300 mt-0.5"
              style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}
            >
              {(c.hero as any).badgeSub}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}
          >
            <span className="text-white">{c.hero.headline1}<br />{c.hero.headline2}<br /></span>
            <span style={{ color: "#f5a623" }}>{c.hero.headline3}</span>
            <br />
            <span className="text-white text-4xl lg:text-5xl">{c.hero.headline4}</span>
          </h1>

          <p
            className="text-lg text-emerald-100/80 mb-10 max-w-lg leading-relaxed"
            style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}
          >
            {c.hero.body}
          </p>

          {/* CTAs */}
          <div className={`flex flex-wrap gap-4 mb-8 ${isRTL ? "justify-end" : ""}`}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #1a7a5e 0%, #2da882 100%)",
                fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit",
              }}
            >
              {c.hero.cta1}
            </a>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/30 text-white hover:bg-white/10 transition-all"
              style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}
            >
              {c.hero.cta2}
            </button>
          </div>

          {/* App store badges */}
          <div className={isRTL ? "flex justify-end" : ""}>
            <AppStoreBadges lang={lang} />
          </div>
        </div>

        {/* Right: Rotating carousel of 3 phone screenshots */}
        <div className="mb-12">
          <ImageCarousel
            images={[HERO_SCREEN_1, HERO_SCREEN_2, HERO_SCREEN_3]}
            altText="VCOSH App"
            autoplayInterval={5000}
            imageWidth="clamp(150px, 35vw, 280px)"
            fixedHeight="h-[500px] lg:h-[600px]"
            showDots={true}
          />
        </div>
      </div>
    </section>
  );
}

// ─── What Is VCOSH ────────────────────────────────────────────────────────────
function WhatIsVcosh({ lang }: { lang: Lang }) {
  const c = t[lang].whatIs;
  const isRTL = lang === "ar";
  const bgColors = [
    { bg: "#f0faf5", border: "#c6ead8" },
    { bg: "#fffbf0", border: "#fde8a0" },
    { bg: "#f0f7ff", border: "#c0d8f5" },
  ];

  return (
    <section id="what-is-vcosh" dir={isRTL ? "rtl" : "ltr"} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
            {c.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
            {lang === "en" ? (
              <>VCOSH is Saudi Arabia's first{" "}<strong>occupational health and workforce wellness Virtual Center</strong> — built under NIOSH and approved by the National Council for Occupational Safety and Health. It is not a generic wellness app. It is a clinically-grounded, government-endorsed system designed for the Saudi enterprise workforce.</>
            ) : c.body}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {c.cards.map((card, i) => (
            <div key={card.title} className="rounded-2xl p-8" style={{ background: bgColors[i].bg, border: `1px solid ${bgColors[i].border}` }}>
              <div className="mb-4">
                {card.emoji === "__NCOSH__" ? (
                  <img src={NCOSH_LOGO} alt="NCOSH" className="h-[60px] object-contain" />
                ) : (
                  <span className="text-4xl">{card.emoji}</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{card.title}</h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Business Case / Stats ────────────────────────────────────────────────────
function BusinessCase({ lang }: { lang: Lang }) {
  const c = t[lang].business;
  const isRTL = lang === "ar";

  return (
    <section dir={isRTL ? "rtl" : "ltr"} style={{ background: "#0d1f2d" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
            {c.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {c.problems.map((p) => (
            <div key={p.num} className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{p.title}</h3>
              <p className="text-gray-400 leading-relaxed" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {c.stats.map((s) => (
            <div key={s.value} className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: "#2da882" }}>{s.value}</div>
              <p className="text-sm text-gray-300 mb-2 leading-snug" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{s.label}</p>
              <p className="text-xs text-gray-500">{s.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks({ lang }: { lang: Lang }) {
  const c = t[lang].howItWorks;
  const isRTL = lang === "ar";

  return (
    <section id="how-it-works" dir={isRTL ? "rtl" : "ltr"} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{c.title}</h2>
          <p className="text-lg text-gray-500" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{c.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {c.steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < c.steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-200 z-0" style={{ width: "calc(100% - 2rem)" }} />
              )}
              <div className="relative z-10 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-6" style={{ background: "linear-gradient(135deg, #1a7a5e 0%, #2da882 100%)" }}>
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{step.title}</h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features / What's Inside ─────────────────────────────────────────────────
function Features({ lang }: { lang: Lang }) {
  const c = t[lang].features;
  const isRTL = lang === "ar";

  return (
    <section id="features" dir={isRTL ? "rtl" : "ltr"} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{c.title}</h2>
          <p className="text-lg text-gray-500" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{c.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {c.pillars.map((p) => (
            <div
              key={p.title}
              className={`rounded-2xl p-6 hover:shadow-md transition-shadow flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              style={{ background: "#f8fafb", border: "1px solid #e8edf0" }}
            >
              {/* Phone screenshot thumbnail */}
              {p.img && (
                <div className="flex-shrink-0 w-16 h-28 rounded-xl overflow-hidden border border-gray-200">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className={`flex-1 ${!p.img ? "pl-0" : ""}`}>
                <div className="text-3xl mb-2">{p.emoji}</div>
                {p.tag && (
                  <span className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-full mb-2 inline-block" style={{ background: "#e8f5ef", color: "#1a7a5e", fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit", backgroundColor: '#f8f9fa' }}>
                    {p.tag}
                  </span>
                )}
                <h3 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 9 Languages ──────────────────────────────────────────────────────────────
function Languages({ lang }: { lang: Lang }) {
  const c = t[lang].languages;
  const isRTL = lang === "ar";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="py-24"
      style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c42 50%, #0f4a35 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 whitespace-pre-line" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
            {c.title}
          </h2>
          <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
            {c.body}
          </p>
        </div>

        {/* Language pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {c.langs.map((l) => (
            <div key={l.name} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </div>
          ))}
        </div>

        {/* Wide screenshot */}
        <div className="flex justify-center mb-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-w-2xl w-full">
            <img src={LANGUAGES_SCREENSHOT} alt="VCOSH 9 Languages" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why VCOSH ────────────────────────────────────────────────────────────────
function WhyVcosh({ lang }: { lang: Lang }) {
  const c = t[lang].whyVcosh;
  const isRTL = lang === "ar";

  return (
    <section id="why-vcosh" dir={isRTL ? "rtl" : "ltr"} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{c.title}</h2>
          <p className="text-lg text-gray-500" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{c.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.reasons.map((r) => (
            <div key={r.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{r.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{r.title}</h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Rewards Ecosystem ────────────────────────────────────────────────────────
function RewardsEcosystem({ lang }: { lang: Lang }) {
  const c = t[lang].rewards;
  const isRTL = lang === "ar";
  const bgColors = [
    { bg: "#f0faf5", border: "#c6ead8" },
    { bg: "#fffbf0", border: "#fde8a0" },
    { bg: "#f0f7ff", border: "#c0d8f5" },
  ];

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 whitespace-pre-line" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
            {c.title}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
            {c.subtitle}
          </p>
        </div>

        {/* Infinite scrolling carousel of 4 phone screenshots */}
        <div className="mb-16">
          <InfiniteScroll
            images={[REWARDS_SCREEN_1, REWARDS_SCREEN_2, REWARDS_SCREEN_3, REWARDS_SCREEN_4]}
            altText="VCOSH Rewards"
            speed={25}
            imageWidth="w-36 h-72"
            gap="gap-4"
          />
        </div>

        {/* Endorsement cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {c.endorsements.map((e, i) => (
            <div key={e.title} className="rounded-2xl p-8 text-center" style={{ background: bgColors[i].bg, border: `1px solid ${bgColors[i].border}` }}>
              {e.logo ? (
                <img src={e.logo} alt={e.alt} className="h-14 mx-auto mb-4 object-contain" />
              ) : (
                <div className="text-5xl mb-4">{(e as any).emoji}</div>
              )}
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{e.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA({ lang }: { lang: Lang }) {
  const c = t[lang].finalCta;
  const isRTL = lang === "ar";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="py-24"
      style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c42 50%, #0f4a35 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 whitespace-pre-line" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
          {c.title}
        </h2>
        <p className="text-lg text-emerald-100/80 mb-10 leading-relaxed" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>
          {c.body}
        </p>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-lg transition-all hover:opacity-90 hover:scale-105 mb-8"
          style={{ background: "linear-gradient(135deg, #c8860a 0%, #f5a623 100%)", fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}
        >
          {c.cta}
        </a>

        <div className="flex justify-center">
          <AppStoreBadges lang={lang} />
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ lang }: { lang: Lang }) {
  const c = t[lang].footer;
  const isRTL = lang === "ar";

  return (
    <footer dir={isRTL ? "rtl" : "ltr"} className="py-8 bg-gray-900 text-center">
      <div className="flex justify-center items-center gap-6 mb-4">
        <Link href="/">
          <img src={NIOSH_LOGO_AR} alt="NIOSH" className="h-12 object-contain cursor-pointer hover:opacity-80 transition-opacity bg-white rounded-lg px-2 py-1" />
        </Link>
        <img src={NCSP_LOGO} alt="NCSP - National Center for Strategic Partnerships" className="h-12 object-contain bg-white rounded-lg px-2 py-1 hover:opacity-80 transition-opacity" />
      </div>
      <p className="text-sm text-gray-500" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{c.line1}</p>
      <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "inherit" }}>{c.line2}</p>
    </footer>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function VcoshLanding() {
  const { lang: siteLang } = useLang();
  // Initialise from the main site's language; map "ar" → "ar", anything else → "en"
  const [lang, setLang] = useState<Lang>(() => siteLang === "ar" ? "ar" : "en");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);;

  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <JsonLd data={[vcoshAppSchema, vcoshPageSchema]} />
      <PageMeta
        title={lang === 'ar' ? 'VCOSH – مركز خدمات السلامة والصحة المهنية الافتراضي' : 'VCOSH – Virtual Center for Occupational Safety and Health'}
        description={lang === 'ar' ? 'VCOSH – منصة رقمية متكاملة لخدمات السلامة والصحة المهنية — تمكّن منشآتك من تقليل الغياب، ورفع التفاعل، وتحسين بيئة العمل في المملكة العربية السعودية.' : 'VCOSH is a comprehensive digital platform for occupational safety and health services — helping Saudi organizations reduce absenteeism, boost engagement, and improve workplace wellbeing.'}
        url="/vcosh"
      />
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <WhatIsVcosh lang={lang} />
      <BusinessCase lang={lang} />
      <HowItWorks lang={lang} />
      <Features lang={lang} />
      <Languages lang={lang} />
      <WhyVcosh lang={lang} />
      <RewardsEcosystem lang={lang} />
      <FinalCTA lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
