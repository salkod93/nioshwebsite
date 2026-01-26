import { useState } from "react";
import Layout from "@/components/Layout";
import { content, Language } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, GraduationCap, Users, FileCheck, ArrowRight, ArrowLeft, Target, Lightbulb, Handshake, Globe, Laptop, BookOpen } from "lucide-react";

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
            className="relative hidden md:block"
          >
            <div className="relative z-10 bg-white rounded-2xl p-8 shadow-2xl">
              <img 
                src={lang === 'ar' ? "/images/logo-ar.png" : "/images/logo-en.png"} 
                alt="NIOSH Emblem" 
                className="w-full h-auto drop-shadow-sm"
              />
            </div>
            {/* Decorative elements behind logo */}
            <div className="absolute -inset-4 border border-white/10 rounded-3xl -z-10" />
            <div className="absolute -inset-8 border border-white/5 rounded-[2rem] -z-20" />
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
            className="grid md:grid-cols-2 gap-6"
          >
            {t.services.items.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-secondary/30 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="p-3 rounded-lg bg-secondary/5 text-secondary transition-colors duration-300 relative z-10">
                      {serviceIcons[index]}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
