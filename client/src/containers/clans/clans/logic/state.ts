import { TClans } from '../../types';

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
