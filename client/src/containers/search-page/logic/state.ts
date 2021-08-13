interface ITask {
	name: string;
}

export interface ISearchState {
	isLoading: boolean;
	errors: Record<string, { msg: string }[]> | string | null;
	isSuccess: boolean;
	filter: {
		status?: string;
		progress?: string;
		query?: string;
		rank?: string;
		tags?: string[];
		sort?: string;
	};
	search: {
		tags: {
			name: string;
			numberOfTasks: string;
		}[];
		ranks: {
			difficulty: number;
		}[];
		tasks: {
			id: string;
			name: string;
			status: string;
			tags: string[];
		}[];
	} | null;
}

export const initialState: ISearchState = {
	isLoading: false,
	isSuccess: false,
	errors: null,
	filter: {},
	search: null,
};
