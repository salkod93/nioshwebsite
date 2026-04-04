import { useLang } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";

// CDN URLs for entity logos
const LOGOS = {
  mhrsd: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/mhrsd_2884fdd7.png",
  gosi:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/gosi_6d4b8919.png",
  tvtc:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/tvtc_51b5c207.jpg",
  ncosh: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/ncosh_a8a7e9de.jpg",
  sais:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/sais_41d256b3.jpg",
  uqu:   "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/uqu_40cf543d.png",
  hrdf:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/hrdf_d4739dca.png",
};

interface BoardMember {
  initialsEn: string;
  initialsAr: string;
  nameEn: string;
  nameAr: string;
  boardRoleEn: string;
  boardRoleAr: string;
  positionEn: string;
  positionAr: string;
  entityEn: string;
  entityAr: string;
  logoKey: keyof typeof LOGOS;
  accentColor: string;
}

const BOARD_MEMBERS: BoardMember[] = [
  {
    initialsEn: "AA",
    initialsAr: "عأ",
    nameEn: "Dr. Abdullah Nasser Abuthnain",
    nameAr: "د. عبدالله بن ناصر أبونثين",
    boardRoleEn: "Chairman of the Board",
    boardRoleAr: "رئيس مجلس الإدارة",
    positionEn: "Vice Minister of Human Resources and Social Development for the Labor Sector",
    positionAr: "نائب وزير الموارد البشرية والتنمية الاجتماعية لقطاع العمل",
    entityEn: "Ministry of Human Resources and Social Development",
    entityAr: "وزارة الموارد البشرية والتنمية الاجتماعية",
    logoKey: "mhrsd",
    accentColor: "#1a6b3c",
  },
  {
    initialsEn: "AB",
    initialsAr: "عب",
    nameEn: "Eng. Abdulaziz bin Hassan Al-Boug",
    nameAr: "أ. عبدالعزيز بن حسن البوق",
    boardRoleEn: "Board Member",
    boardRoleAr: "عضو مجلس الإدارة",
    positionEn: "Governor of the General Organization for Social Insurance",
    positionAr: "محافظ المؤسسة العامة للتأمينات الاجتماعية",
    entityEn: "General Organization for Social Insurance (GOSI)",
    entityAr: "المؤسسة العامة للتأمينات الاجتماعية",
    logoKey: "gosi",
    accentColor: "#003366",
  },
  {
    initialsEn: "BA",
    initialsAr: "بأ",
    nameEn: "Dr. Bader Suleiman Al-Ahmad",
    nameAr: "د. بدر بن سليمان الأحمد",
    boardRoleEn: "Board Member",
    boardRoleAr: "عضو مجلس الإدارة",
    positionEn: "Vice Governor of the Technical and Vocational Training Corporation",
    positionAr: "نائب محافظ المؤسسة العامة للتدريب التقني والمهني",
    entityEn: "Technical and Vocational Training Corporation (TVTC)",
    entityAr: "المؤسسة العامة للتدريب التقني والمهني",
    logoKey: "tvtc",
    accentColor: "#006b8f",
  },
  {
    initialsEn: "MF",
    initialsAr: "مف",
    nameEn: "Eng. Majed bin Ibrahim Al-Fuwaiz",
    nameAr: "م. ماجد بن إبراهيم الفويز",
    boardRoleEn: "Board Member",
    boardRoleAr: "عضو مجلس الإدارة",
    positionEn: "Secretary-General of the National Council for Occupational Safety and Health",
    positionAr: "الأمين العام للمجلس الوطني للسلامة والصحة المهنية",
    entityEn: "National Council for Occupational Safety and Health (NCOSH)",
    entityAr: "المجلس الوطني للسلامة والصحة المهنية",
    logoKey: "ncosh",
    accentColor: "#e87722",
  },
  {
    initialsEn: "MS",
    initialsAr: "مس",
    nameEn: "Eng. Misfer bin Salah Al-Subaie",
    nameAr: "م. مسفر بن صالح السبيعي",
    boardRoleEn: "Board Member",
    boardRoleAr: "عضو مجلس الإدارة",
    positionEn: "Assistant Governor for Legislation and Policies Sector, Supreme Authority for Industrial Security",
    positionAr: "مساعد محافظ الهيئة العليا للأمن الصناعي لقطاع التشريعات والسياسات",
    entityEn: "Supreme Authority for Industrial Security (SAIS)",
    entityAr: "الهيئة العليا للأمن الصناعي",
    logoKey: "sais",
    accentColor: "#8b6914",
  },
  {
    initialsEn: "MS2",
    initialsAr: "مش",
    nameEn: "Dr. Muhammad bin Naif Zamil Al-Sharif",
    nameAr: "د. محمد بن زامل الشريف",
    boardRoleEn: "Board Member",
    boardRoleAr: "عضو مجلس الإدارة",
    positionEn: "Dean of the Institute of Consulting Research and Studies, Umm Al-Qura University",
    positionAr: "عميد معهد الأبحاث والدراسات الاستشارية بجامعة أم القرى",
    entityEn: "Umm Al-Qura University (UQU)",
    entityAr: "جامعة أم القرى",
    logoKey: "uqu",
    accentColor: "#1a5276",
  },
  {
    initialsEn: "NS",
    initialsAr: "نش",
    nameEn: "Eng. Nader bin Youssef Shinawi",
    nameAr: "م. نادر بن يوسف شنوي",
    boardRoleEn: "Board Member",
    boardRoleAr: "عضو مجلس الإدارة",
    positionEn: "Head of the Training Support Program, Human Resources Development Fund",
    positionAr: "رئيس برنامج دعم التدريب بصندوق تنمية الموارد البشرية",
    entityEn: "Human Resources Development Fund (Hadaf)",
    entityAr: "صندوق تنمية الموارد البشرية (هدف)",
    logoKey: "hrdf",
    accentColor: "#1a6b3c",
  },
];

