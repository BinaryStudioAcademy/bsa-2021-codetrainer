import { IExampleState } from './state';

export const UPDATE = 'EXAMPLE:UPDATE';
export const TRIGGER_UPDATE_TEXT = 'EXAMPLE:TRIGGER_UPDATE_TEXT';

export type TUpdateExampleArgs = {
	partialState: Partial<IExampleState>;
};

export type TGetExampleTextArgs = {
	exampleName: string;
};
