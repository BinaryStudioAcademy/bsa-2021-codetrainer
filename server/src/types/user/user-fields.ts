import { CLAN_MEMBER_ROLE } from '../../common';
import { IClanFields } from '../clan';
import { ITaskFields } from '../task/task-fields';

export interface IProfileClan {
	id?: string;
	role: CLAN_MEMBER_ROLE;
}

export interface IUserFields {
	id: string;
	password: string;
	email: string;
	name?: string;
	surname?: string;
	profileClan?: IProfileClan;
	clan: IClanFields;
	tasks: ITaskFields[];
}
