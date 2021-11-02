import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import {useScenario} from './hooks/useScenario';
import {isScenario} from './types/scenario';

const StyledScenarioEditor = styled.div``;

export const ScenarioEditor = () => {
  const {scenarioId} = useParams<{scenarioId: string}>();
  const [scenario, setScenario] = useScenario(scenarioId);

  let stringifiedScenario = isScenario(scenario) ? JSON.stringify(scenario, null, 2) : '';

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    stringifiedScenario = e.target.value;
  }

  function saveScenario() {
    try {
      const parsedScenario = JSON.parse(stringifiedScenario);

      if (isScenario(parsedScenario)) {
        console.log('Saving scenario', parsedScenario);
        setScenario(parsedScenario);
      } else {
        console.error('Failed to parse scenario');
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <StyledScenarioEditor>
      <textarea
        defaultValue={stringifiedScenario}
        onChange={handleChange}
        rows={50}
        cols={100}
      ></textarea>
      <button onClick={saveScenario}>Save</button>
    </StyledScenarioEditor>
  );
};
