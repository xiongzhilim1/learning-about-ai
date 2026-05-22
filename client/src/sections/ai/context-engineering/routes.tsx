import { Route, Switch, Router } from "wouter";
import ContextEngineeringLayout from "./ContextEngineeringLayout";
import Home from "./pages/Home";
import MentalModel from "./pages/MentalModel";
import Approaches from "./pages/Approaches";
import Tenets from "./pages/Tenets";
import Selector from "./pages/Selector";
import Visualizer from "./pages/Visualizer";
import Recipes from "./pages/Recipes";
import CaseStudies from "./pages/CaseStudies";
import Checklist from "./pages/Checklist";
import Sources from "./pages/Sources";
import NotFound from "@/pages/NotFound";

export default function ContextEngineeringRoutes() {
  return (
    <Router base="/context-engineering">
      <ContextEngineeringLayout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/mental-model" component={MentalModel} />
          <Route path="/approaches" component={Approaches} />
          <Route path="/tenets" component={Tenets} />
          <Route path="/selector" component={Selector} />
          <Route path="/visualizer" component={Visualizer} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/checklist" component={Checklist} />
          <Route path="/sources" component={Sources} />
          <Route component={NotFound} />
        </Switch>
      </ContextEngineeringLayout>
    </Router>
  );
}
