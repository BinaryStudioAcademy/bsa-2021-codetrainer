import { IGithubProfile } from 'typings/common/IGithub';

export interface IUser {
	id: string;
	username: string;
	rank: number;
	name: string;
	surname?: string;
	clan?: string;
	honor: number;
	profileUrl?: string;
	github?: IGithubProfile;
}
