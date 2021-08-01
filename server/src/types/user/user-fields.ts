import { IClanFields } from '../clan/clan-fields';

export interface IUserFields {
	id: string;
	password: string;
	email: string;
	name?: string;
	surname?: string;
	nickname?: string;
	avatar?: string;
	createdAt: string;
	lastVisit?: string;
	clan?: IClanFields | string;
	skills?: string[];
	devLevel?: string;
	social?: string[];
}
