import { WebApi } from 'typings/webapi';
import { IGithubProfile } from 'typings/common/IGithub';

export interface IUser {
	id: string;
	username: string;
	rank: number; //where is rank? should be 8 by default
	honor: number;  //where is honor?
	name: string;
	img?: string;
	surname?: string;
	clan?: WebApi.Entities.IClan;
	profileUrl?: string; //?
	github?: IGithubProfile;
	tasks?: WebApi.Entities.ITask[];
}
