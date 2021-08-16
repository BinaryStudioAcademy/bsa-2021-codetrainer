export interface ISearchState {
	isLoading: boolean;
	errors: Record<string, { msg: string }[]> | string | null;
	isSuccess: boolean;
	onSubmit: boolean;
	filter: {
		status: string;
		progress: string;
		query: string;
		rank: number | null;
		tags: string;
		sort: string;
	};
	search: {
		tags: {
			name: string;
			numberOfTasks: number;
		}[];
		ranks: {
			rank: number;
		}[];
		tasks: {
			id: string;
			name: string;
			status: string;
			tags: string[];
			rank: number;
			user: {
				username: string;
				name: string;
				surname: string;
			};
		}[];
	} | null;
}

export const initialState: ISearchState = {
	isLoading: true,
	isSuccess: false,
	errors: null,
	onSubmit: true,
	filter: {
		status: 'approved',
		progress: 'all',
		query: '',
		sort: 'newest',
		tags: '',
		rank: null,
	},
	search: null,
};
