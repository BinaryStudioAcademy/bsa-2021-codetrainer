export interface IClan {
	id: string;
	name: string;
	rank: number;
	avatar: string;
	honour: number;
	isPublic: boolean;
	maxMembers: number;
	numberOfMembers: number;
	createdAt: Date;
}

export type TClans = Array<IClan>;

export interface IClansState {
	options: {
		skip: number;
		take: number;
	};
	items: TClans;
}

export const initialState: IClansState = {
	options: {
		skip: 0,
		take: 10,
	},
	items: [],
};
