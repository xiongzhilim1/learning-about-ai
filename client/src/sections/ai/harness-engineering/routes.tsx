import { Route, Switch, Router } from "wouter";
import HarnessEngineeringLayout from "./HarnessEngineeringLayout";
import Home from "./pages/Home";
import MentalModel from "./pages/MentalModel";
import Tenets from "./pages/Tenets";
import Modules from "./pages/Modules";
import ModuleDetail from "./pages/ModuleDetail";
import Exercises from "./pages/Exercises";
import Resources from "./pages/Resources";
import SimulatorPlaceholder from "./pages/SimulatorPlaceholder";
import NotFound from "@/pages/NotFound";

export default function HarnessEngineeringRoutes() {
  return (
    <Router base="/harness-engineering">
      <HarnessEngineeringLayout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/mental-model" component={MentalModel} />
          <Route path="/tenets" component={Tenets} />
          <Route path="/modules" component={Modules} />
          <Route path="/modules/:slug" component={ModuleDetail} />
          <Route path="/exercises" component={Exercises} />
          <Route path="/resources" component={Resources} />
          <Route path="/simulator" component={SimulatorPlaceholder} />
          <Route component={NotFound} />
        </Switch>
      </HarnessEngineeringLayout>
    </Router>
  );
}
