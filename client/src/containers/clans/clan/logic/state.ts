import { IClan } from '../../types';

export interface IClanState {
	item: IClan;
}

export const initialState: IClanState = {
	item: {
		id: '',
		name: '',
		rank: 0,
		avatar: '',
		honour: 0,
		isPublic: true,
		maxMembers: 0,
		numberOfMembers: 0,
		createdAt: new Date(),
		members: [],
	},
};
