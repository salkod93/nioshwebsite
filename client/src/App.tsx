import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />

      {/* About the Institute subpages */}
      <Route path={"/ceo-message"}>
        {() => <ComingSoon titleEn="CEO's Message" titleAr="كلمة الرئيس التنفيذي" />}
      </Route>
      <Route path={"/board-of-directors"}>
        {() => <ComingSoon titleEn="Board of Directors" titleAr="أعضاء مجلس الإدارة" />}
      </Route>
      <Route path={"/institute-roles"}>
        {() => <ComingSoon titleEn="Institute's Roles and Powers" titleAr="أدوار وصلاحيات المعهد" />}
      </Route>
      <Route path={"/organizational-structure"}>
        {() => <ComingSoon titleEn="Organizational Structure" titleAr="الهيكل التنظيمي" />}
      </Route>

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
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
