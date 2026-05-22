import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import SiteLanding from "@/pages/SiteLanding";
import { Route, Switch } from "wouter";
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
              <Route path="/" component={SiteLanding} />
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
