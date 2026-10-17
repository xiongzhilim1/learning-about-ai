import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteShell from "./layouts/SiteShell";

const AboutMe = lazy(() => import("@/pages/AboutMe"));
const DesignGuide = lazy(() => import("@/pages/DesignGuide"));
const DigitalBrain = lazy(() => import("@/pages/DigitalBrain"));
const AiRoutes = lazy(() => import("./sections/ai/routes"));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <SiteShell>
            <Suspense fallback={null}>
            <Switch>
              <Route path="/">
                <Redirect to="/ai/prompt-engineering" />
              </Route>
              <Route path="/about" component={AboutMe} />
              <Route path="/digital-brain" component={DigitalBrain} />
              <Route path="/design" component={DesignGuide} />
              <Route path="/ai/*?" component={AiRoutes} />
              <Route component={NotFound} />
            </Switch>
            </Suspense>
          </SiteShell>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
