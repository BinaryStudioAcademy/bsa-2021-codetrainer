import { AnyAction } from 'redux';

interface IGetActionFn<TArgs> {
	(args: TArgs): AnyAction & TArgs;
}

interface IGetEmptyActionFn {
	(): AnyAction;
}

export function createAction(type: string): IGetEmptyActionFn;
export function createAction<TArgs>(type: string): IGetActionFn<TArgs>;
export function createAction<TArgs>(type: string) {
	return (args?: TArgs): AnyAction & TArgs => {
		return Object.assign({ type }, args);
	};
}
