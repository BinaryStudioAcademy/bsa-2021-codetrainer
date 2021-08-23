import { WebApi } from 'typings/webapi';
import { IGithubProfile } from 'typings/common/IGithub';

export interface IUser {
	id: string;
	username: string;
	rank: number;
	honor: number;
	name: string;
	img?: string;
	surname?: string;
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
}
