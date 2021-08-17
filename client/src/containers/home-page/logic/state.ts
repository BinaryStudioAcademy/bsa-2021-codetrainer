export interface IHomeState {
	state: {
		nextTask: {
			id: string;
			name: string;
			description: string;
			rank: number;
			tags: string[];
		} | null,
	} | null
}

export const initialState: IHomeState = {
	state: {
		nextTask: null
	}
};