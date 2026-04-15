import { useEffect } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { content } from "@/lib/content";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, GraduationCap, Users, Lightbulb, Handshake, Target, Laptop, Globe, BookOpen, Clock } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PageMeta from "@/components/PageMeta";

// ─── Board member data ─────────────────────────────────────────────────────────
const LOGOS = {
  mhrsd: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-mhrsd_bbbd817a.png",
  gosi:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-gosi-new_8556ccc0.png",
  tvtc:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/tvtc_cropped_d6008e71.png",
  ncosh: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-ncosh-new_28e0e950.png",
  sais:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-sais_c18b314c.png",
  uqu:   "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-uqu-new_70a7f96f.png",
  hrdf:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/logo-hrdf-correct_8bb3a901.png",
};

const PHOTOS = {
  abuthnain: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-abuthnain-new_8641f572.jpeg",
  alboug:    "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-alboug_67f5394f.jpeg",
  alahmad:   "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-badr-new_ff9b9887.png",
  alfuwaiz:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-majed-new_68b46b75.png",
  alsubaie:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-alsubaie_22cb90aa.jpeg",
  alsharif:  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-alsharif_95c90089.png",
  shinawi:   "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-shinawi-correct_3596c371.png",
};

const CEO_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/majed-ceo_5cf6b059.png";

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

// ─── Chairman message content ──────────────────────────────────────────────────
const chairmanContent = {
  ar: {
    name: "معالي الدكتور عبدالله بن ناصر أبو ثنين",
    role: "رئيس مجلس الإدارة",
    org: "المعهد الوطني للسلامة والصحة المهنية",
    paragraphs: [
      "الحمد لله رب العالمين، والصلاة والسلام على نبينا محمد وعلى آله وصحبه أجمعين،،",
      "يسرّني أن أرحب بكم في المعهد الوطني للسلامة والصحة المهنية، الذي يأتي تأسيسه امتدادًا لاهتمام المملكة العربية السعودية – أيدها الله – بتعزيز جودة الحياة، وحماية الإنسان، وتهيئة بيئات عمل آمنة وصحية تدعم التنمية المستدامة وتواكب مستهدفات رؤية المملكة 2030.",
      "وانطلاقًا من الدور الوطني للمجلس الوطني للسلامة والصحة المهنية، يعمل المعهد بوصفه ركيزة أساسية في تطوير منظومة السلامة والصحة المهنية، من خلال بناء القدرات الوطنية، ورفع مستوى الوعي، وتعزيز الامتثال للأنظمة والتشريعات، بما يتماشى مع أفضل الممارسات والمعايير الدولية.",
      "وفي هذا الإطار، يحرص مجلس الإدارة على ترسيخ نموذج حوكمة فعّال يضمن وضوح الأدوار والمسؤوليات، ويعزز التكامل بين الجهات ذات العلاقة، ويدعم اتخاذ القرار المبني على الأدلة والمؤشرات، بما يسهم في تحقيق الكفاءة التشغيلية ورفع جودة المخرجات.",
      "كما يولي المعهد اهتمامًا بتطوير برامج تدريبية وتأهيلية نوعية تستجيب لاحتياجات سوق العمل، وتسهم في تمكين الكوادر الوطنية، ورفع جاهزيتها، وتعزيز ثقافة الوقاية والسلوك الآمن في بيئات العمل المختلفة.",
      "ويؤمن المعهد بأهمية الشراكات الاستراتيجية مع مختلف القطاعات، محليًا ودوليًا، لتبادل الخبرات ونقل المعرفة، بما يدعم بناء منظومة متكاملة ومستدامة، قادرة على مواكبة المتغيرات المتسارعة في سوق العمل.",
      "وفي ظل التحول الرقمي، يعمل المعهد على تبني حلول تقنية متقدمة لتطوير خدماته، بما يشمل التدريب والتقييم والاعتماد، بما يعزز الكفاءة والشفافية، ويرفع من جودة التجربة للمستفيدين.",
      "وختامًا، نؤكد التزام مجلس إدارة المعهد الوطني للسلامة والصحة المهنية بدعم مسيرة المعهد وتمكينه من أداء دوره الوطني، والعمل مع شركائنا لتحقيق بيئات عمل آمنة ومستدامة، تعزز من تنافسية الاقتصاد الوطني وتحافظ على سلامة وصحة الإنسان.",
      "والله ولي التوفيق.",
    ],
  },
  en: {
    name: "H.E. Dr. Abdullah bin Nasser Abu Thinain",
    role: "Chairman of the Board",
    org: "National Institute of Occupational Safety and Health (NIOSH)",
    paragraphs: [
      "In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of all worlds, and may peace and blessings be upon our Prophet Muhammad, his family, and all his companions.",
      "It is my pleasure to welcome you to the National Institute of Occupational Safety and Health, whose establishment is an extension of the Kingdom of Saudi Arabia's commitment to enhancing quality of life, protecting people, and creating safe and healthy work environments that support sustainable development and align with the targets of Vision 2030.",
      "Building on the national role of the National Council for Occupational Safety and Health, the Institute serves as a cornerstone in developing the occupational safety and health system, through building national capacities, raising awareness, and promoting compliance with regulations and legislation, in line with international best practices and standards.",
      "In this context, the Board of Directors is committed to establishing an effective governance model that ensures clarity of roles and responsibilities, enhances integration among relevant entities, and supports evidence-based decision-making — contributing to operational efficiency and improved quality of outcomes.",
      "The Institute also places great emphasis on developing high-quality training and qualification programs that respond to labor market needs, contribute to empowering national talent, enhancing their readiness, and promoting a culture of prevention and safe behavior across various work environments.",
      "The Institute believes in the importance of strategic partnerships with various sectors, both locally and internationally, for the exchange of expertise and transfer of knowledge — supporting the development of an integrated and sustainable system capable of keeping pace with the rapidly evolving labor market.",
      "In the era of digital transformation, the Institute is adopting advanced technological solutions to develop its services — including training, assessment, and accreditation — enhancing efficiency and transparency, and elevating the quality of experience for beneficiaries.",
      "In closing, we reaffirm the commitment of the Board of Directors to supporting the Institute's journey and enabling it to fulfill its national role, working alongside our partners to achieve safe and sustainable work environments that enhance the competitiveness of the national economy and safeguard human safety and health.",
      "May Allah grant us all success.",
    ],
  },
};

