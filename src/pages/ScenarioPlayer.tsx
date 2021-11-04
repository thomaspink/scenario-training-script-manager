import {FunctionComponent, useEffect, useState} from 'react';
import styled from 'styled-components';
import {ActionButton} from '../ActionButton';
import {IconButton} from '../IconButton';
import {Action, Scenario, Event} from '../types/scenario';
import {diffTime} from '../util';

const StyledScenarioPlayer = styled.div`
  .action-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 30px;
  }

  .overdue td {
    background: rgb(227, 65, 64);
    color: #fff;
  }
`;

interface EventStackItem {
  action: Action;
  event: Event;
  id: string;
  executionTime: number;
  overdue: boolean;
}

export interface ScenarioPlayerProps {
  scenario: Scenario;
}

export const ScenarioPlayer: FunctionComponent<ScenarioPlayerProps> = ({scenario}) => {
  const [executingActions, setExecutingActions] = useState(new Set<Action>());
  const [eventStack, setEventStack] = useState<EventStackItem[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [eventStack]);

  /** Handles the click on an action-button */
  function handleActionClick(action: Action) {
    setExecutingActions(new Set(executingActions).add(action));
    addEventsFromActionToStack(action);
  }

  function handleEventDone(item: EventStackItem) {
    setEventStack(eventStack.filter(stackItem => stackItem !== item));
  }

  /** Adds the events from a provided action to the stack. */
  function addEventsFromActionToStack(action: Action) {
    const newStack = eventStack.slice();
    let prevExecutionTime = Date.now();

    const events = action.events.map((event, index) => {
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
        overdue: false,
      };
    });

    newStack.push(...events);
    setEventStack(newStack.sort((a, b) => a.executionTime - b.executionTime));
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
            <th style={{width: 56}}></th>
            <th>Text</th>
            <th style={{width: 200}}>Aktion</th>
            <th style={{width: 140}}>Startzeit</th>
          </tr>
        </thead>
        <tbody>
          {eventStack.map(item => (
            <tr key={item.id} className={item.executionTime <= currentTime ? 'overdue' : undefined}>
              <td>
                <IconButton onClick={() => handleEventDone(item)}>
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                    <path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z" />
                  </svg>
                </IconButton>
              </td>
              <td>
                <strong>{item.event.text}</strong>
              </td>
              <td>{item.action.name}</td>
              <td>in {diffTime(item.executionTime, currentTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledScenarioPlayer>
  );
};
