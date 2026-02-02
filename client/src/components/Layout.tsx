import { useState, useEffect } from "react";
import { content, Language } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Layout({ children, lang, setLang }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={cn("min-h-screen flex flex-col font-sans", isRTL ? "text-right" : "text-left")}>
      {/* Navigation */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-border/40 py-2" : "bg-transparent py-4"
        )}
      >
        <div className="container flex items-center justify-between h-full">
          {/* Logo - Always on the right in RTL, left in LTR */}
          <div className="flex items-center gap-2 z-50 h-full">
            <img 
              src={lang === 'ar' ? "/images/logo-ar.png" : "/images/logo-en.png"} 
              alt="NIOSH Logo" 
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-foreground/80 hover:text-primary font-medium transition-colors">
              {t.nav.home}
            </button>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors outline-none">
                {t.nav.about}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "end" : "start"} className="w-56">
                <DropdownMenuItem onClick={() => scrollToSection('about')}>
                  {t.nav.aboutDropdown.overview}
                </DropdownMenuItem>
                <DropdownMenuItem>{t.nav.aboutDropdown.ceoMessage}</DropdownMenuItem>
                <DropdownMenuItem>{t.nav.aboutDropdown.boardMembers}</DropdownMenuItem>
                <DropdownMenuItem>{t.nav.aboutDropdown.boardRoles}</DropdownMenuItem>
                <DropdownMenuItem>{t.nav.aboutDropdown.strategy}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={() => scrollToSection('priorities')} className="text-foreground/80 hover:text-primary font-medium transition-colors">
              {t.nav.priorities}
            </button>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors outline-none">
                {t.nav.services}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "end" : "start"} className="w-56">
                <DropdownMenuItem onClick={() => scrollToSection('services')}>
                  {t.nav.servicesDropdown.training}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection('services')}>
                  {t.nav.servicesDropdown.consultancy}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection('services')}>
                  {t.nav.servicesDropdown.qualification}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLang}
              className="gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary"
            >
              <Globe className="h-4 w-4" />
              {t.nav.langSwitch}
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={cn(
          "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <button onClick={() => scrollToSection('home')} className="text-2xl font-medium text-foreground hover:text-primary">
            {t.nav.home}
          </button>
          <button onClick={() => scrollToSection('about')} className="text-2xl font-medium text-foreground hover:text-primary">
            {t.nav.about}
          </button>
          <button onClick={() => scrollToSection('priorities')} className="text-2xl font-medium text-foreground hover:text-primary">
            {t.nav.priorities}
          </button>
          <button onClick={() => scrollToSection('services')} className="text-2xl font-medium text-foreground hover:text-primary">
            {t.nav.services}
          </button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => {
              toggleLang();
              setMobileMenuOpen(false);
            }}
            className="gap-2 mt-4"
          >
            <Globe className="h-5 w-5" />
            {t.nav.langSwitch}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-4">
              <img 
                src="/images/logo-en.png" 
                alt="NIOSH Logo" 
                className="h-12 w-auto brightness-0 invert opacity-90"
              />
              <p className="text-primary-foreground/80 text-sm max-w-md text-center md:text-start">
                {t.about.vision.text}
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2 text-sm text-primary-foreground/60">
              <p>{t.footer.address}</p>
              <p>{t.footer.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
