import { IClan } from '../../types';

export enum SortOptions {
	DEFAULT = 'DEFAULT',
	BY_RANK = 'BY_RANK',
	BY_TIME = 'BY_TIME',
}

export interface IClanState {
	options: {
		sortBY: SortOptions;
	};
	isLoading: boolean;
	data: IClan | null;
	errors: Array<string>;
}

export const initialState: IClanState = {
	options: {
		sortBY: SortOptions.DEFAULT,
	},
	data: null,
	isLoading: true,
	errors: [],
};
