import { Order } from 'helpers/table-helper';
import { WebApi } from 'typings/webapi';

export enum ClansOrderByOptions {
	BY_SIZE = 'size',
	BY_RANK = 'rank',
	BY_TIME = 'createAt',
	BY_NAME = 'name'
}

export interface IClansState {
	options: {
		skip: number;
		take: number;
		orderBy: ClansOrderByOptions;
		order: Order,
		nameQuery: string;
	};
	data: WebApi.Entities.TClans;
	isLoading: boolean;
	errors: Array<string>;
	count: number;
}

export const initialState: IClansState = {
	options: {
		skip: 0,
		take: 10,
		orderBy: ClansOrderByOptions.BY_NAME,
		order: Order.ASC,
		nameQuery: ''
	},
	data: [],
	isLoading: false,
	errors: [],
	count: 0
};
