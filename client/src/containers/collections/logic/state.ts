import { WebApi } from 'typings/webapi';

export interface ICollectionsState {
	collections: WebApi.Entities.ICollection[];
	isLoading: boolean;
	errors: any[];
	selectedTask: string | null;
}

export const initialState: ICollectionsState = {
	collections: [],
	isLoading: false,
	errors: [],
	selectedTask: null,
};
