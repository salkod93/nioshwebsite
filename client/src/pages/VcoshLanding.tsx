import { useEffect, useRef, useState } from "react";

// ─── Asset URLs (all from the original vcosh-landingpage.manus.space CDN) ───
const VCOSH_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/vcosh_logo_transparent_4a6acfd5.png";
const NIOSH_LOGO_AR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/logo-ar(1)_4b7d030f.png";
const NCOSH_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/logo-arabic-1_cbe1630f.webp";

// Hero app screenshots
const HERO_SCREEN_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at8.15.14PM_63a4ba1f.png";
const HERO_SCREEN_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at8.15.23PM_61cb47c0.png";
const HERO_SCREEN_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at8.15.38PM_a8183ee5.png";

// Rewards section screenshots
const REWARDS_SCREEN_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at10.54.18PM_e49aea86.png";
const REWARDS_SCREEN_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at10.55.54PM_68b08f21.png";
const REWARDS_SCREEN_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at10.56.56PM_c5737e33.png";
const REWARDS_SCREEN_4 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at11.06.03PM_66d92f70.png";

// Features screenshots
const FEATURE_SCREEN_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at11.22.38PM_0639cebd.png";
const FEATURE_SCREEN_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at11.35.05PM_5b9a79b9.png";
const FEATURE_SCREEN_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/Screenshot2026-04-06at11.43.52PM_a290dcc4.png";

// WhatsApp images (used in features/multilingual section)
const WA_IMG_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/WhatsAppImage2026-04-06at21.43.49_26ab0e58.webp";
const WA_IMG_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/WhatsAppImage2026-04-06at21.43.49(1)_dda8c94b.webp";
const WA_IMG_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393484347/HnNSxun7cEnxahzcKEUCqw/WhatsAppImage2026-04-06at21.43.51_60a11338.webp";

// Booking URL — same as "Book an Appointment" in the VCOSH page
const BOOKING_URL = "https://calendar.app.google/BMXEVoHiriKVdqxY6";

