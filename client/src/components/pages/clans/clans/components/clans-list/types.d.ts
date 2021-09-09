import { ClansOrderByOptions } from 'containers/clans/clans/logic/state';
import { Order } from 'helpers/table-helper';
import { WebApi } from 'typings/webapi';

export interface IClansListProps {
	clans: WebApi.Entities.TClans;
	count: number;
	isLoading: boolean;
	userId: string;
	setOrderBy: (orderBy: ClansOrderByOptions) => void;
	setOrder: (order: Order) => void;
	setNameQuery: (nameQuery: string) => void;
	order: Order;
	orderBy: ClansOrderByOptions;
	nameQuery: string;
	page: number;
	itemsPerPage: number;
	setPage: (page: number) => void;
	setItemsPerPage: (itemsPerPage: number) => void;
}
