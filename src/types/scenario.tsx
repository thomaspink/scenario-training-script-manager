import { isObject } from "../util";

export interface Action {
}

export interface Event {
    id: string;
    name: string;
    actions: Action[];
}

export interface Scenario {
    id: string;
    name: string;
    description?: string;
    events: Event[];
}

export function isScenario(obj: any): obj is Scenario {
    return isObject(obj) && obj.id && obj.name && obj.events;
}