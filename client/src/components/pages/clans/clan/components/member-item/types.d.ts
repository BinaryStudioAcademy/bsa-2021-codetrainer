import { WebApi } from 'typings/webapi';

export type TRole = 'admin' | 'member';

export interface IMemberItemProps {
	member: WebApi.Entities.IMember;
	viewerRole: TRole;
	viewerId: string;
	handleAddAdmin: (id: string) => void;
	handleDeleteMember: (id: string) => void;
}