// ─── CEO message content (updated from PDF) ───────────────────────────────────
const ceoContent = {
  ar: {
    name: "سعادة المهندس/ ماجد بن إبراهيم الفويز",
    role: "الرئيس التنفيذي المكلّف",
    org: "المعهد الوطني للسلامة والصحة المهنية",
    paragraphs: [
      "يشهد سوق العمل في المملكة العربية السعودية تحولات اقتصادية وصناعية متسارعة، تماشياً مع المستهدفات الطموحة لرؤية السعودية 2030. ومع هذا التوسع غير المسبوق في حجم الأعمال وتنوع القطاعات، تتزايد الحاجة اللحة لضمان بيئات عمل آمنة وصحية ومستدامة، تضع سلامة الإنسان في صميم أولوياتها باعتباره الحرك الأساسي للتنمية الشاملة.",
      "من هذا المنطلق، وتتويجاً للجهود الوطنية الرامية إلى الارتقاء بمعايير السلامة والصحة المهنية، يأتي دور المعهد الوطني للسلامة والصحة المهنية ليكون الذراع التنفيذي والمرجع الوطني الأول في هذا المجال. نحن في المعهد لا نكتفي بتقديم التدريب والاستشارات، بل نسعى لبناء منظومة متكاملة تعمل على تأهيل الكفاءات الوطنية، وتطوير السياسات، وتمكين البحث والابتكار، وفق أعلى المعايير والممارسات العالمية.",
      "إن التزامنا في المعهد يتجاوز حدود الامتثال التنظيمي؛ ليمتد إلى نشر ثقافة وقائية راسخة في كافة قطاعات العمل. ومن خلال شراكاتنا الاستراتيجية محلياً ودولياً، نعمل جنباً إلى جنب مع أصحاب العمل والعاملين لتقديم حلول فنية متقدمة ونماذج تشغيلية مبتكرة، تسهم في رفع كفاءة سوق العمل وجاذبيته، وتقليل المخاطر المهنية.",
      "ندعو كافة شركائنا في القطاعين العام والخاص للانضمام إلينا في هذه الرحلة نحو الريادة العالمية، لنعمل معاً على بناء مستقبل مهني آمن ومزدهر لأبناء وبنات هذا الوطن المعطاء.",
    ],
  },
  en: {
    name: "Eng. Majed bin Ibrahim Al-Fuwaiz",
    role: "Interim CEO",
    org: "National Institute of Occupational Safety and Health (NIOSH)",
    paragraphs: [
      "The labor market in the Kingdom of Saudi Arabia is witnessing rapid economic and industrial transformations, in line with the ambitious targets of Saudi Vision 2030. With this unprecedented expansion in business scale and sector diversification, the urgent need to ensure safe, healthy, and sustainable work environments continues to grow — placing human safety at the heart of its priorities as the fundamental driver of comprehensive development.",
      "From this standpoint, and as a culmination of national efforts aimed at elevating occupational safety and health standards, the National Institute of Occupational Safety and Health (NIOSH) assumes its role as the executive arm and the foremost national reference in this field. At the Institute, we do not merely provide training and consultancy; rather, we strive to build an integrated system that works to qualify national competencies, develop policies, and enable research and innovation, in accordance with the highest international standards and practices.",
      "Our commitment at the Institute goes beyond the boundaries of regulatory compliance; it extends to spreading a deeply rooted preventive culture across all labor sectors. Through our strategic partnerships locally and internationally, we work side by side with employers and workers to deliver advanced technical solutions and innovative operational models that enhance labor market efficiency and attractiveness, and reduce occupational risks.",
      "We invite all our partners in the public and private sectors to join us on this journey towards global leadership, to work together in building a safe and prosperous professional future for the sons and daughters of this generous nation.",
    ],
  },
};

