import { useLang } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";

// CDN URLs for entity logos (extracted from member documents)
const LOGOS = {
  mhrsd: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-mhrsd_bbbd817a.png",
  gosi:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-gosi-new_8556ccc0.png",
  tvtc:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/tvtc_cropped_d6008e71.png",
  ncosh: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-ncosh-new_28e0e950.png",
  sais:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-sais_c18b314c.png",
  uqu:   "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-uqu-new_70a7f96f.png",
  hrdf:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-hrdf-correct_8bb3a901.png",
};

// CDN URLs for personal photos
const PHOTOS = {
  abuthnain: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-abuthnain_ad119f7d.png",
  alboug:    "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-alboug_67f5394f.jpeg",
  alahmad:   "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-alahmad_700a247f.png",
  alfuwaiz:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-alfuwaiz_8bdf7da1.png",
  alsubaie:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-alsubaie_22cb90aa.jpeg",
  alsharif:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-alsharif_95c90089.png",
  shinawi:   "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-shinawi-correct_3596c371.png",
};

interface BoardMember {
  photoKey: keyof typeof PHOTOS;
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
  photoPosition?: string;
}

const BOARD_MEMBERS: BoardMember[] = [
  {
    photoKey: "abuthnain",
    nameEn: "His Excellency Dr. Abdullah bin Nasser Abu Thinain",
    nameAr: "معالي الدكتور عبدالله بن ناصر أبو ثنين",
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
    photoKey: "alboug",
    nameEn: "His Excellency Abdulaziz bin Hasan Al-Boug",
    nameAr: "معالي الأستاذ عبدالعزيز بن حسن البوق",
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
    photoKey: "alahmad",
    nameEn: "Dr. Badr Suleman A. Alahmad",
    nameAr: "د. بدر بن سليمان الأحمد",
    boardRoleEn: "Board Member",
    boardRoleAr: "عضو مجلس الإدارة",
    positionEn: "Vice Governor for Support Services, Technical and Vocational Training Corporation (TVTC)",
    positionAr: "نائب محافظ المؤسسة العامة للتدريب التقني والمهني للخدمات المساندة",
    entityEn: "Technical and Vocational Training Corporation (TVTC)",
    entityAr: "المؤسسة العامة للتدريب التقني والمهني",
    logoKey: "tvtc",
    accentColor: "#006b8f",
    photoPosition: "center center",
  },
  {
    photoKey: "alfuwaiz",
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
    photoPosition: "center center",
  },
  {
    photoKey: "alsubaie",
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
    photoKey: "alsharif",
    nameEn: "Dr. Muhammad bin Naif bin Zamil Al-Sharif",
    nameAr: "د.محمد بن نايف الشريف",
    boardRoleEn: "Board Member",
    boardRoleAr: "عضو مجلس الإدارة",
    positionEn: "Dean of the Institute of Research and Studies and Consulting Services, Umm Al-Qura University",
    positionAr: "عميد معهد الأبحاث والدراسات الاستشارية بجامعة أم القرى",
    entityEn: "Umm Al-Qura University (UQU)",
    entityAr: "جامعة أم القرى",
    logoKey: "uqu",
    accentColor: "#1a5276",
  },
  {
    photoKey: "shinawi",
    nameEn: "Eng. Nader bin Youssef Shinawi",
    nameAr: "م. نادر بن يوسف شناوي",
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
  const isChairman = member.boardRoleEn === "Chairman of the Board";

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: member.accentColor }} />

      {/* Photo */}
      <div className="flex justify-center pt-8 pb-4">
        <div
          className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-white"
          style={{ boxShadow: `0 0 0 3px ${member.accentColor}30` }}
        >
          <img
            src={PHOTOS[member.photoKey]}
            alt={name}
            className="w-full h-full object-cover"
            style={{ objectPosition: member.photoPosition ?? "top center" }}
          />
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
          {/* Entity logo — larger */}
          <div className="flex justify-center items-center h-20 mb-2">
            <img
              src={LOGOS[member.logoKey]}
              alt={entity}
              className="max-h-20 max-w-[200px] object-contain"
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
