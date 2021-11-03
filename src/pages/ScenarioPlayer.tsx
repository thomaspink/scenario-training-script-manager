import {FunctionComponent, useState} from 'react';
import styled from 'styled-components';
import {ActionButton} from '../ActionButton';
import {Action, Scenario, Event} from '../types/scenario';

const StyledScenarioPlayer = styled.div`
  .action-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 30px;
  }
`;

interface EventStackItem {
  action: Action;
  event: Event;
  id: string;
  executionTime: number;
}

export interface ScenarioPlayerProps {
  scenario: Scenario;
}

export const ScenarioPlayer: FunctionComponent<ScenarioPlayerProps> = ({scenario}) => {
  const [executingActions, setExecutingActions] = useState(new Set<Action>());
  const [eventStack, setEventStack] = useState<EventStackItem[]>([]);

  /** Handles the click on an action-button */
  function handleActionClick(action: Action) {
    setExecutingActions(new Set(executingActions).add(action));
    addEventsFromActionToStack(action);
  }

  /** Adds the events from a provided action to the stack. */
  function addEventsFromActionToStack(action: Action) {
    const newStack = eventStack.slice();
    let prevExecutionTime = Date.now();

    const events = action.events
      .map((event, index) => {
        let executionTime = prevExecutionTime + (event.delay || 0) * 1000 * 60;
        if (executionTime === prevExecutionTime) {
          executionTime++;
        }
        prevExecutionTime = executionTime;
        return {
          action,
          event,
          id: `${action.id}-${index}`,
          executionTime,
        };
      })
      .sort((a, b) => a.executionTime - b.executionTime);

    newStack.push(...events);
    setEventStack(newStack);
  }

  /** Formats a timestamp to a human readable time 00:00:00 */
  function formatTime(time: number) {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  return (
    <StyledScenarioPlayer>
      <h2>Aktionen starten</h2>
      <div className="action-container">
        {scenario.actions.map(action => (
          <ActionButton
            key={action.id}
            executing={executingActions.has(action)}
            onClick={() => handleActionClick(action)}
          >
            {action.name}
          </ActionButton>
        ))}
      </div>

      <h2>Aktuell laufende Aktionen</h2>
      <table>
        <thead>
          <tr>
            <th>Text</th>
            <th style={{width: 200}}>Aktion</th>
            <th style={{width: 200}}>Startzeit</th>
          </tr>
        </thead>
        <tbody>
          {eventStack.map(item => (
            <tr key={item.id}>
              <td>{item.event.text}</td>
              <td>{item.action.name}</td>
              <td>{formatTime(item.executionTime)}</td>
            </tr>
          ))}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </StyledScenarioPlayer>
  );
};
