import { IMembersListProps } from './clan/components/members-list/types.d';
import { WebApi } from 'typings/webapi';
import { SortOptions as ClansSortOptions } from 'containers/clans/clans/logic/state';
import { IUser } from 'containers/clans/types';
import { ClansOrderByOptions } from 'containers/clans/clans/logic/state';
import { Order } from 'helpers/table-helper';
import { IClanModalForm } from './../../modals/clan-modal/index';

type TSortCallback = () => void;

export interface IClansProps {
	user: IUser;
	isLoading: boolean;
	clans: WebApi.Entities.IClan[];
	setOrder: (order: Order) => void;
	setOrderBy: (orderBy: ClansOrderByOptions) => void;
	setNameQuery: (nameQuery: string) => void;
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
	clan: WebApi.Entities.IClan;
	visitor: WebApi.Entities.IUser;
	members: IMembersListProps;
	clanActions: {
		onJoin: () => void;
		onLeave: () => void;
		onEdit: (form: IClanModalForm) => void;
		onDelete: () => void;
	};
	invitation: {
		onInvite: (user: WebApi.Entities.IUser) => void;
		handleInviteClick: () => void;
		community: any[];
	};
	modals: {
		isInvitationOpen: boolean;
		isEditOpen: boolean;
		isLeaveOpen: boolean;
		isEditLoading: boolean;
		isInvitationLoading: boolean;
		isDeleteOpen: boolean;
		setIsInvitationOpen: (value: boolean) => void;
		setIsEditOpen: (value: boolean) => void;
		setIsLeaveOpen: (value: boolean) => void;
		setIsDeleteOpen: (value: boolean) => void;
	};
}
