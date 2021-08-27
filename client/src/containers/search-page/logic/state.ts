import { WebApi } from 'typings/webapi';

export interface ISearchState {
	isLoading: boolean;
	errors: Record<string, { msg: string }[]> | string | null;
	isSuccess: boolean;
	onSubmit: boolean;
	changePage: boolean;
	filter: {
		status: string;
		progress: string;
		query: string;
		rank: number | null;
		tags: Set<string>;
		sort: string;
		page: number;
	};
	search: {
		count?: string;
		tags?: {
			name: string;
			numberOfTasks: number;
		}[];
		ranks?: {
			rank: number;
		}[];
		tasks: WebApi.Entities.IChallenge[];
	} | null;
}

export const initialState: ISearchState = {
	isLoading: true,
	isSuccess: false,
	errors: null,
	onSubmit: true,
	changePage: false,
	filter: {
		status: 'beta',
		progress: 'all',
		query: '',
		sort: 'newest',
		tags: new Set(),
		rank: null,
		page: 0,
	},
	search: null,
};
