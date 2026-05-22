import { Redirect, Route, Switch, Router } from "wouter";
import SectionLayout from "@/layouts/SectionLayout";
import PromptEngineeringRoutes from "./prompt-engineering/routes";
import ContextEngineeringRoutes from "./context-engineering/routes";
import HarnessEngineeringRoutes from "./harness-engineering/routes";
import NotFound from "@/pages/NotFound";

export default function AiRoutes() {
  return (
    <Router base="/ai">
      <SectionLayout domainSlug="ai">
        <Switch>
          <Route path="/">
            <Redirect to="/ai/prompt-engineering" />
          </Route>
          <Route path="/prompt-engineering/*?" component={PromptEngineeringRoutes} />
          <Route path="/context-engineering/*?" component={ContextEngineeringRoutes} />
          <Route path="/harness-engineering/*?" component={HarnessEngineeringRoutes} />
          <Route component={NotFound} />
        </Switch>
      </SectionLayout>
    </Router>
  );
}
