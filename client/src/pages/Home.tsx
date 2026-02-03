import { useState } from "react";
import Layout from "@/components/Layout";
import { content, Language } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, GraduationCap, Users, FileCheck, ArrowRight, ArrowLeft, Target, Lightbulb, Handshake, Globe, Laptop, BookOpen, MapPin, Mail, Phone } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<Language>('ar');
  const t = content[lang];
  const isRTL = lang === 'ar';

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const serviceIcons = [
    <Users className="h-10 w-10 text-secondary" />,
    <GraduationCap className="h-10 w-10 text-secondary" />,
    <Shield className="h-10 w-10 text-secondary" />,
    <FileCheck className="h-10 w-10 text-secondary" />
  ];

  const priorityIcons = [
    <GraduationCap className="h-6 w-6" />,
    <BookOpen className="h-6 w-6" />,
    <Users className="h-6 w-6" />,
    <Lightbulb className="h-6 w-6" />,
    <Handshake className="h-6 w-6" />,
    <Target className="h-6 w-6" />,
    <Laptop className="h-6 w-6" />,
    <Globe className="h-6 w-6" />
  ];

  return (
    <Layout lang={lang} setLang={setLang}>
      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero text-white">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-3xl" />
          <svg className="absolute bottom-0 left-0 w-full h-24 text-background fill-current" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,100 C320,100 420,0 720,0 C1020,0 1120,100 1440,100 Z" />
          </svg>
        </div>

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center pt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Mobile Hero Image - Visible only on mobile, above title */}
            <div className="md:hidden w-full max-w-[200px] mb-8 mx-auto">
              <div className="relative">
                <img 
                  src="/images/hero-image.png" 
                  alt="Safety Helmet" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg h-14 px-8 rounded-full shadow-lg shadow-accent/20"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.cta}
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:flex justify-center"
          >
            <div className="relative z-10 w-full max-w-[350px]">
              <img 
                src="/images/hero-image.png" 
                alt="Safety Helmet" 
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
            {/* Decorative elements behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/20 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background relative">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {t.about.title}
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed text-justify md:text-center">
              {t.about.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t.about.mission.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.mission.text}
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 text-secondary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t.about.vision.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.vision.text}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Priorities Section */}
      <section id="priorities" className="py-24 bg-primary/5 relative">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {t.priorities.title}
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.priorities.items.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-md transition-all duration-300 border-border/50 hover:border-secondary/30">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center mb-3 text-primary">
                      {priorityIcons[index]}
                    </div>
                    <CardTitle className="text-lg font-bold text-primary leading-tight">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-muted/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#1a2b49 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
        />

        <div className="container relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {t.services.title}
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {t.services.items.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border/50 hover:border-secondary/30 group overflow-hidden bg-white">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center mb-4 text-secondary">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg font-bold text-primary leading-tight min-h-[3rem]">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.tags?.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className={`text-xs px-2 py-1 rounded border ${
                            tag === 'individuals' || tag === 'أفراد'
                              ? 'bg-red-50 text-red-700 border-red-100'
                              : tag === 'government' || tag === 'حكومي'
                              ? 'bg-green-50 text-green-700 border-green-100'
                              : 'bg-blue-50 text-blue-700 border-blue-100'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button 
                      className="w-full mt-4 bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white"
                    >
                      {service.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background relative">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {t.contact.title}
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">{t.contact.address.label}</h3>
                  <p className="text-muted-foreground">{t.contact.address.value}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">{t.contact.email.label}</h3>
                  <p className="text-muted-foreground">{t.contact.email.value}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">{t.contact.phone.label}</h3>
                  <p className="text-muted-foreground dir-ltr">{t.contact.phone.value}</p>
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="h-[400px] bg-muted rounded-2xl overflow-hidden relative border border-border"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto" />
                  <p className="text-muted-foreground font-medium">Map Location Placeholder</p>
                  <p className="text-sm text-muted-foreground/70">Riyadh, Saudi Arabia</p>
                </div>
              </div>
              {/* Actual map iframe would go here */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232047.8285257372!2d46.542335640625!3d24.725191699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1706543210000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) opacity(0.8)' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
