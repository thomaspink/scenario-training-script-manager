import styled from 'styled-components';
import {useParams, Switch, Route, useRouteMatch, Link} from 'react-router-dom';
import {useScenario} from '../hooks/useScenario';
import {ScenarioEditor} from './ScenarioEditor';
import {ScenarioPlayer} from './ScenarioPlayer';
import {isScenario} from '../types/scenario';

const StyledScenarioOverview = styled.div``;

export function ScenarioOverview() {
  const match = useRouteMatch();
  const {scenarioId} = useParams<{scenarioId: string}>();
  const [scenario, setScenario] = useScenario(scenarioId);

  if (!isScenario(scenario)) {
    return (
      <StyledScenarioOverview>
        Kein Szenario mit der ID {scenarioId} gefunden.
      </StyledScenarioOverview>
    );
  }

  return (
    <StyledScenarioOverview>
      <Switch>
        <Route path={`${match.path}/player`} strict={false}>
          <ScenarioPlayer scenario={scenario}></ScenarioPlayer>
        </Route>
        <Route path={`${match.path}/editor`} strict={false}>
          <ScenarioEditor scenario={scenario} setScenario={setScenario}></ScenarioEditor>
        </Route>
        <Route path={match.path}>
          <Link to={`${match.url}/editor`}>Bearbeiten</Link>
          <Link to={`${match.url}/player`}>Starten</Link>
        </Route>
      </Switch>
    </StyledScenarioOverview>
  );
}
