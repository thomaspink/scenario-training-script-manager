import styled from 'styled-components';
import {isScenario, Scenario} from '../types/scenario';

export interface ScenarioEditorProps {
  scenario: Scenario;
  setScenario: (scenario: Scenario) => void;
}

const StyledScenarioEditor = styled.div``;

export const ScenarioEditor = ({scenario, setScenario}: ScenarioEditorProps) => {
  let stringifiedScenario = isScenario(scenario) ? JSON.stringify(scenario, null, 2) : '';
  let errorMessage = null;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    errorMessage = null;
    stringifiedScenario = e.target.value;
  }

  function saveScenario() {
    errorMessage = null;
    let parsedScenario = null;
    try {
      parsedScenario = JSON.parse(stringifiedScenario);

      if (!isScenario(parsedScenario)) {
        setError('Invalide - Daten entsprechen nicht dem JSON Format');
        parsedScenario = null;
      }
    } catch (e) {
      console.error(e);
      setError('Invalide - Daten entsprechen nicht dem JSON Format');
    }

    if (parsedScenario) {
      setScenario(parsedScenario);
    }
  }

  function setError(msg: string) {
    errorMessage = (
      <div className="error">
        <p>
          <strong>Daten konnten nicht gespeichert werden</strong>
        </p>
        <p>Fehlermeldung: ${msg}</p>
      </div>
    );
  }

  return (
    <StyledScenarioEditor>
      {errorMessage}
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
