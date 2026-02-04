import { useState } from "react";
import Layout from "@/components/Layout";
import { content, Language } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, GraduationCap, Users, FileCheck, ArrowRight, ArrowLeft, Target, Lightbulb, Handshake, Globe, Laptop, BookOpen, MapPin, Mail, Phone, Heart } from "lucide-react";

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

  const serviceIcons = {
    consultancy: <Users className="h-10 w-10 text-secondary" />,
    training: <GraduationCap className="h-10 w-10 text-secondary" />,
    wellness: <Heart className="h-10 w-10 text-secondary" />,
    other: <Shield className="h-10 w-10 text-secondary" />
  };

  const mediaIcons = {
    Newspaper: <FileCheck className="h-6 w-6" />,
    FileText: <FileCheck className="h-6 w-6" />,
    Video: <Laptop className="h-6 w-6" />,
    Image: <Target className="h-6 w-6" />,
    Library: <BookOpen className="h-6 w-6" />
  };

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
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/riyadh-skyline.jpg" 
            alt="Riyadh Skyline" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/60 to-primary/70" />
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-3xl" />
          {/* Texture Pattern Top */}
          <div className="absolute top-0 left-0 w-full h-12 z-20" style={{ backgroundImage: 'url(/images/texture-pattern.png)', backgroundRepeat: 'repeat-x', backgroundSize: 'contain' }} />
          
          {/* Texture Pattern Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-12 z-20" style={{ backgroundImage: 'url(/images/texture-pattern.png)', backgroundRepeat: 'repeat-x', backgroundSize: 'contain' }} />
          
          <svg className="absolute bottom-0 left-0 w-full h-24 text-background fill-current" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,100 C320,100 420,0 720,0 C1020,0 1120,100 1440,100 Z" />
          </svg>
        </div>

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-8 flex flex-col justify-center"
          >
            {/* Mobile Hero Image - Visible only on mobile, above title */}
            <div className="md:hidden w-full max-w-[242px] mb-8 mx-auto">
              <div className="relative">
                <img 
                  src="/images/hero-image.png" 
                  alt="Safety Helmet" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-[24px] md:text-[38px] font-bold text-white/95 max-w-2xl leading-snug">
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
            className="relative hidden md:flex justify-center items-center h-full"
          >
            <div className="relative z-10 w-full max-w-[425px] -mt-8">
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

          {/* Institute in Numbers */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-24"
          >
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {t.about.stats.title}
              </h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.about.stats.items.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.value}
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
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
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {Object.entries(t.services.categories).map(([key, category], index) => (
              <motion.div key={index} variants={fadeInUp} className="h-full">
                <div className="group relative h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-border/50">
                  {/* Default State */}
                  <div className="p-8 h-full flex flex-col items-center text-center transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-[-20px]">
                    <div className="w-20 h-20 rounded-2xl bg-secondary/5 flex items-center justify-center mb-6 text-secondary transform group-hover:scale-110 transition-transform duration-500">
                      {serviceIcons[key as keyof typeof serviceIcons]}
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">{category.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                    <div className="mt-auto pt-8">
                      <span className="inline-flex items-center text-secondary font-semibold">
                        {isRTL ? <ArrowLeft className="mr-2 h-5 w-5" /> : null}
                        {t.hero.cta}
                        {!isRTL ? <ArrowRight className="ml-2 h-5 w-5" /> : null}
                      </span>
                    </div>
                  </div>

                  {/* Hover State - Reveal Services */}
                  <div className="absolute inset-0 bg-primary p-6 flex flex-col opacity-0 translate-y-[20px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10 overflow-y-auto">
                    <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-white/10">
                      {category.title}
                    </h3>
                    <div className="space-y-4">
                      {category.items.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group/item">
                          <h4 className="font-bold text-white mb-2 flex items-center justify-between">
                            {item.title}
                            {isRTL ? 
                              <ArrowLeft className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" /> : 
                              <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            }
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.tags?.map((tag: string, tagIdx: number) => (
                              <span key={tagIdx} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/80">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Media Center Section */}
      <section id="media-center" className="py-24 bg-background relative">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {t.mediaCenter.title}
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {t.mediaCenter.items.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 group cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center mb-6 text-primary transition-colors duration-300">
                      {mediaIcons[item.icon as keyof typeof mediaIcons]}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
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

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t.contact.title}
                </h2>
                <div className="w-20 h-1 bg-secondary rounded-full" />
                <p className="text-lg text-white/80">
                  {t.contact.subtitle}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1" style={{ marginRight: "8px" }}>{t.contact.address.label}</h3>
                    <p className="text-white/80" style={{ marginRight: "10px" }}>{t.contact.address.value}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1" style={{ marginRight: "8px" }}>{t.contact.email.label}</h3>
                    <p className="text-white/80" style={{ marginRight: "10px" }}>{t.contact.email.value}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1" style={{ borderRadius: "8px", marginRight: "8px" }}>{t.contact.phone.label}</h3>
                    <p className="text-white/80" style={{ marginRight: "10px" }}>0000 000 00 966+</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-xl text-primary"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {lang === 'en' ? 'First Name' : 'الاسم الأول'}
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {lang === 'en' ? 'Last Name' : 'الاسم الأخير'}
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {lang === 'en' ? 'Message' : 'الرسالة'}
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg">
                  {lang === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
