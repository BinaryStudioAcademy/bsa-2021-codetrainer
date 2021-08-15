import { WebApi } from 'typings/webapi';

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
	data: WebApi.Entities.IClan | null;
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
