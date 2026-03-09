import Layout from "@/components/Layout";
import { content } from "@/lib/content";
import { useLang } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface ComingSoonProps {
  titleEn: string;
  titleAr: string;
}

export default function ComingSoon({ titleEn, titleAr }: ComingSoonProps) {
  const { lang, setLang } = useLang();
  const t = content[lang];
  const [, navigate] = useLocation();

  const title = lang === "en" ? titleEn : titleAr;

  return (
    <Layout lang={lang} setLang={setLang}>
      <section className="min-h-[70vh] flex items-center justify-center bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-12 h-12 text-primary" />
              </div>
            </div>

            {/* Page Title */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                {title}
              </h1>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
            </div>

            {/* Coming Soon Message */}
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-foreground">
                {lang === "en" ? "Coming Soon" : "قريباً"}
              </p>
              <p className="text-muted-foreground text-lg">
                {lang === "en"
                  ? "This page is currently under development. Please check back later."
                  : "هذه الصفحة قيد التطوير حالياً. يرجى التحقق مرة أخرى لاحقاً."}
              </p>
            </div>

            {/* Back Button */}
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 text-base"
            >
              {lang === "en" ? "Back to Home" : "العودة إلى الرئيسية"}
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
