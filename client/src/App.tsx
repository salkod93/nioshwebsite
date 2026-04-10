import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Kawader from "./pages/Kawader";
import VcoshLanding from "./pages/VcoshLanding";
import BoardOfDirectors from "./pages/BoardOfDirectors";
import CeoMessage from "./pages/CeoMessage";
import ChairmanMessage from "./pages/ChairmanMessage";
import About from "./pages/About";
import { Redirect } from "wouter";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />

      {/* Unified About page */}
      <Route path={"/about"} component={About} />

      {/* Redirect old individual pages to unified About page with anchors */}
      <Route path={"/ceo-message"}>{() => <Redirect to="/about#about-ceo-message" />}</Route>
      <Route path={"/chairman-message"}>{() => <Redirect to="/about#about-chairman-message" />}</Route>
      <Route path={"/board-of-directors"}>{() => <Redirect to="/about#about-board" />}</Route>
      <Route path={"/institute-roles"}>{() => <Redirect to="/about#about-roles" />}</Route>
      <Route path={"/organizational-structure"}>{() => <Redirect to="/about#about-structure" />}</Route>

      {/* Media Center subpages */}
      <Route path={"/news"}>
        {() => <ComingSoon titleEn="News" titleAr="الأخبار" />}
      </Route>
      <Route path={"/reports"}>
        {() => <ComingSoon titleEn="Reports" titleAr="التقارير" />}
      </Route>
      <Route path={"/video-gallery"}>
        {() => <ComingSoon titleEn="Video Gallery" titleAr="مكتبة الفيديو" />}
      </Route>
      <Route path={"/photo-gallery"}>
        {() => <ComingSoon titleEn="Photo Gallery" titleAr="مكتبة الصور" />}
      </Route>
      <Route path={"/digital-library"}>
        {() => <ComingSoon titleEn="Digital Library" titleAr="المكتبة الرقمية" />}
      </Route>

      {/* Kawader Accreditation */}
      <Route path={"/kawader"} component={Kawader} />

      {/* Virtual Center of OSH Services */}
      <Route path={"/vcosh"} component={VcoshLanding} />

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
