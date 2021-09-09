import { WebApi } from 'typings/webapi';
import { IMemberWithPosition } from '../../types';

export interface IMemberItemProps {
	member: IMemberWithPosition;
	viewer: WebApi.Entities.IUser;
	handleMakeAdmin: (id: string) => void;
	handleDeleteMember: (id: string) => void;
}
