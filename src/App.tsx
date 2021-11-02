import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ScenarioEditor } from "./ScenarioEditor";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:scenarioId">
          <ScenarioEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
