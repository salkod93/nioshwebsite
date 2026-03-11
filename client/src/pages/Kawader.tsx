import { useState, useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";
import type { Language } from "@/lib/content";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Upload, FileText, CheckCircle, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const kawaderContent = {
  en: {
    title: "Kawader Accreditation",
    subtitle: "Apply for Kawader Accreditation",
    description: "Fill in your details and upload your CV to submit your Kawader accreditation request. Our team will review your application and get back to you.",
    form: {
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "Enter your email address",
      cv: "Upload CV",
      cvHint: "Accepted formats: PDF, DOC, DOCX (max 10MB)",
      cvDragText: "Drag and drop your CV here, or click to browse",
      submit: "Submit Application",
      submitting: "Submitting...",
    },
    success: {
      title: "Application Submitted!",
      message: "Your Kawader accreditation request has been received. We will review your application and contact you shortly.",
      back: "Back to Home",
    },
    errors: {
      required: "This field is required",
      email: "Please enter a valid email address",
      fileRequired: "Please upload your CV",
      fileSize: "File size must be less than 10MB",
      fileType: "Only PDF, DOC, and DOCX files are accepted",
    }
  },
  ar: {
    title: "كوادر",
    subtitle: "التقدم للاعتماد في كوادر",
    description: "أدخل بياناتك وارفع سيرتك الذاتية لتقديم طلب اعتماد كوادر. سيقوم فريقنا بمراجعة طلبك والتواصل معك.",
    form: {
      fullName: "الاسم الكامل",
      fullNamePlaceholder: "أدخل اسمك الكامل",
      email: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      cv: "رفع السيرة الذاتية",
      cvHint: "الصيغ المقبولة: PDF، DOC، DOCX (الحد الأقصى 10MB)",
      cvDragText: "اسحب وأفلت سيرتك الذاتية هنا، أو انقر للتصفح",
      submit: "إرسال الطلب",
      submitting: "جارٍ الإرسال...",
    },
    success: {
      title: "تم إرسال الطلب!",
      message: "تم استلام طلب اعتماد كوادر الخاص بك. سنقوم بمراجعة طلبك والتواصل معك قريباً.",
      back: "العودة إلى الرئيسية",
    },
    errors: {
      required: "هذا الحقل مطلوب",
      email: "يرجى إدخال بريد إلكتروني صحيح",
      fileRequired: "يرجى رفع سيرتك الذاتية",
      fileSize: "يجب أن يكون حجم الملف أقل من 10MB",
      fileType: "يُقبل فقط ملفات PDF و DOC و DOCX",
    }
  }
};

const ACCEPTED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Kawader() {
  const { lang, setLang } = useLang();
  const t = kawaderContent[lang as Language] ?? kawaderContent['ar'];
  const isRTL = lang === 'ar';

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; cv?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitMutation = trpc.kawader.submitAccreditation.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!fullName.trim()) newErrors.fullName = t.errors.required;
    if (!email.trim()) {
      newErrors.email = t.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t.errors.email;
    }
    if (!cvFile) {
      newErrors.cv = t.errors.fileRequired;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors(prev => ({ ...prev, cv: t.errors.fileType }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({ ...prev, cv: t.errors.fileSize }));
      return;
    }
    setCvFile(file);
    setErrors(prev => ({ ...prev, cv: undefined }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !cvFile) return;

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      submitMutation.mutate({
        fullName: fullName.trim(),
        email: email.trim(),
        cvFileName: cvFile.name,
        cvFileBase64: base64,
        cvMimeType: cvFile.type,
      });
    };
    reader.readAsDataURL(cvFile);
  };

  if (submitted) {
    return (
      <Layout lang={lang} setLang={setLang}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
          >
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">{t.success.title}</h2>
            <p className="text-muted-foreground text-lg mb-8">{t.success.message}</p>
            <Button
              size="lg"
              onClick={() => window.location.href = '/'}
              className="gap-2"
            >
              {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
              {t.success.back}
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout lang={lang} setLang={setLang}>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/texture-pattern.png)', backgroundRepeat: 'repeat', backgroundSize: 'contain' }} />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t.title}</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-white/80">{t.subtitle}</h2>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-muted-foreground text-lg text-center mb-10">{t.description}</p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl shadow-lg p-8 border border-border/50">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  {t.form.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: undefined })); }}
                  placeholder={t.form.fullNamePlaceholder}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                    errors.fullName ? "border-red-400 focus:ring-red-300" : "border-border"
                  )}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  {t.form.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                  placeholder={t.form.emailPlaceholder}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                    errors.email ? "border-red-400 focus:ring-red-300" : "border-border"
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* CV Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  {t.form.cv} <span className="text-red-500">*</span>
                </label>
                <div
                  onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                    isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-primary/2",
                    errors.cv ? "border-red-400" : "",
                    cvFile ? "bg-green-50 border-green-400" : ""
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
                  />
                  {cvFile ? (
                    <div className="flex flex-col items-center gap-2 text-green-600">
                      <FileText className="h-10 w-10" />
                      <p className="font-semibold">{cvFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Upload className="h-10 w-10" />
                      <p className="font-medium">{t.form.cvDragText}</p>
                      <p className="text-sm">{t.form.cvHint}</p>
                    </div>
                  )}
                </div>
                {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg font-bold rounded-xl"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    {t.form.submitting}
                  </>
                ) : (
                  t.form.submit
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
