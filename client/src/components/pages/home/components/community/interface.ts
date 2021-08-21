import { WebApi } from '../../../../../typings/webapi';
import IClan = WebApi.Entities.IClan;

export interface IUser {
	id: string;
	rank: number;
	imageSource?: string;
	name: string;
	clan?: IClan;
	honor: number;
}

export interface ICommunityProps {
	users: IUser[];
}
