import { IUserFields } from '../user';

export interface IClanFields {
	id: string;
	name: string;
	isPublic: boolean;
	maxMembers: number;
	numberOfMembers: number;
	members: IUserFields[];
}
