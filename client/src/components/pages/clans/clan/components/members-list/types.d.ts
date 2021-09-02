import { WebApi } from 'typings/webapi';

export interface IMembersListProps {
	members: Array<WebApi.Entities.IMember>;
	viewerRole: TRole;
	handleAddAdmin: (id: string) => void;
}
