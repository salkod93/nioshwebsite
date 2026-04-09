import { useLang } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import JsonLd from "@/components/JsonLd";
import { motion } from "framer-motion";

const CHAIRMAN_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-abuthnain-new_8641f572.jpeg";

const content = {
  ar: {
    pageTitle: "كلمة رئيس مجلس الإدارة",
    subtitle: "المعهد الوطني للسلامة والصحة المهنية",
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
    pageTitle: "Chairman's Message",
    subtitle: "National Institute of Occupational Safety and Health",
    name: "H.E. Dr. Abdullah bin Nasser Abu Thinain",
    role: "Chairman of the Board",
    org: "National Institute of Occupational Safety and Health (NIOSH)",
    paragraphs: [
      "In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of all worlds, and may peace and blessings be upon our Prophet Muhammad, his family, and all his companions.",
      "It is my pleasure to welcome you to the National Institute of Occupational Safety and Health, whose establishment is an extension of the Kingdom of Saudi Arabia's — may Allah support it — commitment to enhancing quality of life, protecting people, and creating safe and healthy work environments that support sustainable development and align with the targets of Vision 2030.",
      "Building on the national role of the National Council for Occupational Safety and Health, the Institute serves as a cornerstone in developing the occupational safety and health system, through building national capacities, raising awareness, and promoting compliance with regulations and legislation, in line with international best practices and standards.",
      "In this context, the Board of Directors is committed to establishing an effective governance model that ensures clarity of roles and responsibilities, enhances integration among relevant entities, and supports evidence-based and indicator-driven decision-making — contributing to operational efficiency and improved quality of outcomes.",
      "The Institute also places great emphasis on developing high-quality training and qualification programs that respond to labor market needs, contribute to empowering national talent, enhancing their readiness, and promoting a culture of prevention and safe behavior across various work environments.",
      "The Institute believes in the importance of strategic partnerships with various sectors, both locally and internationally, for the exchange of expertise and transfer of knowledge — supporting the development of an integrated and sustainable system capable of keeping pace with the rapidly evolving labor market.",
      "In the era of digital transformation, the Institute is adopting advanced technological solutions to develop its services — including training, assessment, and accreditation — enhancing efficiency and transparency, and elevating the quality of experience for beneficiaries.",
      "In closing, we reaffirm the commitment of the Board of Directors of the National Institute of Occupational Safety and Health to supporting the Institute's journey and enabling it to fulfill its national role, working alongside our partners to achieve safe and sustainable work environments that enhance the competitiveness of the national economy and safeguard human safety and health.",
      "May Allah grant us all success.",
    ],
  },
};

const chairmanMessagePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://niosh.sa/chairman-message#webpage",
  url: "https://niosh.sa/chairman-message",
  name: "Chairman's Message – NIOSH",
  alternateName: "كلمة رئيس مجلس الإدارة – المعهد الوطني للسلامة والصحة المهنية",
  description:
    "A message from the Chairman of the Board of the National Institute of Occupational Safety and Health (NIOSH), H.E. Dr. Abdullah bin Nasser Abu Thinain.",
  isPartOf: { "@id": "https://niosh.sa/#website" },
  inLanguage: ["ar", "en"],
  publisher: { "@id": "https://niosh.sa/#organization" },
};

export default function ChairmanMessage() {
  const { lang, setLang } = useLang();
  const isRTL = lang === "ar";
  const t = content[lang];

  return (
    <Layout lang={lang} setLang={setLang}>
      <JsonLd data={chairmanMessagePageSchema} />

      {/* Hero */}
      <section
        className="bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f] text-white py-16"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t.pageTitle}</h1>
          <p className="text-green-200 text-base md:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-16" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Top section: Photo + Name */}
            <div className="bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f] p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Photo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-shrink-0"
                >
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/20 shadow-xl bg-white">
                    <img
                      src={CHAIRMAN_PHOTO}
                      alt={t.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </motion.div>

                {/* Name & Title */}
                <div className={`text-center md:${isRTL ? "text-right" : "text-left"}`}>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {t.name}
                  </h2>
                  <p className="text-green-200 text-lg font-medium mb-1">
                    {t.role}
                  </p>
                  <p className="text-green-300/80 text-sm">
                    {t.org}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="p-8 md:p-12">
              <div className="space-y-6 max-w-3xl mx-auto">
                {t.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-gray-700 text-lg leading-relaxed"
                    style={{
                      fontFamily: isRTL
                        ? "'IBM Plex Sans Arabic', sans-serif"
                        : "'Roboto', sans-serif",
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
