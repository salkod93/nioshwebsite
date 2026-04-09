import { useLang } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import JsonLd from "@/components/JsonLd";
import { motion } from "framer-motion";


const CEO_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/majed-ceo_5cf6b059.png";

const content = {
  ar: {
    pageTitle: "كلمة الرئيس التنفيذي المكلّف",
    subtitle: "المعهد الوطني للسلامة والصحة المهنية",
    name: "سعادة المهندس/ ماجد بن إبراهيم الفويز",
    role: "الرئيس التنفيذي المكلّف",
    org: "المعهد الوطني للسلامة والصحة المهنية",
    paragraphs: [
      "يشهد سوق العمل في المملكة العربية السعودية تحولات اقتصادية وصناعية متسارعة، تماشياً مع المستهدفات الطموحة لرؤية السعودية 2030. ومع هذا التوسع غير المسبوق في حجم الأعمال وتنوع القطاعات، تتزايد الحاجة الملحة لضمان بيئات عمل آمنة وصحية ومستدامة، تضع سلامة الإنسان في صميم أولوياتها باعتباره المحرك الأساسي للتنمية الشاملة.",
      "من هذا المنطلق، وتتويجاً للجهود الوطنية الرامية إلى الارتقاء بمعايير السلامة والصحة المهنية، يأتي دور المعهد الوطني للسلامة والصحة المهنية ليكون الذراع التنفيذي والمرجع الوطني الأول في هذا المجال. نحن في المعهد لا نكتفي بتقديم التدريب والاستشارات، بل نسعى لبناء منظومة متكاملة تعمل على تأهيل الكفاءات الوطنية، وتطوير السياسات، وتمكين البحث والابتكار، وفق أعلى المعايير والممارسات العالمية.",
      "إن التزامنا في المعهد يتجاوز حدود الامتثال التنظيمي؛ ليمتد إلى نشر ثقافة وقائية راسخة.",
    ],
  },
  en: {
    pageTitle: "Interim CEO's Message",
    subtitle: "National Institute of Occupational Safety and Health",
    name: "Eng. Majed bin Ibrahim Al-Fuwaiz",
    role: "Interim CEO",
    org: "National Institute of Occupational Safety and Health (NIOSH)",
    paragraphs: [
      "The labor market in the Kingdom of Saudi Arabia is witnessing rapid economic and industrial transformations, in line with the ambitious targets of Saudi Vision 2030. With this unprecedented expansion in business scale and sector diversification, the urgent need to ensure safe, healthy, and sustainable work environments continues to grow — placing human safety at the heart of its priorities as the fundamental driver of comprehensive development.",
      "From this standpoint, and as a culmination of national efforts aimed at elevating occupational safety and health standards, the National Institute of Occupational Safety and Health (NIOSH) assumes its role as the executive arm and the foremost national reference in this field. At the Institute, we do not merely provide training and consultancy; rather, we strive to build an integrated system that works to qualify national competencies, develop policies, and enable research and innovation, in accordance with the highest international standards and practices.",
      "Our commitment at the Institute goes beyond the boundaries of regulatory compliance; it extends to spreading a deeply rooted preventive culture.",
    ],
  },
};

const ceoMessagePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://niosh.sa/ceo-message#webpage",
  url: "https://niosh.sa/ceo-message",
  name: "Interim CEO's Message – NIOSH",
  alternateName: "كلمة الرئيس التنفيذي المكلّف – المعهد الوطني للسلامة والصحة المهنية",
  description:
    "A message from the Interim CEO of the National Institute of Occupational Safety and Health (NIOSH), Eng. Majed bin Ibrahim Al-Fuwaiz.",
  isPartOf: { "@id": "https://niosh.sa/#website" },
  inLanguage: ["ar", "en"],
  publisher: { "@id": "https://niosh.sa/#organization" },
};

export default function CeoMessage() {
  const { lang, setLang } = useLang();
  const isRTL = lang === "ar";
  const t = content[lang];

  return (
    <Layout lang={lang} setLang={setLang}>
      <JsonLd data={ceoMessagePageSchema} />

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
                      src={CEO_PHOTO}
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
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
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
