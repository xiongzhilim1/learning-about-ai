import { lazy, Suspense } from "react";
import { Redirect, Route, Switch, Router } from "wouter";
import SectionLayout from "@/layouts/SectionLayout";
import NotFound from "@/pages/NotFound";

const PromptEngineeringRoutes = lazy(() => import("./prompt-engineering/routes"));
const ContextEngineeringRoutes = lazy(() => import("./context-engineering/routes"));
const HarnessEngineeringRoutes = lazy(() => import("./harness-engineering/routes"));

export default function AiRoutes() {
  return (
    <Router base="/ai">
      <SectionLayout domainSlug="ai">
        <Suspense fallback={null}>
        <Switch>
          <Route path="/">
            <Redirect to="/prompt-engineering" />
          </Route>
          <Route path="/prompt-engineering/*?" component={PromptEngineeringRoutes} />
          <Route path="/context-engineering/*?" component={ContextEngineeringRoutes} />
          <Route path="/harness-engineering/*?" component={HarnessEngineeringRoutes} />
          <Route component={NotFound} />
        </Switch>
        </Suspense>
      </SectionLayout>
    </Router>
  );
}