// ─── Smooth-scroll helper ────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: logos */}
        <div className="flex items-center gap-4">
          <img src={NIOSH_LOGO_AR} alt="NIOSH" className="h-10 object-contain" />
          <div className="w-px h-8 bg-gray-200" />
          <img src={NCOSH_LOGO} alt="NCOSH" className="h-10 object-contain" />
          <div className="w-px h-8 bg-gray-200" />
          <img src={VCOSH_LOGO} alt="VCOSH" className="h-10 object-contain" />
        </div>

        {/* Center: nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "What Is VCOSH", id: "what-is-vcosh" },
            { label: "How It Works", id: "how-it-works" },
            { label: "Features", id: "features" },
            { label: "Why VCOSH", id: "why-vcosh" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: CTA */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #1a7a5e 0%, #2da882 100%)" }}
        >
          Book a Strategic Call →
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c42 40%, #1e6b4a 70%, #0f4a35 100%)" }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: text */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-900/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-emerald-300 uppercase">
              Under NIOSH · Approved by NCOSH
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-white">Your Workforce<br />Is Your Most<br /></span>
            <span style={{ color: "#f5a623" }}>Expensive Asset.</span>
            <br />
            <span className="text-white text-4xl lg:text-5xl">Are You Protecting It?</span>
          </h1>

          <p className="text-lg text-emerald-100/80 mb-10 max-w-lg leading-relaxed">
            Saudi enterprises lose billions annually to preventable absenteeism, disengaged workers, and health risks that go undetected — because there has never been a platform built for the Saudi workforce. Until now.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #1a7a5e 0%, #2da882 100%)" }}
            >
              Book a Strategic Call →
            </a>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/30 text-white hover:bg-white/10 transition-all"
            >
              See How It Works ↓
            </button>
          </div>

          {/* App store badges */}
          <div className="flex gap-3">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <div className="text-xs text-gray-400 leading-none">Download on the</div>
                <div className="text-sm font-semibold leading-tight">App Store</div>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.65.19.98.08l12.49-7.17-2.83-2.83-10.64 9.92zM.54 1.52C.2 1.86 0 2.4 0 3.1v17.8c0 .7.2 1.24.54 1.58l.08.08 9.96-9.96v-.24L.62 1.44l-.08.08zM20.15 10.3l-2.83-1.63-3.17 3.17 3.17 3.17 2.86-1.65c.82-.47.82-1.24-.03-1.06zM3.18.24L15.67 7.4l-2.83 2.83L2.2.31c.33-.11.68-.09.98.08v-.15z" />
              </svg>
              <div>
                <div className="text-xs text-gray-400 leading-none">Get it on</div>
                <div className="text-sm font-semibold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right: app screenshots */}
        <div className="relative flex justify-center items-end gap-4 h-[500px]">
          <div className="relative z-10 w-36 h-72 rounded-3xl overflow-hidden shadow-2xl border border-white/20 self-end mb-8">
            <img src={HERO_SCREEN_1} alt="VCOSH App" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-20 w-44 h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <img src={HERO_SCREEN_2} alt="VCOSH App" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 w-36 h-72 rounded-3xl overflow-hidden shadow-2xl border border-white/20 self-end mb-8">
            <img src={HERO_SCREEN_3} alt="VCOSH App" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── What Is VCOSH ────────────────────────────────────────────────────────────
function WhatIsVcosh() {
  return (
    <section id="what-is-vcosh" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#f5a623" }}>
            THE PLATFORM
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What Exactly Is VCOSH?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            VCOSH is Saudi Arabia's first{" "}
            <strong>occupational health and workforce wellness platform</strong> — built under NIOSH and approved by the National Council for Occupational Safety and Health. It is not a generic wellness app. It is a clinically-grounded, government-endorsed system designed for the Saudi enterprise workforce.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: "🏢",
              title: "For HR & Leadership",
              desc: "A command center that gives you real-time visibility into workforce health, engagement levels, and absenteeism risk — so you can act before problems become costs.",
              bg: "#f0faf5",
              border: "#c6ead8",
            },
            {
              emoji: "👷",
              title: "For Your Employees",
              desc: "A mobile app available in 9 languages that helps every worker — from the C-suite to the construction site — track health, earn rewards, and access professional support.",
              bg: "#fffbf0",
              border: "#fde8a0",
            },
            {
              emoji: "🏛️",
              title: "Built for Saudi Arabia",
              desc: "Developed under NIOSH standards and approved by NCOSH — not a foreign platform adapted for the Kingdom. Fully compliant, culturally relevant, Vision 2030 aligned.",
              bg: "#f0f7ff",
              border: "#c0d8f5",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl p-8"
              style={{ background: card.bg, border: `1px solid ${card.border}` }}
            >
              <div className="text-4xl mb-4">{card.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Business Case / Stats ────────────────────────────────────────────────────
function BusinessCase() {
  const stats = [
    { value: "9.7%", label: "Of Saudi GDP projected lost to ill-health & absenteeism by 2030", source: "US Chamber of Commerce" },
    { value: "72%", label: "Of Saudi employees are not fully engaged at work", source: "Gallup KSA Report, 2024" },
    { value: "28%", label: "Reduction in absenteeism with workforce wellness platforms", source: "Global Wellness Institute" },
    { value: "SAR 884M", label: "KSA corporate wellness market — growing 6.3% annually", source: "IMARC Group, 2025" },
  ];

  const problems = [
    {
      num: "01",
      emoji: "📉",
      title: "Absenteeism Is Costing You More Than You Think",
      desc: "Unplanned absences, chronic health issues, and burnout silently drain productivity. Global enterprises using workforce wellness platforms report up to 28% reduction in absenteeism. Saudi enterprises deserve the same tool.",
    },
    {
      num: "02",
      emoji: "🌍",
      title: "Your Workforce Speaks 9 Languages — Your Health Platform Speaks 1",
      desc: "40%+ of Saudi enterprise workforces are non-Arabic speakers. When health content, safety protocols, and wellness guidance aren't in their language, they disengage — and risk goes unmanaged.",
    },
    {
      num: "03",
      emoji: "📊",
      title: "You Can't Measure What You Can't See",
      desc: "Most HR teams have no dashboard for workforce health. No data on participation, no early warning on health risks, no way to show the board the ROI of their people investment.",
    },
  ];

  return (
    <section style={{ background: "#0d1f2d" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#f5a623" }}>
            THE BUSINESS CASE
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            3 Problems Every Saudi<br />Enterprise Faces Today
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {problems.map((p) => (
            <div
              key={p.num}
              className="rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{p.emoji}</span>
                <span className="text-sm font-bold tracking-widest text-gray-400">{p.num}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: "#2da882" }}>
                {s.value}
              </div>
              <p className="text-sm text-gray-300 mb-2 leading-snug">{s.label}</p>
              <p className="text-xs text-gray-500">{s.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Deploy in Days",
      desc: "VCOSH is deployed across your organization within days — no complex IT integration. Employees download the app in their language and onboard themselves.",
    },
    {
      num: "2",
      title: "Employees Engage Daily",
      desc: "Workers complete health assessments, earn points through wellness activities, redeem rewards at 100+ brands, and access professional health consultations — all from their phone.",
    },
    {
      num: "3",
      title: "You Measure the Impact",
      desc: "Your HR dashboard tracks participation rates, health trends, absenteeism patterns, and engagement scores — giving you the data to make informed workforce decisions.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#f5a623" }}>
            THE PROCESS
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-500">From deployment to measurable results in 3 steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-200 z-0" style={{ width: "calc(100% - 2rem)" }} />
              )}
              <div className="relative z-10 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-6"
                  style={{ background: "linear-gradient(135deg, #1a7a5e 0%, #2da882 100%)" }}
                >
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features / What's Inside ─────────────────────────────────────────────────
function Features() {
  const pillars = [
    { emoji: "🧬", tag: "PILLAR #1", title: "RealAge Test", desc: "Employees discover their biological age versus chronological age through a science-backed assessment. A powerful engagement hook that drives immediate personal investment in health — and gives HR a baseline workforce health score." },
    { emoji: "📚", tag: "", title: "Library of Digital Therapeutics", desc: "A comprehensive content library spanning Occupational Safety, Mental Health, and Overall Wellbeing — structured as interactive programs, videos, and guided modules. Evidence-based, NIOSH-aligned, and delivered in 9 languages." },
    { emoji: "🏃", tag: "", title: "Activity & Wellness Tracking", desc: "Employees earn points by walking, sleeping well, and completing wellness tasks. Syncs with Apple Health and Google Fit to reward healthy behavior automatically." },
    { emoji: "👥", tag: "", title: "Community & Social Engagement", desc: "Employees connect, share achievements, and motivate each other. A social layer that drives participation and builds a culture of health across your organization." },
    { emoji: "🩺", tag: "", title: "Connect with Professionals", desc: "Employees can request direct consultations with occupational health professionals — not just chatbots. Schedule by urgency, get real clinical guidance." },
    { emoji: "🎁", tag: "", title: "Rewards Marketplace", desc: "100+ brand partners across food, fashion, medical, services, and more. Employees redeem real points for real rewards — driving daily engagement that no other platform can match." },
    { emoji: "🤖", tag: "", title: "AI Occupational Health Agent", desc: "Employees speak directly with an AI agent trained on occupational health guidelines. Get instant answers on symptoms, safety protocols, and wellness recommendations — available 24/7 in any of the 9 supported languages." },
    { emoji: "📊", tag: "", title: "HR & Manager Dashboards", desc: "Real-time visibility into workforce health engagement, absenteeism trends, and wellness participation rates. Give HR leaders and managers the data they need to make proactive, evidence-based decisions." },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#f5a623" }}>
            THE PLATFORM
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What's Inside VCOSH</h2>
          <p className="text-lg text-gray-500">Seven pillars that cover every dimension of workforce health and engagement.</p>
        </div>

        {/* Feature screenshots */}
        <div className="flex justify-center gap-6 mb-16 flex-wrap">
          {[FEATURE_SCREEN_1, FEATURE_SCREEN_2, FEATURE_SCREEN_3].map((src, i) => (
            <div key={i} className="w-40 h-80 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <img src={src} alt="VCOSH Feature" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-6 hover:shadow-md transition-shadow"
              style={{ background: "#f8fafb", border: "1px solid #e8edf0" }}
            >
              <div className="text-3xl mb-3">{p.emoji}</div>
              {p.tag && (
                <span className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-full mb-2 inline-block" style={{ background: "#e8f5ef", color: "#1a7a5e" }}>
                  {p.tag}
                </span>
              )}
              <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 9 Languages ──────────────────────────────────────────────────────────────
function Languages() {
  const langs = [
    { flag: "🇸🇦", name: "Arabic" },
    { flag: "🇬🇧", name: "English" },
    { flag: "🇮🇳", name: "Hindi" },
    { flag: "🇧🇩", name: "Bengali" },
    { flag: "🇵🇭", name: "Filipino" },
    { flag: "🇮🇩", name: "Indonesian" },
    { flag: "🇱🇰", name: "Sinhala" },
    { flag: "🇪🇹", name: "Amharic" },
    { flag: "🇵🇰", name: "Urdu" },
  ];

  return (
    <section
      className="py-24"
      style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c42 50%, #0f4a35 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#f5a623" }}>
            MULTILINGUAL BY DESIGN
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            9 Languages.<br />One Platform.<br />Every Worker.
          </h2>
          <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            VCOSH is available in Arabic, English, Hindi, Bengali, Tagalog, Indonesian, Sinhala, Amharic, and Urdu — covering the full linguistic diversity of the Saudi enterprise workforce. When every worker can access health content in their own language, participation rates soar and health outcomes improve.
          </p>
        </div>

        {/* Language pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {langs.map((l) => (
            <div
              key={l.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp screenshots */}
        <div className="flex justify-center gap-6 flex-wrap">
          {[WA_IMG_1, WA_IMG_2, WA_IMG_3].map((src, i) => (
            <div key={i} className="w-40 h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <img src={src} alt="VCOSH multilingual" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why VCOSH ────────────────────────────────────────────────────────────────
function WhyVcosh() {
  const reasons = [
    { emoji: "🏛️", title: "Saudi-First, Not Adapted", desc: "Built from the ground up under NIOSH and approved by NCOSH. Compliance and cultural relevance are built in — not retrofitted." },
    { emoji: "🌍", title: "9 Languages for the Real Workforce", desc: "The only occupational health platform that serves Arabic, Hindi, Bengali, Tagalog, Sinhala, Amharic, and Urdu workers in their native language." },
    { emoji: "🦺", title: "Occupational Health, Not Just Wellness", desc: "Built on NIOSH occupational safety science — covering hazard reporting, RealAge testing, and clinical consultations. Not a step counter." },
    { emoji: "🎁", title: "Real Rewards, Real Engagement", desc: "100+ brand partners. Employees earn points and redeem real vouchers — not badges. This is what drives daily, sustained engagement." },
    { emoji: "📊", title: "Measurable ROI for the Board", desc: "Your HR dashboard tracks participation, health trends, and absenteeism reduction. You can show the board exactly what your wellness investment is delivering." },
    { emoji: "🩺", title: "AI + Human Professional Access", desc: "Employees connect with real occupational health professionals — not just AI chatbots. A clinical-grade tool that generic wellness apps cannot offer." },
  ];

  return (
    <section id="why-vcosh" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#f5a623" }}>
            THE DIFFERENCE
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why VCOSH — Not Any Other App</h2>
          <p className="text-lg text-gray-500">Six reasons why VCOSH is in a category of its own.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{r.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{r.title}</h3>
              <p className="text-gray-600 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Rewards Ecosystem ────────────────────────────────────────────────────────
function RewardsEcosystem() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#f5a623" }}>
            THE REWARDS ECOSYSTEM
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            100+ Brand Partners.<br />Real Rewards. Real Motivation.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Employees earn points through healthy behaviors and redeem them at leading brands across food, fashion, medical, services, and more.
          </p>
        </div>

        {/* Rewards app screenshots */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {[REWARDS_SCREEN_1, REWARDS_SCREEN_2, REWARDS_SCREEN_3, REWARDS_SCREEN_4].map((src, i) => (
            <div key={i} className="w-36 h-72 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <img src={src} alt="VCOSH Rewards" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Endorsement cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-8 text-center" style={{ background: "#f0faf5", border: "1px solid #c6ead8" }}>
            <img src={NIOSH_LOGO_AR} alt="NIOSH" className="h-14 mx-auto mb-4 object-contain" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Developed Under NIOSH</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Built in alignment with the National Institute for Occupational Safety and Health — the Kingdom's authority on workforce health standards.
            </p>
          </div>
          <div className="rounded-2xl p-8 text-center" style={{ background: "#fffbf0", border: "1px solid #fde8a0" }}>
            <img src={NCOSH_LOGO} alt="NCOSH" className="h-14 mx-auto mb-4 object-contain" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Approved by NCOSH</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Officially endorsed by the National Council for Occupational Safety and Health — giving your organization full regulatory confidence in the platform.
            </p>
          </div>
          <div className="rounded-2xl p-8 text-center" style={{ background: "#f0f7ff", border: "1px solid #c0d8f5" }}>
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Proven Global Model</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enterprise wellness platforms globally have demonstrated 28–36% reductions in absenteeism and 6:1 ROI on workforce health investment. VCOSH brings this to Saudi Arabia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      className="py-24"
      style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c42 50%, #0f4a35 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-900/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-emerald-300 uppercase">
            Limited Strategic Partnerships Available
          </span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Transform<br />Your Workforce?
        </h2>
        <p className="text-lg text-emerald-100/80 mb-10 leading-relaxed">
          Book a direct call with our team to explore a tailored VCOSH deployment for your organization — and see exactly how it will reduce absenteeism, boost engagement, and deliver measurable ROI.
        </p>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-lg transition-all hover:opacity-90 hover:scale-105 mb-8"
          style={{ background: "linear-gradient(135deg, #c8860a 0%, #f5a623 100%)" }}
        >
          Book Your Strategic Call →
        </a>

        <div className="flex justify-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div>
              <div className="text-xs text-gray-400 leading-none">Download on the</div>
              <div className="text-sm font-semibold leading-tight">App Store</div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.65.19.98.08l12.49-7.17-2.83-2.83-10.64 9.92zM.54 1.52C.2 1.86 0 2.4 0 3.1v17.8c0 .7.2 1.24.54 1.58l.08.08 9.96-9.96v-.24L.62 1.44l-.08.08zM20.15 10.3l-2.83-1.63-3.17 3.17 3.17 3.17 2.86-1.65c.82-.47.82-1.24-.03-1.06zM3.18.24L15.67 7.4l-2.83 2.83L2.2.31c.33-.11.68-.09.98.08v-.15z" />
            </svg>
            <div>
              <div className="text-xs text-gray-400 leading-none">Get it on</div>
              <div className="text-sm font-semibold leading-tight">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 bg-gray-900 text-center">
      <p className="text-sm text-gray-500">Virtual Center of Occupational Safety &amp; Health Services</p>
      <p className="text-sm text-gray-600 mt-1">© 2026 VCOSH. All rights reserved.</p>
    </footer>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function VcoshLanding() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <Hero />
      <WhatIsVcosh />
      <BusinessCase />
      <HowItWorks />
      <Features />
      <Languages />
      <WhyVcosh />
      <RewardsEcosystem />
      <FinalCTA />
      <Footer />
    </div>
  );
}