// ─── Priority icons ────────────────────────────────────────────────────────────
const priorityIcons = [
  <GraduationCap className="h-6 w-6" />,
  <BookOpen className="h-6 w-6" />,
  <Users className="h-6 w-6" />,
  <Lightbulb className="h-6 w-6" />,
  <Handshake className="h-6 w-6" />,
  <Target className="h-6 w-6" />,
  <Laptop className="h-6 w-6" />,
  <Globe className="h-6 w-6" />,
];

// ─── Section anchor IDs ────────────────────────────────────────────────────────
export const ABOUT_SECTIONS = {
  overview: "about-overview",
  priorities: "about-priorities",
  structure: "about-structure",
  roles: "about-roles",
  board: "about-board",
  chairman: "about-chairman-message",
  ceo: "about-ceo-message",
};

// ─── Reusable section header ───────────────────────────────────────────────────
function SectionHeader({ title, accent = false }: { title: string; accent?: boolean }) {
  return (
    <div className="text-center mb-12 space-y-3">
      <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
      <div className={`w-16 h-1 mx-auto rounded-full ${accent ? "bg-secondary" : "bg-accent"}`} />
    </div>
  );
}

// ─── Message block (chairman / CEO) ───────────────────────────────────────────
function MessageBlock({
  photo,
  name,
  role,
  org,
  paragraphs,
  isRTL,
}: {
  photo: string;
  name: string;
  role: string;
  org: string;
  paragraphs: string[];
  isRTL: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto"
    >
      {/* Top: photo + name */}
      <div className="bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f] p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-xl bg-white">
              <img src={photo} alt={name} className="w-full h-full object-cover object-top" />
            </div>
          </div>
          <div className={`text-center md:${isRTL ? "text-right" : "text-left"}`}>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{name}</h3>
            <p className="text-green-200 text-base font-medium mb-1">{role}</p>
            <p className="text-green-300/80 text-sm">{org}</p>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="p-8 md:p-10 space-y-5">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-gray-700 text-base md:text-lg leading-relaxed"
            style={{ fontFamily: isRTL ? "'IBM Plex Sans Arabic', sans-serif" : "'Roboto', sans-serif" }}
          >
            {p}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Board member card ─────────────────────────────────────────────────────────
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
      <div className="h-1.5 w-full" style={{ backgroundColor: member.accentColor }} />
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
      <div className="px-6 pb-6 flex flex-col flex-1 text-center">
        {/* Board role badge — fixed height so all cards align */}
        <div className="flex justify-center mb-3" style={{ minHeight: '28px' }}>
          <span
            className={`inline-block self-center px-3 py-1 rounded-full text-xs font-semibold ${
              isChairman ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
            }`}
          >
            {boardRole}
          </span>
        </div>
        {/* Name — fixed height to absorb long/short names equally */}
        <div style={{ minHeight: '48px' }} className="flex items-start justify-center mb-2">
          <h3 className="text-base font-bold text-gray-900 leading-snug">{name}</h3>
        </div>
        {/* Position — fixed height so all cards have the same body height */}
        <div style={{ minHeight: '72px' }} className="flex items-start justify-center mb-4">
          <p className="text-sm text-gray-500 leading-relaxed">{position}</p>
        </div>
        <div className="border-t border-gray-100 pt-4 mt-auto">
          <div className="flex justify-center items-center h-20 mb-2">
            <img src={LOGOS[member.logoKey]} alt={entity} className="max-h-20 max-w-[200px] object-contain" />
          </div>
          {/* Entity name — fixed height */}
          <div style={{ minHeight: '36px' }} className="flex items-start justify-center">
            <p className="text-xs text-gray-400 leading-snug">{entity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Coming soon placeholder ───────────────────────────────────────────────────
function ComingSoonBlock({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-4">
      <Clock className="w-12 h-12 text-primary/30" />
      <p className="text-lg font-medium text-primary/60">
        {isRTL ? "قريباً — المحتوى قيد الإعداد" : "Coming Soon — Content is being prepared"}
      </p>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function About() {
  const { lang, setLang } = useLang();
  const isRTL = lang === "ar";
  const t = content[lang];
  const [location] = useLocation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Scroll to anchor on load / hash change
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [location]);

  const chairman = BOARD_MEMBERS[0];
  const members = BOARD_MEMBERS.slice(1);

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://niosh.sa/about#webpage",
    url: "https://niosh.sa/about",
    name: isRTL ? "عن المعهد – المعهد الوطني للسلامة والصحة المهنية" : "About NIOSH – National Institute of Occupational Safety and Health",
    isPartOf: { "@id": "https://niosh.sa/#website" },
    publisher: { "@id": "https://niosh.sa/#organization" },
  };

  return (
    <Layout lang={lang} setLang={setLang}>
      <JsonLd data={aboutPageSchema} />
      <PageMeta
        title={isRTL ? 'عن المعهد – المعهد الوطني للسلامة والصحة المهنية' : 'About NIOSH – National Institute for Occupational Safety and Health'}
        description={isRTL ? 'تعرف على المعهد الوطني للسلامة والصحة المهنية: نبذته، أولوياته الاستراتيجية، أعضاء مجلس الإدارة، وكلمة الرئيس التنفيذي.' : 'Learn about NIOSH: our mission, strategic priorities, board of directors, and the CEO\'s message.'}
        url="/about"
      />

      {/* ── Page Hero ── */}
      <section
        className="bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f] text-white py-16"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {isRTL ? "عن المعهد" : "About the Institute"}
          </h1>
          <p className="text-green-200 text-base md:text-lg max-w-2xl mx-auto">
            {isRTL
              ? "المعهد الوطني للسلامة والصحة المهنية"
              : "National Institute of Occupational Safety and Health (NIOSH)"}
          </p>
        </div>
      </section>

      {/* ── 1. نبذة عن المعهد ── */}
      <section id={ABOUT_SECTIONS.overview} className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container max-w-5xl mx-auto px-6">
          <SectionHeader title={isRTL ? "نبذة عن المعهد" : "About the Institute"} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-4 text-lg text-muted-foreground leading-relaxed text-justify max-w-4xl mx-auto mb-12"
          >
            {t.about.description.map((p, i) => <p key={i}>{p}</p>)}
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t.about.mission.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.about.mission.text}</p>
            </motion.div>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 text-secondary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t.about.vision.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.about.vision.text}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. الأولويات الاستراتيجية ── */}
      <section id={ABOUT_SECTIONS.priorities} className="py-20 bg-primary/5" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container max-w-6xl mx-auto px-6">
          <SectionHeader title={isRTL ? "الأولويات الاستراتيجية" : "Strategic Priorities"} accent />
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          >
            {t.priorities.items.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-md transition-all duration-300 border-border/50 hover:border-secondary/30">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center mb-3 text-primary">
                      {priorityIcons[index]}
                    </div>
                    <CardTitle className="text-lg font-bold text-primary leading-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. الهيكل التنظيمي ── */}
      <section id={ABOUT_SECTIONS.structure} className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container max-w-5xl mx-auto px-6">
          <SectionHeader title={isRTL ? "الهيكل التنظيمي" : "Organizational Structure"} />
          <ComingSoonBlock isRTL={isRTL} />
        </div>
      </section>

      {/* ── 4. أدوار وصلاحيات المعهد ── */}
      <section id={ABOUT_SECTIONS.roles} className="py-20 bg-primary/5" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container max-w-5xl mx-auto px-6">
          <SectionHeader title={isRTL ? "أدوار وصلاحيات المعهد" : "Institute's Roles and Powers"} accent />
          <ComingSoonBlock isRTL={isRTL} />
        </div>
      </section>

      {/* ── 5. أعضاء مجلس الإدارة ── */}
      <section id={ABOUT_SECTIONS.board} className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container max-w-6xl mx-auto px-6">
          <SectionHeader title={isRTL ? "أعضاء مجلس الإدارة" : "Board of Directors"} />
          {/* Chairman */}
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
          {/* Other members */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <MemberCard member={m} isRTL={isRTL} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. كلمة رئيس مجلس الإدارة ── */}
      <section id={ABOUT_SECTIONS.chairman} className="py-20 bg-primary/5" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container max-w-5xl mx-auto px-6">
          <SectionHeader title={isRTL ? "كلمة رئيس مجلس الإدارة" : "Chairman's Message"} accent />
          <ComingSoonBlock isRTL={isRTL} />
        </div>
      </section>

      {/* ── 7. كلمة الرئيس التنفيذي ── */}
      <section id={ABOUT_SECTIONS.ceo} className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container max-w-5xl mx-auto px-6">
          <SectionHeader title={isRTL ? "كلمة الرئيس التنفيذي المكلّف" : "Interim CEO's Message"} />
          <MessageBlock
            photo={CEO_PHOTO}
            name={ceoContent[lang].name}
            role={ceoContent[lang].role}
            org={ceoContent[lang].org}
            paragraphs={ceoContent[lang].paragraphs}
            isRTL={isRTL}
          />
        </div>
      </section>
    </Layout>
  );
}
