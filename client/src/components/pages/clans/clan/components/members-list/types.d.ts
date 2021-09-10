import { IMembersFilter } from 'containers/clans/clan/logic/types';
import { WebApi } from 'typings/webapi';
import { ISortingStrategy } from 'containers/common/sort-label/types';
import { MembersSortStrategy } from 'containers/clans/clan/logic/types';

export interface IMembersListProps {
	data: WebApi.Entities.IMember[];
	sort: ISortingStrategy<MembersSortStrategy>;
	setSort: (sort: ISortingStrategy<MembersSortStrategy>) => void;
	filter?: IMembersFilter;
	setFilter: (filter: Partial<IMembersFilter>) => void;
	viewer: WebApi.Entities.IUser;
	handleMakeAdmin: (id: string) => void;
	handleDeleteMember: (id: string) => void;
}
