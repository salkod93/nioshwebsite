import { useState, useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Upload, FileText, CheckCircle, Loader2, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
      "Bachelor's degree in Occupational Safety & Health or a related field",
      "Minimum 2 years of relevant work experience",
      "Valid national ID or Iqama",
    ],
    professionalReqs: [
      "Bachelor's degree in Occupational Safety & Health or a related field",
      "Minimum 5 years of relevant work experience",
      "Recognized OSH professional certification (e.g., NEBOSH, CSP, CMIOSH)",
      "Valid national ID or Iqama",
    ],
    personalSection: "Personal Information",
    fullNameAr: "Full Name in Arabic *",
    fullNameEn: "Full Name in English *",
    dob: "Date of Birth *",
    nationalId: "National ID / Iqama Number *",
    nationality: "Nationality *",
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
    oshLabel: "List your OSH professional certificates and courses (one per line)",
    oshPlaceholder: "e.g. NEBOSH IGC – 2021\nNFPA Fire Safety – 2020",
    docsSection: "Required Documents",
    docsNote: "Please upload all required documents. Accepted formats: PDF, JPG, PNG (max 10MB each).",
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
      "درجة البكالوريوس في السلامة والصحة المهنية أو مجال ذي صلة",
      "خبرة عمل ذات صلة لا تقل عن سنتين",
      "هوية وطنية أو إقامة سارية المفعول",
    ],
    professionalReqs: [
      "درجة البكالوريوس في السلامة والصحة المهنية أو مجال ذي صلة",
      "خبرة عمل ذات صلة لا تقل عن 5 سنوات",
      "شهادة مهنية معترف بها في السلامة والصحة المهنية (مثل NEBOSH أو CSP أو CMIOSH)",
      "هوية وطنية أو إقامة سارية المفعول",
    ],
    personalSection: "المعلومات الشخصية",
    fullNameAr: "الاسم الكامل بالعربية *",
    fullNameEn: "الاسم الكامل بالإنجليزية *",
    dob: "تاريخ الميلاد *",
    nationalId: "رقم الهوية الوطنية / الإقامة *",
    nationality: "الجنسية *",
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
    oshLabel: "اذكر شهاداتك ودوراتك المهنية في السلامة والصحة المهنية (واحدة في كل سطر)",
    oshPlaceholder: "مثال: NEBOSH IGC – 2021\nNFPA Fire Safety – 2020",
    docsSection: "المستندات المطلوبة",
    docsNote: "يرجى رفع جميع المستندات المطلوبة. الصيغ المقبولة: PDF، JPG، PNG (الحد الأقصى 10MB لكل ملف).",
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

  // Certification path
  const [path, setPath] = useState<"Practitioner" | "Professional" | "">("");

  // Personal info
  const [fullNameAr, setFullNameAr] = useState("");
  const [fullNameEn, setFullNameEn] = useState("");
  const [dob, setDob] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [nationality, setNationality] = useState("");
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

  const submitMutation = trpc.kawader.submitAccreditation.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err) => toast.error(err.message || "Submission failed. Please try again."),
  });

  const updateAcademic = (id: string, field: keyof AcademicEntry, value: string) => {
    setAcademics(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!path) e.path = t.errors.pathRequired;
    if (!fullNameAr.trim()) e.fullNameAr = t.errors.required;
    if (!fullNameEn.trim()) e.fullNameEn = t.errors.required;
    if (!dob) e.dob = t.errors.required;
    if (!nationalId.trim()) e.nationalId = t.errors.required;
    if (!nationality.trim()) e.nationality = t.errors.required;
    if (!experience.trim()) e.experience = t.errors.required;
    academics.forEach((a, i) => {
      if (!a.institution.trim()) e[`acad_${i}_institution`] = t.errors.required;
      if (!a.degreeTitle.trim()) e[`acad_${i}_degreeTitle`] = t.errors.required;
      if (!a.educationLevel) e[`acad_${i}_educationLevel`] = t.errors.required;
      if (!a.country.trim()) e[`acad_${i}_country`] = t.errors.required;
      if (!a.city.trim()) e[`acad_${i}_city`] = t.errors.required;
    });
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
      fullNameAr, fullNameEn, dob, nationalId, nationality, experience,
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
            <p className="text-muted-foreground text-lg mb-8">{t.successMsg}</p>
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

      {/* Form */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ── 1. Certification Path ── */}
            <SectionCard title={t.pathSection}>
              <p className="text-sm font-semibold text-foreground mb-3">{t.pathLabel}</p>
              {errors.path && <p className="text-red-500 text-xs mb-2">{errors.path}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["Practitioner", "Professional"] as const).map(p => {
                  const label = p === "Practitioner" ? t.practitioner : t.professional;
                  const reqs = p === "Practitioner" ? t.practitionerReqs : t.professionalReqs;
                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => { setPath(p); setErrors(prev => ({ ...prev, path: "" })); }}
                      className={cn(
                        "text-left p-5 rounded-xl border-2 transition-all cursor-pointer",
                        path === p ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", path === p ? "border-primary" : "border-muted-foreground")}>
                          {path === p && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                        <span className="font-bold text-foreground">{label}</span>
                      </div>
                      <ul className="space-y-1">
                        {reqs.map((r, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                            <span className="text-primary mt-0.5">•</span>{r}
                          </li>
                        ))}
                      </ul>
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
                <InputField label={t.nationality} value={nationality} onChange={v => { setNationality(v); setErrors(p => ({ ...p, nationality: "" })); }} error={errors.nationality} />
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
                      <InputField label={t.institutionAddress} value={a.address} onChange={v => updateAcademic(a.id, "address", v)} />
                      <InputField label={t.degreeTitle} value={a.degreeTitle} onChange={v => updateAcademic(a.id, "degreeTitle", v)} error={errors[`acad_${i}_degreeTitle`]} />
                      <SelectField label={t.educationLevel} value={a.educationLevel} onChange={v => updateAcademic(a.id, "educationLevel", v)} options={t.educationLevels} error={errors[`acad_${i}_educationLevel`]} />
                      <InputField label={t.enrollmentDate} value={a.enrollmentDate} onChange={v => updateAcademic(a.id, "enrollmentDate", v)} type="date" />
                      <InputField label={t.graduationDate} value={a.graduationDate} onChange={v => updateAcademic(a.id, "graduationDate", v)} type="date" />
                      <InputField label={t.country} value={a.country} onChange={v => updateAcademic(a.id, "country", v)} error={errors[`acad_${i}_country`]} />
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
                  onChange={e => setOshCerts(e.target.value)}
                  placeholder={t.oshPlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
            </SectionCard>

            {/* ── 5. Required Documents ── */}
            <SectionCard title={t.docsSection}>
              <p className="text-sm text-muted-foreground">{t.docsNote}</p>
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
