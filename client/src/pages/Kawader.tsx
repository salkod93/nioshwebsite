import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Upload, FileText, CheckCircle, Loader2, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { COUNTRIES } from "@/lib/countries";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AcademicEntry {
  id: string;
  institution: string;
  address: string;
  degreeTitle: string;
  enrollmentDate: string;
  graduationDate: string;
  educationLevel: string;
  country: string;
  city: string;
}

interface UploadedFile {
  file: File;
  key: string;
}

// ─── Content ─────────────────────────────────────────────────────────────────

const c = {
  en: {
    pageTitle: "Apply to Kawader",
    pageSubtitle: "Kawader Accreditation Application",
    pageDesc: "Please complete all sections carefully. Fields marked with * are required.",
    pathSection: "Certification Path",
    pathLabel: "Select your target certification path *",
    practitioner: "Practitioner",
    professional: "Professional",
    practitionerReqs: [
      "High School Certificate + 5 years of OSH experience",
      "One-year OSH Vocational Diploma or higher",
      "Engineering Specialties: Technical Diploma or Bachelor + 1 year OSH experience",
      "Non-Engineering Specialties: Bachelor + 2 years, or Non-Technical Diploma + 3 years OSH experience",
      "Environmental Safety / Health Specialties: Diploma or Bachelor + 1 year OSH experience",
    ],
    professionalReqs: [
      "PhD / Master's / Bachelor's degree in Occupational Safety and Health",
      "Master's degree from NEBOSH / NEBOSH Diploma or equivalent",
      "Engineering Specialties: Bachelor and above + 1 year, or Technical Diploma + 8 years OSH experience",
      "Non-Engineering Specialties: Bachelor + 2 years, or Non-Technical Diploma + 10 years OSH experience",
      "Environmental Safety / Health Specialties: Bachelor and above + 1 year OSH experience",
      "Occupational Medicine: PhD Holders",
    ],
    requirementsNote: "A specialized team reviews the application and verifies all attachments according to the standards table.",
    requirementsTitle: "Eligibility Requirements",
    requirementsSubtitle: "Criteria for Matching Experience and Qualifications to Enter the Exam",
    importantNotes: [
      "Accreditation by the Saudi Council of Engineers is required (Engineering Specialties).",
      "Qualifications must be accredited by the Saudi Commission for Health Specialties (Health Specialties).",
      "An equivalency certificate from the Ministry of Education is required for qualifications obtained outside the Kingdom.",
      "A certificate of matching will be issued automatically if the applicant meets the required standards through the website.",
      "The matching service is provided free of charge.",
    ],
    qualTable: {
      title: "Basic Qualification Table",
      degreeCol: "Degree / Certificate",
      levelCol: "Equivalent Level",
      reqCol: "Additional Requirements",
      rows: [
        { degree: "PhD / Master's / Bachelor's in Occupational Safety and Health", level: "Professional Level", req: "—" },
        { degree: "Master's from NEBOSH / NEBOSH Diploma or equivalent", level: "Professional Level", req: "—" },
        { degree: "High School Certificate", level: "Practitioner Level", req: "5 years of OSH experience" },
        { degree: "One-year OSH Vocational Diploma or higher", level: "Practitioner Level", req: "—" },
      ],
    },
    specTable: {
      title: "Specialisations Table",
      specCol: "Specialisation",
      practQual: "Practitioner Qualification",
      practExp: "Practitioner OSH Experience",
      profQual: "Professional Qualification",
      profExp: "Professional OSH Experience",
      rows: [
        { spec: "Engineering Specialties", practQual: "Technical Diploma or Bachelor", practExp: "1 Year", profQual: "Bachelor and above", profExp: "1 Year" },
        { spec: "Engineering Specialties", practQual: "—", practExp: "—", profQual: "Technical Diploma", profExp: "8 Years" },
        { spec: "Non-Engineering Specialties", practQual: "Bachelor", practExp: "2 Years", profQual: "Bachelor and above", profExp: "2 Years" },
        { spec: "Non-Engineering Specialties", practQual: "Non-Technical Diploma", practExp: "3 Years", profQual: "Non-Technical Diploma", profExp: "10 Years" },
        { spec: "Environmental Safety", practQual: "Diploma or Bachelor", practExp: "1 Year", profQual: "Bachelor and above", profExp: "1 Year" },
        { spec: "Health Specialties", practQual: "Diploma or Bachelor", practExp: "1 Year", profQual: "Bachelor and above", profExp: "1 Year" },
        { spec: "Occupational Medicine", practQual: "—", practExp: "—", profQual: "PhD Holders", profExp: "—" },
      ],
    },
    personalSection: "Personal Information",
    fullNameAr: "Full Name in Arabic *",
    fullNameEn: "Full Name in English *",
    dob: "Date of Birth *",
    nationalId: "National ID / Iqama Number *",
    nationality: "Nationality *",
    phone: "Phone Number *",
    email: "Email Address *",
    experience: "Total Years of Experience *",
    academicSection: "Academic Information",
    academicNote: "You may add more than one qualification.",
    institution: "Name of Educational Institution *",
    institutionAddress: "Address of Educational Institution *",
    degreeTitle: "Degree Title *",
    enrollmentDate: "Enrollment Date *",
    graduationDate: "Graduation Date *",
    educationLevel: "Education Level *",
    country: "Country *",
    city: "City *",
    addQualification: "Add Another Qualification",
    removeQualification: "Remove",
    oshSection: "OSH Professional Certificates & Courses",
    oshLabel: "List your OSH professional certificates and courses (one per line) *",
    oshPlaceholder: "e.g.\nNEBOSH IGC\nQHSE Professional Master\nIOSH Managing Safely\nOHSAS 18001 IRCA",
    docsSection: "Required Documents",
    docsNote: "Please upload all required documents. Accepted formats: PDF, JPG, PNG (max 10MB each).",
    docsMergeNote: "If you have multiple documents of the same type, please merge them into one file before uploading.",
    docs: {
      nationalId: "National ID *",
      passport: "Passport *",
      academicDegree: "Certified Copy of Academic Degree *",
      transcript: "Academic Transcript *",
      equivalency: "Certificate Equivalency Document *",
      employmentLetter: "Employment Verification Letter (for employees) *",
      jobDescription: "Current Job Description *",
      gosi: "GOSI Employment and Wage Statement *",
      cv: "Curriculum Vitae (CV) *",
      oshCertificates: "OSH Professional Certificates & Courses *",
    },
    commLangSection: "Preferred Communication Language",
    commLangLabel: "What language would you like to be communicated with? *",
    commLangArabic: "Arabic",
    commLangEnglish: "English",
    errors_commLang: "Please select a preferred communication language",
    submit: "Submit Application",
    submitting: "Submitting...",
    successTitle: "Application Submitted!",
    successMsg: "Your Kawader accreditation application has been received. Our team will review it and contact you shortly.",
    backHome: "Back to Home",
    errors: {
      required: "This field is required",
      email: "Please enter a valid email address",
      fileRequired: "Please upload this document",
      fileSize: "File must be less than 10MB",
      fileType: "Only PDF, JPG, and PNG files are accepted",
      pathRequired: "Please select a certification path",
    },
    educationLevels: ["Diploma", "Bachelor's", "Master's", "PhD", "Other"],
  },
  ar: {
    pageTitle: "التقديم على كوادر",
    pageSubtitle: "طلب اعتماد كوادر",
    pageDesc: "يرجى تعبئة جميع الأقسام بعناية. الحقول المعلمة بـ * مطلوبة.",
    pathSection: "مسار الاعتماد",
    pathLabel: "اختر مسار الاعتماد المستهدف *",
    practitioner: "ممارس",
    professional: "محترف",
    practitionerReqs: [
      "شهادة الثانوية العامة + 5 سنوات خبرة في السلامة والصحة المهنية",
      "دبلوم مهني في السلامة والصحة المهنية لمدة سنة أو أعلى",
      "التخصصات الهندسية: دبلوم تقني أو بكالوريوس + سنة خبرة في السلامة والصحة المهنية",
      "التخصصات غير الهندسية: بكالوريوس + سنتان، أو دبلوم غير تقني + 3 سنوات خبرة",
      "السلامة البيئية / التخصصات الصحية: دبلوم أو بكالوريوس + سنة خبرة",
    ],
    professionalReqs: [
      "درجة الدكتوراه / الماجستير / البكالوريوس في السلامة والصحة المهنية",
      "ماجستير من NEBOSH / دبلوم NEBOSH أو ما يعادله",
      "التخصصات الهندسية: بكالوريوس فأعلى + سنة، أو دبلوم تقني + 8 سنوات خبرة",
      "التخصصات غير الهندسية: بكالوريوس + سنتان، أو دبلوم غير تقني + 10 سنوات خبرة",
      "السلامة البيئية / التخصصات الصحية: بكالوريوس فأعلى + سنة خبرة",
      "الطب المهني: حاملو الدكتوراه",
    ],
    requirementsNote: "يقوم فريق من المختصين بمراجعة الطلب والتدقيق على كافة المرفقات وذلك وفق جدول المعايير الخاصة بمطابقة الخبرات والمؤهلات لدخول الاختبار في مجال السلامة والصحة المهنية.",
    requirementsTitle: "متطلبات الأهلية",
    requirementsSubtitle: "معايير مطابقة الخبرات والمؤهلات لدخول الاختبار",
    importantNotes: [
      "يشترط الاعتماد من الهيئة السعودية للمهندسين (التخصصات الهندسية).",
      "يشترط اعتماد المؤهلات من هيئة التخصصات الصحية (التخصصات الصحية).",
      "يشترط الحصول على شهادة معادلة من وزارة التعليم للمؤهلات التي تم الحصول عليها من خارج المملكة.",
      "يتم إصدار شهادة المطابقة آلياً عند تحقيق المتقدم للمتطلبات المطابقة من خلال الموقع.",
      "خدمة المطابقة تقدم بشكل مجاني.",
    ],
    qualTable: {
      title: "جدول المؤهلات الأساسية",
      degreeCol: "الدرجة / الشهادة",
      levelCol: "المستوى المكافئ",
      reqCol: "المتطلبات الإضافية",
      rows: [
        { degree: "درجة الدكتوراه / الماجستير / البكالوريوس في السلامة والصحة المهنية", level: "المستوى المحترف", req: "—" },
        { degree: "ماجستير من NEBOSH / دبلوم NEBOSH أو ما يعادله", level: "المستوى المحترف", req: "—" },
        { degree: "الشهادة الثانوية", level: "المستوى الممارس", req: "خبرة 5 سنوات في السلامة والصحة المهنية" },
        { degree: "دبلوم سلامة وصحة مهنية سنة دراسية فأكثر", level: "المستوى الممارس", req: "—" },
      ],
    },
    specTable: {
      title: "جدول التخصصات",
      specCol: "التخصص",
      practQual: "مؤهل الممارس",
      practExp: "خبرة الممارس في السلامة والصحة المهنية",
      profQual: "مؤهل المحترف",
      profExp: "خبرة المحترف في السلامة والصحة المهنية",
      rows: [
        { spec: "التخصصات الهندسية", practQual: "دبلوم تقني أو بكالوريوس", practExp: "سنة", profQual: "بكالوريوس فوق", profExp: "سنة" },
        { spec: "التخصصات الهندسية", practQual: "—", practExp: "—", profQual: "دبلوم تقني", profExp: "8 سنوات" },
        { spec: "التخصصات غير الهندسية", practQual: "بكالوريوس", practExp: "سنتان", profQual: "بكالوريوس فوق", profExp: "سنتان" },
        { spec: "التخصصات غير الهندسية", practQual: "دبلوم غير تقني", practExp: "3 سنوات", profQual: "دبلوم غير تقني", profExp: "10 سنوات" },
        { spec: "السلامة البيئية", practQual: "دبلوم أو بكالوريوس", practExp: "سنة", profQual: "بكالوريوس فوق", profExp: "سنة" },
        { spec: "التخصصات الصحية", practQual: "دبلوم أو بكالوريوس", practExp: "سنة", profQual: "بكالوريوس فوق", profExp: "سنة" },
        { spec: "الطب المهني", practQual: "—", practExp: "—", profQual: "دكتوراه", profExp: "—" },
      ],
    },
    personalSection: "المعلومات الشخصية",
    fullNameAr: "الاسم الكامل بالعربية *",
    fullNameEn: "الاسم الكامل بالإنجليزية *",
    dob: "تاريخ الميلاد *",
    nationalId: "رقم الهوية الوطنية / الإقامة *",
    nationality: "الجنسية *",
    phone: "رقم الجوال *",
    email: "البريد الإلكتروني *",
    experience: "إجمالي سنوات الخبرة *",
    academicSection: "المعلومات الأكاديمية",
    academicNote: "يمكنك إضافة أكثر من مؤهل علمي.",
    institution: "اسم المؤسسة التعليمية *",
    institutionAddress: "عنوان المؤسسة التعليمية *",
    degreeTitle: "مسمى الدرجة العلمية *",
    enrollmentDate: "تاريخ الالتحاق *",
    graduationDate: "تاريخ التخرج *",
    educationLevel: "المستوى التعليمي *",
    country: "الدولة *",
    city: "المدينة *",
    addQualification: "إضافة مؤهل آخر",
    removeQualification: "حذف",
    oshSection: "شهادات ودورات السلامة والصحة المهنية",
    oshLabel: "اذكر شهاداتك ودوراتك المهنية في السلامة والصحة المهنية (واحدة في كل سطر) *",
    oshPlaceholder: "مثال:\nNEBOSH IGC\nQHSE Professional Master\nIOSH Managing Safely\nOHSAS 18001 IRCA",
    docsSection: "المستندات المطلوبة",
    docsNote: "يرجى رفع جميع المستندات المطلوبة. الصيغ المقبولة: PDF، JPG، PNG (الحد الأقصى 10MB لكل ملف).",
    docsMergeNote: "إذا كان لديك أكثر من مستند من نفس النوع، يرجى دمجها في ملف واحد قبل الرفع.",
    docs: {
      nationalId: "الهوية الوطنية *",
      passport: "جواز السفر *",
      academicDegree: "نسخة معتمدة من الشهادة الأكاديمية *",
      transcript: "كشف الدرجات الأكاديمية *",
      equivalency: "وثيقة معادلة الشهادة *",
      employmentLetter: "خطاب تحقق من العمل (للموظفين) *",
      jobDescription: "وصف الوظيفة الحالية *",
      gosi: "بيان التوظيف والأجر من التأمينات الاجتماعية *",
      cv: "السيرة الذاتية *",
      oshCertificates: "شهادات ودورات السلامة والصحة المهنية *",
    },
    commLangSection: "لغة التواصل المفضلة",
    commLangLabel: "بأي لغة تفضل التواصل معك؟ *",
    commLangArabic: "عربي",
    commLangEnglish: "إنجليزي",
    errors_commLang: "يرجى اختيار لغة التواصل المفضلة",
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال...",
    successTitle: "تم إرسال الطلب!",
    successMsg: "تم استلام طلب اعتماد كوادر الخاص بك. سيقوم فريقنا بمراجعته والتواصل معك قريباً.",
    backHome: "العودة إلى الرئيسية",
    errors: {
      required: "هذا الحقل مطلوب",
      email: "يرجى إدخال بريد إلكتروني صحيح",
      fileRequired: "يرجى رفع هذا المستند",
      fileSize: "يجب أن يكون حجم الملف أقل من 10MB",
      fileType: "يُقبل فقط ملفات PDF و JPG و PNG",
      pathRequired: "يرجى اختيار مسار الاعتماد",
    },
    educationLevels: ["دبلوم", "بكالوريوس", "ماجستير", "دكتوراه", "أخرى"],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ACCEPTED_DOC_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function newAcademic(): AcademicEntry {
  return { id: crypto.randomUUID(), institution: "", address: "", degreeTitle: "", enrollmentDate: "", graduationDate: "", educationLevel: "", country: "", city: "" };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InputField({ label, value, onChange, type = "text", placeholder, error }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; error?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn("w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all", error ? "border-red-400" : "border-border")}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options, error }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; error?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-foreground">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={cn("w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all", error ? "border-red-400" : "border-border")}
      >
        <option value="">—</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function CountrySelectField({ label, value, onChange, error, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const filtered = COUNTRIES.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: "fixed",
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  }, []);

  const handleOpen = () => {
    updatePosition();
    setOpen(o => !o);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!open) return;
    const handler = () => updatePosition();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, [open, updatePosition]);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-foreground">{label}</label>
      <div
        ref={triggerRef}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-background text-foreground cursor-pointer flex items-center justify-between transition-all",
          error ? "border-red-400" : "border-border",
          open ? "ring-2 ring-primary/50" : ""
        )}
        onClick={handleOpen}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || placeholder || "—"}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open ? "rotate-180" : "")} />
      </div>
      {open && createPortal(
        <div
          style={dropdownStyle}
          className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
          onMouseDown={e => e.stopPropagation()}
        >
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-muted-foreground">No results</div>
            ) : (
              filtered.map(c => (
                <div
                  key={c}
                  className={cn(
                    "px-4 py-2.5 text-sm cursor-pointer hover:bg-primary/10 transition-colors",
                    value === c ? "bg-primary/10 font-semibold text-primary" : "text-foreground"
                  )}
                  onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
                >
                  {c}
                </div>
              ))
            )}
          </div>
        </div>,
        document.body
      )}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function FileUploadField({ label, file, onFile, error }: {
  label: string; file: File | null; onFile: (f: File) => void; error?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handle = (f: File) => {
    if (!ACCEPTED_DOC_TYPES.includes(f.type)) return;
    if (f.size > MAX_FILE_SIZE) return;
    onFile(f);
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-foreground">{label}</label>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
        onClick={() => ref.current?.click()}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition-all",
          dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          file ? "bg-green-50 border-green-400" : "",
          error ? "border-red-400" : ""
        )}
      >
        <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handle(f); }} />
        {file ? (
          <><FileText className="h-5 w-5 text-green-600 shrink-0" /><span className="text-sm text-green-700 truncate">{file.name}</span></>
        ) : (
          <><Upload className="h-5 w-5 text-muted-foreground shrink-0" /><span className="text-sm text-muted-foreground">Click or drag to upload</span></>
        )}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
      <div className="bg-primary/5 border-b border-border/30 px-6 py-4">
        <h3 className="text-lg font-bold text-primary">{title}</h3>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Kawader() {
  const { lang, setLang } = useLang();
  const t = lang === 'en' ? c.en : c.ar;
  const isRTL = lang === 'ar';

  // Preferred communication language
  const [commLang, setCommLang] = useState<"Arabic" | "English" | "">("")

  // Certification path
  const [path, setPath] = useState<"Practitioner" | "Professional" | "">("");

  // Personal info
  const [fullNameAr, setFullNameAr] = useState("");
  const [fullNameEn, setFullNameEn] = useState("");
  const [dob, setDob] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");

  // Academic info (multi-entry)
  const [academics, setAcademics] = useState<AcademicEntry[]>([newAcademic()]);

  // OSH certs
  const [oshCerts, setOshCerts] = useState("");

  // Documents
  const [docs, setDocs] = useState<Record<string, File | null>>({
    nationalId: null, passport: null, academicDegree: null, transcript: null,
    equivalency: null, employmentLetter: null, jobDescription: null, gosi: null,
    cv: null, oshCertificates: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const [refNumber, setRefNumber] = useState("");

  const submitMutation = trpc.kawader.submitAccreditation.useMutation({
    onSuccess: (data) => { setRefNumber(data.refNumber); setSubmitted(true); },
    onError: (err) => toast.error(err.message || "Submission failed. Please try again."),
  });

  const updateAcademic = (id: string, field: keyof AcademicEntry, value: string) => {
    setAcademics(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!commLang) e.commLang = t.errors_commLang;
    if (!path) e.path = t.errors.pathRequired;
    if (!fullNameAr.trim()) e.fullNameAr = t.errors.required;
    if (!fullNameEn.trim()) e.fullNameEn = t.errors.required;
    if (!dob) e.dob = t.errors.required;
    if (!nationalId.trim()) e.nationalId = t.errors.required;
    if (!nationality.trim()) e.nationality = t.errors.required;
    if (!phone.trim()) e.phone = t.errors.required;
    if (!email.trim()) e.email = t.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = t.errors.email;
    if (!experience.trim()) e.experience = t.errors.required;
    academics.forEach((a, i) => {
      if (!a.institution.trim()) e[`acad_${i}_institution`] = t.errors.required;
      if (!a.address.trim()) e[`acad_${i}_address`] = t.errors.required;
      if (!a.degreeTitle.trim()) e[`acad_${i}_degreeTitle`] = t.errors.required;
      if (!a.educationLevel) e[`acad_${i}_educationLevel`] = t.errors.required;
      if (!a.enrollmentDate) e[`acad_${i}_enrollmentDate`] = t.errors.required;
      if (!a.graduationDate) e[`acad_${i}_graduationDate`] = t.errors.required;
      if (!a.country.trim()) e[`acad_${i}_country`] = t.errors.required;
      if (!a.city.trim()) e[`acad_${i}_city`] = t.errors.required;
    });
    if (!oshCerts.trim()) e.oshCerts = t.errors.required;
    Object.keys(docs).forEach(k => {
      if (!docs[k]) e[`doc_${k}`] = t.errors.fileRequired;
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { toast.error(isRTL ? "يرجى تعبئة جميع الحقول المطلوبة" : "Please fill in all required fields."); return; }

    // Convert all docs to base64
    type DocPayload = { base64: string; fileName: string; mimeType: string };
    const uploadedDocs: {
      nationalId: DocPayload; passport: DocPayload; academicDegree: DocPayload;
      transcript: DocPayload; equivalency: DocPayload; employmentLetter: DocPayload;
      jobDescription: DocPayload; gosi: DocPayload; cv: DocPayload; oshCertificates: DocPayload;
    } = {} as any;
    for (const [key, file] of Object.entries(docs)) {
      if (file) {
        (uploadedDocs as any)[key] = { base64: await fileToBase64(file), fileName: file.name, mimeType: file.type };
      }
    }

    submitMutation.mutate({
      certificationPath: path as "Practitioner" | "Professional",
      commLang: commLang as "Arabic" | "English",
      fullNameAr, fullNameEn, dob, nationalId, nationality, phone, email, experience,
      academics: academics.map(({ id: _id, ...rest }) => rest),
      oshCerts,
      documents: uploadedDocs,
    });
  };

  if (submitted) {
    return (
      <Layout lang={lang} setLang={setLang}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-primary mb-4">{t.successTitle}</h2>
            <p className="text-muted-foreground text-lg mb-6">{t.successMsg}</p>
            {refNumber && (
              <div className="bg-primary/10 border border-primary/30 rounded-xl px-6 py-4 mb-8 inline-block">
                <p className="text-xs text-muted-foreground mb-1">{isRTL ? "رقم الطلب" : "Application Reference"}</p>
                <p className="text-2xl font-extrabold text-primary tracking-widest">{refNumber}</p>
                <p className="text-xs text-muted-foreground mt-1">{isRTL ? "احتفظ بهذا الرقم للمتابعة" : "Keep this number for follow-up"}</p>
              </div>
            )}
            <Button size="lg" onClick={() => window.location.href = '/'}>{t.backHome}</Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout lang={lang} setLang={setLang}>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/texture-pattern.png)', backgroundRepeat: 'repeat' }} />
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{t.pageTitle}</h1>
          <h2 className="text-xl text-white/80">{t.pageSubtitle}</h2>
          <p className="text-white/70 mt-2 text-sm">{t.pageDesc}</p>
        </div>
      </section>

      {/* Requirements Reference Section */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-primary mb-1">{t.requirementsTitle}</h2>
            <p className="text-muted-foreground text-sm">{t.requirementsSubtitle}</p>
          </div>

          {/* Basic Qualification Table */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-3">{t.qualTable.title}</h3>
            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 text-start font-semibold">{t.qualTable.degreeCol}</th>
                    <th className="px-4 py-3 text-start font-semibold">{t.qualTable.levelCol}</th>
                    <th className="px-4 py-3 text-start font-semibold">{t.qualTable.reqCol}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.qualTable.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/40"}>
                      <td className="px-4 py-3 font-medium">{row.degree}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "inline-block px-2 py-0.5 rounded-full text-xs font-bold",
                          row.level.includes("Professional") || row.level.includes("المحترف") ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                        )}>{row.level}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Specialisations Table */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-3">{t.specTable.title}</h3>
            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 text-start font-semibold">{t.specTable.specCol}</th>
                    <th className="px-4 py-3 text-start font-semibold">{t.specTable.practQual}</th>
                    <th className="px-4 py-3 text-start font-semibold">{t.specTable.practExp}</th>
                    <th className="px-4 py-3 text-start font-semibold">{t.specTable.profQual}</th>
                    <th className="px-4 py-3 text-start font-semibold">{t.specTable.profExp}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.specTable.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/40"}>
                      <td className="px-4 py-3 font-medium">{row.spec}</td>
                      <td className="px-4 py-3">{row.practQual}</td>
                      <td className="px-4 py-3 text-center">{row.practExp}</td>
                      <td className="px-4 py-3">{row.profQual}</td>
                      <td className="px-4 py-3 text-center">{row.profExp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="text-base font-bold text-amber-800 mb-3 flex items-center gap-2">
              <span className="text-amber-500">&#9888;</span>
              {isRTL ? "ملاحظات مهمة" : "Important Notes"}
            </h3>
            <ul className="space-y-2">
              {t.importantNotes.map((note, i) => (
                <li key={i} className="flex gap-2 text-sm text-amber-900">
                  <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ── 0. Preferred Communication Language ── */}
            <SectionCard title={t.commLangSection}>
              <p className="text-sm font-semibold text-foreground mb-3">{t.commLangLabel}</p>
              {errors.commLang && <p className="text-red-500 text-xs mb-2">{errors.commLang}</p>}
              <div className="flex flex-wrap gap-4">
                {(["Arabic", "English"] as const).map(lang => {
                  const label = lang === "Arabic" ? t.commLangArabic : t.commLangEnglish;
                  return (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => { setCommLang(lang); setErrors(prev => ({ ...prev, commLang: "" })); }}
                      className={cn(
                        "flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all cursor-pointer min-w-[140px]",
                        commLang === lang ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", commLang === lang ? "border-primary" : "border-muted-foreground")}>
                        {commLang === lang && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <span className="font-bold text-foreground text-base">{label}</span>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {/* ── 1. Certification Path ── */}
            <SectionCard title={t.pathSection}>
              <p className="text-sm font-semibold text-foreground mb-3">{t.pathLabel}</p>
              {errors.path && <p className="text-red-500 text-xs mb-2">{errors.path}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["Practitioner", "Professional"] as const).map(p => {
                  const label = p === "Practitioner" ? t.practitioner : t.professional;
                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => { setPath(p); setErrors(prev => ({ ...prev, path: "" })); }}
                      className={cn(
                        "flex items-center gap-3 p-5 rounded-xl border-2 transition-all cursor-pointer",
                        path === p ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", path === p ? "border-primary" : "border-muted-foreground")}>
                        {path === p && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <span className="font-bold text-foreground text-base">{label}</span>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {/* ── 2. Personal Information ── */}
            <SectionCard title={t.personalSection}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label={t.fullNameAr} value={fullNameAr} onChange={v => { setFullNameAr(v); setErrors(p => ({ ...p, fullNameAr: "" })); }} error={errors.fullNameAr} />
                <InputField label={t.fullNameEn} value={fullNameEn} onChange={v => { setFullNameEn(v); setErrors(p => ({ ...p, fullNameEn: "" })); }} error={errors.fullNameEn} />
                <InputField label={t.dob} value={dob} onChange={v => { setDob(v); setErrors(p => ({ ...p, dob: "" })); }} type="date" error={errors.dob} />
                <InputField label={t.nationalId} value={nationalId} onChange={v => { setNationalId(v); setErrors(p => ({ ...p, nationalId: "" })); }} error={errors.nationalId} />
                <CountrySelectField label={t.nationality} value={nationality} onChange={v => { setNationality(v); setErrors(p => ({ ...p, nationality: "" })); }} error={errors.nationality} placeholder="Select nationality" />
                <InputField label={t.phone} value={phone} onChange={v => { setPhone(v); setErrors(p => ({ ...p, phone: "" })); }} type="tel" error={errors.phone} />
                <InputField label={t.email} value={email} onChange={v => { setEmail(v); setErrors(p => ({ ...p, email: "" })); }} type="email" error={errors.email} />
                <InputField label={t.experience} value={experience} onChange={v => { setExperience(v); setErrors(p => ({ ...p, experience: "" })); }} type="number" error={errors.experience} />
              </div>
            </SectionCard>

            {/* ── 3. Academic Information ── */}
            <SectionCard title={t.academicSection}>
              <p className="text-sm text-muted-foreground">{t.academicNote}</p>
              <AnimatePresence>
                {academics.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border border-border/50 rounded-xl p-4 space-y-4 bg-background/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">#{i + 1}</span>
                      {academics.length > 1 && (
                        <button type="button" onClick={() => setAcademics(prev => prev.filter(x => x.id !== a.id))} className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer">
                          <Trash2 className="h-3.5 w-3.5" />{t.removeQualification}
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label={t.institution} value={a.institution} onChange={v => updateAcademic(a.id, "institution", v)} error={errors[`acad_${i}_institution`]} />
                      <InputField label={t.institutionAddress} value={a.address} onChange={v => { updateAcademic(a.id, "address", v); setErrors(p => ({ ...p, [`acad_${i}_address`]: "" })); }} error={errors[`acad_${i}_address`]} />
                      <InputField label={t.degreeTitle} value={a.degreeTitle} onChange={v => updateAcademic(a.id, "degreeTitle", v)} error={errors[`acad_${i}_degreeTitle`]} />
                      <SelectField label={t.educationLevel} value={a.educationLevel} onChange={v => updateAcademic(a.id, "educationLevel", v)} options={t.educationLevels} error={errors[`acad_${i}_educationLevel`]} />
                      <InputField label={t.enrollmentDate} value={a.enrollmentDate} onChange={v => { updateAcademic(a.id, "enrollmentDate", v); setErrors(p => ({ ...p, [`acad_${i}_enrollmentDate`]: "" })); }} type="date" error={errors[`acad_${i}_enrollmentDate`]} />
                      <InputField label={t.graduationDate} value={a.graduationDate} onChange={v => { updateAcademic(a.id, "graduationDate", v); setErrors(p => ({ ...p, [`acad_${i}_graduationDate`]: "" })); }} type="date" error={errors[`acad_${i}_graduationDate`]} />
                      <CountrySelectField label={t.country} value={a.country} onChange={v => { updateAcademic(a.id, "country", v); setErrors(p => ({ ...p, [`acad_${i}_country`]: "" })); }} error={errors[`acad_${i}_country`]} placeholder="Select country" />
                      <InputField label={t.city} value={a.city} onChange={v => updateAcademic(a.id, "city", v)} error={errors[`acad_${i}_city`]} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button type="button" variant="outline" onClick={() => setAcademics(prev => [...prev, newAcademic()])} className="gap-2 cursor-pointer">
                <Plus className="h-4 w-4" />{t.addQualification}
              </Button>
            </SectionCard>

            {/* ── 4. OSH Certificates ── */}
            <SectionCard title={t.oshSection}>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-foreground">{t.oshLabel}</label>
                <textarea
                  value={oshCerts}
                  onChange={e => { setOshCerts(e.target.value); setErrors(p => ({ ...p, oshCerts: "" })); }}
                  placeholder={t.oshPlaceholder}
                  rows={4}
                  className={cn("w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none", errors.oshCerts ? "border-red-400" : "border-border")}
                />
                {errors.oshCerts && <p className="text-red-500 text-xs">{errors.oshCerts}</p>}
              </div>
            </SectionCard>

            {/* ── 5. Required Documents ── */}
            <SectionCard title={t.docsSection}>
              <p className="text-sm text-muted-foreground">{t.docsNote}</p>
              <div className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
                <span className="mt-0.5 shrink-0 text-amber-500">⚠</span>
                <span>{t.docsMergeNote}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(Object.keys(t.docs) as (keyof typeof t.docs)[]).map(key => (
                  <FileUploadField
                    key={key}
                    label={t.docs[key]}
                    file={docs[key]}
                    onFile={f => { setDocs(prev => ({ ...prev, [key]: f })); setErrors(prev => ({ ...prev, [`doc_${key}`]: "" })); }}
                    error={errors[`doc_${key}`]}
                  />
                ))}
              </div>
            </SectionCard>

            {/* ── Submit ── */}
            <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-xl" disabled={submitMutation.isPending}>
              {submitMutation.isPending ? (<><Loader2 className="h-5 w-5 animate-spin mr-2" />{t.submitting}</>) : t.submit}
            </Button>

          </form>
        </div>
      </section>
    </Layout>
  );
}
