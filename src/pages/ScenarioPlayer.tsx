import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Scenario} from '../types/scenario';

const StyledScenarioPlayer = styled.div``;

export interface ScenarioPlayerProps {
  scenario: Scenario;
}

export const ScenarioPlayer: FunctionComponent<ScenarioPlayerProps> = ({scenario}) => {
  console.log('ScenarioPlayer', scenario);
  return <StyledScenarioPlayer>ScenarioPlayer</StyledScenarioPlayer>;
};
