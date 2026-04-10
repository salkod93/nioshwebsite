/**
 * SAVED CHAIRMAN MESSAGE CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 * This content was removed from the About page on 2026-04-11 and replaced with
 * a "Coming Soon" placeholder. To restore it, copy the `chairmanContent` object
 * back into About.tsx and re-render the <MessageBlock> in section 6.
 *
 * Chairman photo CDN URL:
 *   https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-abuthnain-new_8641f572.jpeg
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const chairmanContent = {
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

/*
 * To restore, in About.tsx:
 * 1. Import: import { chairmanContent } from "./_saved/chairmanMessageContent";
 * 2. Replace the <ComingSoon isRTL={isRTL} /> in section 6 with:
 *    <MessageBlock
 *      photo="https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/photo-abuthnain-new_8641f572.jpeg"
 *      name={chairmanContent[lang].name}
 *      role={chairmanContent[lang].role}
 *      org={chairmanContent[lang].org}
 *      paragraphs={chairmanContent[lang].paragraphs}
 *      isRTL={isRTL}
 *    />
 */
