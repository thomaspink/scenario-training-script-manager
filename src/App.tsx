import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ScenarioOverview} from './pages/ScenarioOverview';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:scenarioId">
          <ScenarioOverview />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
