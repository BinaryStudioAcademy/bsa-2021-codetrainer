import { ISortingStrategy } from 'components/common/sort-label/types';
import { MembersSortStrategy, ClanPageStatus, IMembersFilter } from './types';
import { WebApi } from 'typings/webapi';
import { Order } from 'helpers/table-helper';

export interface IClanState {
	data?: WebApi.Entities.IClan;
	error?: string;
	status: ClanPageStatus;
	editStatus: ClanPageStatus;
	invitationStatus: ClanPageStatus;
	community: WebApi.Entities.IUser[];
	membersSort: ISortingStrategy<MembersSortStrategy>;
	membersFilter?: IMembersFilter;
}

export const initialState: IClanState = {
	membersSort: {
		strategy: MembersSortStrategy.HONOR,
		order: Order.ASC,
	},
	status: ClanPageStatus.LOADING,
	editStatus: ClanPageStatus.SUCCESS,
	invitationStatus: ClanPageStatus.SUCCESS,
	community: [],
};
