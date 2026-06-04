import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AboutMe from "@/pages/AboutMe";
import DigitalBrain from "@/pages/DigitalBrain";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteShell from "./layouts/SiteShell";
import AiRoutes from "./sections/ai/routes";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <SiteShell>
            <Switch>
              <Route path="/">
                <Redirect to="/ai/prompt-engineering" />
              </Route>
              <Route path="/about" component={AboutMe} />
              <Route path="/digital-brain" component={DigitalBrain} />
              <Route path="/ai/*?" component={AiRoutes} />
              <Route component={NotFound} />
            </Switch>
          </SiteShell>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
