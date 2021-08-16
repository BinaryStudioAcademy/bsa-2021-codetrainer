import { WebApi } from 'typings/webapi';

export enum SortOptions {
	DEFAULT = 'DEFAULT',
	BY_SIZE = 'BY_SIZE',
	BY_RANK = 'BY_RANK',
	BY_TIME = 'BY_TIME',
}

export interface IClansState {
	options: {
		skip: number;
		take: number;
		sortBy: SortOptions;
	};
	data: WebApi.Entities.TClans;
	isLoading: boolean;
	errors: Array<string>;
}

export const initialState: IClansState = {
	options: {
		skip: 0,
		take: 10,
		sortBy: SortOptions.DEFAULT,
	},
	data: [],
	isLoading: false,
	errors: [],
};
