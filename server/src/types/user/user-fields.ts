import { CLAN_MEMBER_ROLE, CLAN_MEMBER_STATUS } from '../../common';
import { IClanFields } from '../clan';

export interface IProfileClan {
	id?: string;
	role: CLAN_MEMBER_ROLE;
	status: CLAN_MEMBER_STATUS;
}

export interface IUserFields {
	id: string;
	password: string;
	email: string;
	name?: string;
	surname?: string;
	profileClan?: IProfileClan;
	clan: IClanFields;
	nickname?: string;
	avatar?: string;
	createdAt: string;
	lastVisit?: string;
	skills?: string[];
	devLevel?: string;
	social?: string[];
}
