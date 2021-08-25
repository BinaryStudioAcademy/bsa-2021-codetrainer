import { SortOptions as ClansSortOptions } from 'containers/clans/clans/logic/state';
import { SortOptions as ClanSortOptions } from 'containers/clans/clan/logic/state';
import { TClans, IClan, IUser } from 'containers/clans/types';
import { IUser as IUserStore } from 'typings/common/IUser';
import { ClansOrderByOptions } from 'containers/clans/clans/logic/state';
import { Order } from 'helpers/table-helper';

type TSortCallback = () => void;

export interface IClansProps {
	user: IUser;
	isLoading: boolean;
	clans: TClans;
	setOrder: (order: Order) => void;
	setOrderBy: (orderBy: ClansOrderByOptions) => void;
	setNameQuery: (nameQuery: string) => void;
	joinClan: (id: string) => void;
	leaveClan: (id: string) => void;
	currentSort: ClansSortOptions;
	handleGoToClan: () => void;
	order: Order;
	orderBy: ClansOrderByOptions;
	nameQuery: string;
	page: number;
	itemsPerPage: number;
	count: number;
	setPage: (page: number) => void;
	setItemsPerPage: (itemsPerPage: number) => void;
}

export interface IClanProps {
	leaveClan: () => void;
	joinClan: (id: string) => void;
	clan: IClan;
	isOwnClan: boolean;
	sortByRank: TSortCallback;
	sortByTime: TSortCallback;
	currentSort: ClanSortOptions;
	handleInviteClick: () => void;
	user: IUserStore | null;
	handleDeleteClan: () => void;
	modalShown: boolean;
	setModalShown: (value: boolean) => void;
	modalLoading: boolean;
	community: any[];
	handleInvitationSend: (from: any, to: any) => void;
	isInvitationOpen: boolean;
	setIsInvitationOpen: (value: boolean) => void;
}
