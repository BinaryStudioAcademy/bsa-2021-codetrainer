import { WebApi } from 'typings/webapi';
import { IGithubProfile } from 'typings/common/IGithub';

export interface IUser extends WebApi.Entities.IUser {
	lastVisit?: string;
	skills?: Array<string>;
	devLevel?: string;
	social?: Array<string>;
	github?: IGithubProfile;
	tasks?: WebApi.Entities.ITask[];
	solutions?: Array<any>;
	languages?: Array<{
		id: string;
		name: string;
		numberUsed: number;
	}>;
	comments?: Array<{
		id: string;
		replies: Array<any>;
	}>;
	referrals?: Array<any>;
	achivements?: Array<any>;
	collections?: Array<any>;
	translations?: Array<{
		id: string;
		approved: boolean;
	}>;
	followers: any[];
	following: any[];
}
