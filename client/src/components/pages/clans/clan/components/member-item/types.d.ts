import { WebApi } from 'typings/webapi';

export type TRole = 'admin' | 'member';

export interface IMemberItemProps {
	member: WebApi.Entities.IMember;
	viewerRole: TRole;
	handleAddAdmin: (id: string) => void;
}
