import { WebApi } from 'typings/webapi';
import { IGithubProfile } from 'typings/common/IGithub';

export interface IUser {
	id: string;
	username: string;
	rank: number;
	honor: number;
	name: string;
	surname?: string;
	clan?: WebApi.Entities.IClan;
	profileUrl?: string;
	github?: IGithubProfile;
	email?: string;
	skills?: Array<string>;
	devLevel?: string;
	social?: Array<string>;
	avatar?: string;
}
