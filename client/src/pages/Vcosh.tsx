import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import type { Language } from "@/lib/content";

const BOOKING_URL = "https://calendar.app.google/BMXEVoHiriKVdqxY6";

export default function Vcosh() {
  const [lang, setLang] = useState<Language>("ar");

  const isRTL = lang === "ar";

  const heading =
    lang === "ar"
      ? "احجز استشارة وعرضاً تجريبياً"
      : "Book a Consultation & Demo";

  const body =
    lang === "ar"
      ? "لحجز استشارة وعرض تجريبي للمركز الافتراضي لخدمات السلامة والصحة المهنية، يرجى حجز موعد معنا عبر الرابط أدناه:"
      : "To Book a Consultation and a demo of the Virtual Center of Occupational Safety and Health Services, book an appointment with us using the link below:";

  const btnLabel = lang === "ar" ? "احجز موعدك الآن" : "Book an Appointment";

  return (
    <Layout lang={lang} setLang={setLang}>
      <section
        className="min-h-[80vh] flex items-center justify-center px-4"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-xl w-full text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-orange-100 rounded-full p-5">
              <Calendar className="h-12 w-12 text-orange-500" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-snug">
            {heading}
          </h1>

          {/* Body text */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {body}
          </p>

          {/* Booking button */}
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all gap-2"
            onClick={() => window.open(BOOKING_URL, "_blank", "noopener,noreferrer")}
          >
            <Calendar className="h-5 w-5" />
            {btnLabel}
          </Button>
        </div>
      </section>
    </Layout>
  );
}
