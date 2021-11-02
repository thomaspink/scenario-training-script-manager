import {Scenario} from '../types/scenario';
import {useLocalStorage} from './useLocalStorage';

export const useScenario = (scenarioId: string) => {
  return useLocalStorage<Scenario | null>(scenarioId, null);
};
