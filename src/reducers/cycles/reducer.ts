import { ActionTypes } from './actions';

export interface Cycle {
	id: string;
	task: string;
	minutes: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface CyclesState {
	cycles: Cycle[];
	activeCycleId: string | null;
}

export function cycleReducer(state: CyclesState, action: any) {
	switch (action.type) {
		case ActionTypes.createNewCycle:
			return {
				...state,
				cycles: [...state.cycles, action.payload.newCycle],
				activeCycleId: action.payload.newCycle.id,
			};
		case ActionTypes.interruptCurrentCycle:
			return {
				...state,
				cycles: state.cycles.map((cycle) => {
					if (cycle.id === state.activeCycleId) {
						return { ...cycle, interruptedDate: new Date() };
					} else {
						return cycle;
					}
				}),
				activeCycleId: null,
			};
		case ActionTypes.markCurrentCycleAsFinished:
			return {
				...state,
				cycles: state.cycles.map((cycle) => {
					if (cycle.id === state.activeCycleId) {
						return { ...cycle, finishedDate: new Date() };
					} else {
						return cycle;
					}
				}),
				activeCycleId: null,
			};
		default:
			return state;
	}
}
