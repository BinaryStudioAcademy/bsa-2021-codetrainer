export interface IUser {
	id: string;
	rank: number;
	imageSource: string;
	name: string;
	clan: string;
	honor: number;
}

export interface ICommunityProps {
	users: IUser[];
}
