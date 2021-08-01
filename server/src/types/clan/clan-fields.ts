import { IUserFields } from '../user/user-fields';

export interface IClanFields {
	id: string;
	name: string;
	users: IUserFields[];
}
