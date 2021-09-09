import { Order } from 'helpers/table-helper';
import { WebApi } from 'typings/webapi';

export interface ILeaderBoardState {
	options: {
		page: number;
		itemsPerPage: number;
		orderBy: string;
		order: Order;
		nameQuery: string;
	};
	data: WebApi.Entities.IUser[];
	isLoading: boolean;
	errors: Array<string>;
	count: number;
}

export const initialState: ILeaderBoardState = {
	options: {
		page: 0,
		itemsPerPage: 5,
		orderBy: 'honor',
		order: Order.DESC,
		nameQuery: '',
	},
	data: [],
	isLoading: false,
	errors: [],
	count: 0,
};
