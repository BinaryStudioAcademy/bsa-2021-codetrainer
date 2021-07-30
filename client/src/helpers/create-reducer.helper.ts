import { Reducer, AnyAction } from 'redux';

type IHandlers<TState> = {
	[key: string]: (state: TState, action: any) => TState;
};

export function createReducer<TState>(initialState: TState, handlers: IHandlers<TState>): Reducer<TState> {
	return function reducer(state = initialState, action: AnyAction) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		} else {
			return state;
		}
	};
}
