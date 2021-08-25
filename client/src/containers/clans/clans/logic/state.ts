import { Order } from 'helpers/table-helper';
import { WebApi } from 'typings/webapi';

export enum ClansOrderByOptions {
	BY_SIZE = 'numberOfMembers',
	BY_RANK = 'rank',
	BY_TIME = 'createdAt',
	BY_NAME = 'name',
	BY_HONOR = 'honor'
}

export interface IClansState {
	options: {
		page: number;
		itemsPerPage: number;
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
		page: 0,
		itemsPerPage: 5,
		orderBy: ClansOrderByOptions.BY_NAME,
		order: Order.ASC,
		nameQuery: ''
	},
	data: [],
	isLoading: false,
	errors: [],
	count: 0
};
