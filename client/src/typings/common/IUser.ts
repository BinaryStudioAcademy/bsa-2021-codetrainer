import { WebApi } from 'typings/webapi';
import { IGithubProfile } from 'typings/common/IGithub';

export interface IUser {
	id: string;
	username: string;
	name: string;
	surname?: string;
	rank: number;
	honor: number;
	clan?: WebApi.Entities.IClan | null;
	profileUrl?: string;
	github?: IGithubProfile;
	email?: string;
	skills?: Array<string>;
	devLevel?: string;
	social?: Array<string>;
	avatar?: string;
	tasks?: WebApi.Entities.ITask[];
	profileClan?: {
		id: string;
		role: string;
		status: string;
	};
	img?: string;
	profileUrl?: string;
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
}
