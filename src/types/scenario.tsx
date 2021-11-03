import {isObject} from '../util';

export interface Event {
  'text': string;
  'delay'?: number;
}

export interface Action {
  id: string;
  name: string;
  events: Event[];
}

export interface Scenario {
  id: string;
  name: string;
  description?: string;
  actions: Action[];
}

export function isScenario(obj: any): obj is Scenario {
  return isObject(obj) && obj.id && obj.name && obj.actions;
}
