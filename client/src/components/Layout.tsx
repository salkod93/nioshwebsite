import { useState, useEffect } from "react";
import { content, Language } from "@/lib/content";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NCSP_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032539921/8KA3rh2fh9ZWBW5EBavnvF/NCSPLOGO-_25baafc5.png";

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

  const [, navigate] = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    } else {
      // If element not found, navigate home then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
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
        )} style={{height: '85px'}}
      >
        <div className="container flex items-center justify-between h-full">
          {/* Logo - clicking navigates to home */}
          <div className="flex items-center gap-2 h-full">
            <button
              onClick={() => navigate('/')}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label="Go to homepage"
            >
              <img 
                src={lang === 'ar' ? "/images/logo-ar.png" : "/images/logo-en.png"} 
                alt="NIOSH Logo" 
                className="h-12 md:h-16 w-auto object-contain cursor-pointer"
              />
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors outline-none px-2 py-1 rounded-md hover:bg-primary/10 hover:underline underline-offset-4">
                {t.nav.about}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "end" : "start"} className="w-56">
                <DropdownMenuItem onClick={() => scrollToSection('about')}>
                  {t.nav.aboutDropdown.overview}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/ceo-message')}>{t.nav.aboutDropdown.ceoMessage}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/board-of-directors')}>{t.nav.aboutDropdown.boardMembers}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/institute-roles')}>{t.nav.aboutDropdown.boardRoles}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection('priorities')}>{t.nav.aboutDropdown.priorities}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/organizational-structure')}>{t.nav.aboutDropdown.structure}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Services - Direct scroll link */}
            <button onClick={() => scrollToSection('services')} className="cursor-pointer text-foreground/80 hover:text-primary font-medium transition-colors px-2 py-1 rounded-md hover:bg-primary/10 hover:underline underline-offset-4">
              {t.nav.services}
            </button>

            {/* Media Center Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors outline-none px-2 py-1 rounded-md hover:bg-primary/10 hover:underline underline-offset-4">
                {t.nav.mediaCenter}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "end" : "start"} className="w-56">
                <DropdownMenuItem onClick={() => navigate('/news')}>
                  {t.nav.mediaCenterDropdown.news}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/reports')}>
                  {t.nav.mediaCenterDropdown.reports}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/video-gallery')}>
                  {t.nav.mediaCenterDropdown.videoGallery}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/photo-gallery')}>
                  {t.nav.mediaCenterDropdown.photoGallery}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/digital-library')}>
                  {t.nav.mediaCenterDropdown.digitalLibrary}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={() => scrollToSection('contact')} className="cursor-pointer text-foreground/80 hover:text-primary font-medium transition-colors px-2 py-1 rounded-md hover:bg-primary/10 hover:underline underline-offset-4">
              {t.nav.contact}
            </button>

            <button onClick={() => navigate('/kawader')} className="cursor-pointer text-foreground/80 hover:text-primary font-medium transition-colors px-2 py-1 rounded-md hover:bg-primary/10 hover:underline underline-offset-4">
              {t.nav.kawader}
            </button>

            <button
              onClick={() => navigate('/vcosh')}
              className="vcosh-btn text-white px-4 py-2 rounded-md font-medium text-sm text-center leading-tight max-w-[200px]"
            >
              {t.nav.virtualCenter}
            </button>
            
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
            className="md:hidden p-2 text-foreground z-[70]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

      </header>

      {/* Mobile Nav Overlay */}
      <div className={cn(
        "fixed inset-0 top-0 bg-background z-[60] flex flex-col transition-transform duration-300 md:hidden overflow-y-auto",
        mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
          <img
            src={lang === 'ar' ? "/images/logo-ar.png" : "/images/logo-en.png"}
            alt="NIOSH Logo"
            className="h-10 w-auto"
          />
          <button className="p-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="flex flex-col px-6 py-6 gap-1 flex-1">
          {/* About */}
          <div className="border-b border-border/20">
            <button
              onClick={() => scrollToSection('about')}
              className="w-full text-start py-4 px-4 text-lg font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
            >
              {t.nav.about}
            </button>
            <div className="flex flex-col gap-1 pb-3 px-4">
              <button onClick={() => navigate('/ceo-message')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.aboutDropdown.ceoMessage}</button>
              <button onClick={() => navigate('/board-of-directors')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.aboutDropdown.boardMembers}</button>
              <button onClick={() => navigate('/institute-roles')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.aboutDropdown.boardRoles}</button>
              <button onClick={() => scrollToSection('priorities')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.aboutDropdown.priorities}</button>
              <button onClick={() => navigate('/organizational-structure')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.aboutDropdown.structure}</button>
            </div>
          </div>

          {/* Services */}
          <button
            onClick={() => scrollToSection('services')}
            className="w-full text-start py-4 px-4 text-lg font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors border-b border-border/20"
          >
            {t.nav.services}
          </button>

          {/* Media Center */}
          <div className="border-b border-border/20">
            <button
              onClick={() => scrollToSection('media-center')}
              className="w-full text-start py-4 px-4 text-lg font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
            >
              {t.nav.mediaCenter}
            </button>
            <div className="flex flex-col gap-1 pb-3 px-4">
              <button onClick={() => navigate('/news')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.mediaCenterDropdown.news}</button>
              <button onClick={() => navigate('/reports')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.mediaCenterDropdown.reports}</button>
              <button onClick={() => navigate('/video-gallery')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.mediaCenterDropdown.videoGallery}</button>
              <button onClick={() => navigate('/photo-gallery')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.mediaCenterDropdown.photoGallery}</button>
              <button onClick={() => navigate('/digital-library')} className="text-start py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">{t.nav.mediaCenterDropdown.digitalLibrary}</button>
            </div>
          </div>

          {/* Contact */}
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full text-start py-4 px-4 text-lg font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors border-b border-border/20"
          >
            {t.nav.contact}
          </button>

          {/* Kawader */}
          <button
            onClick={() => { navigate('/kawader'); setMobileMenuOpen(false); }}
            className="w-full text-start py-4 px-4 text-lg font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors border-b border-border/20"
          >
            {t.nav.kawader}
          </button>

          {/* Virtual Center */}
          <button
            onClick={() => { navigate('/vcosh'); setMobileMenuOpen(false); }}
            className="vcosh-btn w-full text-start py-4 px-4 text-lg font-semibold rounded-xl border-b border-border/20 text-white"
          >
            {t.nav.virtualCenter}
          </button>

          {/* Language Toggle */}
          <div className="mt-auto pt-6">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                toggleLang();
                setMobileMenuOpen(false);
              }}
              className="w-full gap-2"
            >
              <Globe className="h-5 w-5" />
              {t.nav.langSwitch}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-20 relative overflow-hidden">
        {/* Texture Pattern */}
        <div className="absolute bottom-0 left-0 w-full h-12 z-0 opacity-20" style={{ backgroundImage: 'url(/images/texture-pattern.png)', backgroundRepeat: 'repeat-x', backgroundSize: 'contain' }} />
        
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={lang === 'ar' ? "/images/logo-ar-white.png" : "/images/logo-en.png"} 
                  alt="NIOSH Logo" 
                  className={cn("h-12 w-auto opacity-90", lang === 'en' && "brightness-0 invert")}
                />
                <img 
                  src={NCSP_LOGO} 
                  alt="NCSP - National Center for Strategic Partnerships" 
                  className="h-12 w-auto object-contain bg-white rounded-lg px-2 py-1"
                />
              </div>
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
