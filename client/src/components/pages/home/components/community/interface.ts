import { WebApi } from '../../../../../typings/webapi';
import IClan = WebApi.Entities.IClan;

export interface IUser {
	id: string;
	username: string;
	rank: number;
	imageSource?: string;
	name: string;
	clan?: IClan | null;
	honor: number;
}

export interface ICommunityProps {
	isInClan: boolean;
	users: IUser[];
}
