import { Route, Switch, Router } from "wouter";
import PromptEngineeringLayout from "./PromptEngineeringLayout";
import Home from "./pages/Home";
import ModulesListPage from "./pages/ModulesListPage";
import ModulePage from "./pages/ModulePage";
import TenetsPage from "./pages/TenetsPage";
import ExercisesPage from "./pages/ExercisesPage";
import ResourcesPage from "./pages/ResourcesPage";
import NotFound from "@/pages/NotFound";

export default function PromptEngineeringRoutes() {
  return (
    <Router base="/prompt-engineering">
      <PromptEngineeringLayout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/modules" component={ModulesListPage} />
          <Route path="/modules/:id" component={ModulePage} />
          <Route path="/tenets" component={TenetsPage} />
          <Route path="/exercises" component={ExercisesPage} />
          <Route path="/resources" component={ResourcesPage} />
          <Route component={NotFound} />
        </Switch>
      </PromptEngineeringLayout>
    </Router>
  );
}
