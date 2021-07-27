import { ExampleState } from './state';

export const UPDATE = 'EXAMPLE:UPDATE';
export const TRIGGER_UPDATE_TEXT = 'EXAMPLE:TRIGGER_UPDATE_TEXT';

export type UpdateExampleArgs = {
	partialState: Partial<ExampleState>;
};

export type GetExampleTextArgs = {
	exampleName: string;
};