function MemberCard({ member, isRTL }: { member: BoardMember; isRTL: boolean }) {
  const name = isRTL ? member.nameAr : member.nameEn;
  const boardRole = isRTL ? member.boardRoleAr : member.boardRoleEn;
  const position = isRTL ? member.positionAr : member.positionEn;
  const entity = isRTL ? member.entityAr : member.entityEn;
  const initials = isRTL ? member.initialsAr : member.initialsEn;
  const isChairman = member.boardRoleEn === "Chairman of the Board";

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: member.accentColor }} />

      {/* Avatar */}
      <div className="flex justify-center pt-8 pb-4">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
          style={{ backgroundColor: member.accentColor }}
        >
          {initials}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex flex-col flex-1 text-center">
        {/* Board role badge */}
        <span
          className={`inline-block self-center px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            isChairman
              ? "bg-amber-100 text-amber-800"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {boardRole}
        </span>

        {/* Name */}
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{name}</h3>

        {/* Position */}
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{position}</p>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-4">
          {/* Entity logo */}
          <div className="flex justify-center items-center h-12 mb-2">
            <img
              src={LOGOS[member.logoKey]}
              alt={entity}
              className="max-h-10 max-w-[120px] object-contain"
            />
          </div>
          {/* Entity name */}
          <p className="text-xs text-gray-400 leading-snug">{entity}</p>
        </div>
      </div>
    </div>
  );
}

export default function BoardOfDirectors() {
  const { lang, setLang } = useLang();
  const isRTL = lang === "ar";

  const chairman = BOARD_MEMBERS[0];
  const members = BOARD_MEMBERS.slice(1);

  return (
    <Layout lang={lang} setLang={setLang}>
      {/* Page Hero */}
      <section
        className="bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f] text-white py-16"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {isRTL ? "أعضاء مجلس الإدارة" : "Board of Directors"}
          </h1>
          <p className="text-green-200 text-base md:text-lg max-w-2xl mx-auto">
            {isRTL
              ? "المعهد الوطني للسلامة والصحة المهنية"
              : "National Institute for Occupational Safety and Health (NIOSH)"}
          </p>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="bg-gray-50 py-16" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container max-w-6xl mx-auto px-6">

          {/* Chairman — centred, slightly larger */}
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-sm">
              <MemberCard member={chairman} isRTL={isRTL} />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-sm text-gray-400 font-medium whitespace-nowrap">
              {isRTL ? "أعضاء المجلس" : "Board Members"}
            </span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Members — 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <MemberCard key={member.nameEn} member={member} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
