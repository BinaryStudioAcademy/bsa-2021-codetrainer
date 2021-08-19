import { IUser } from 'typings/common/IUser';
import { ActiveTabId } from './models';

export interface IProfileState {
	activeTab: ActiveTabId;
	user: IUser | null;
	isLoading: boolean;
	errors: Record<string, { msg: string }[]> | string | null;
	isSuccess: boolean;
	onSubmit: boolean;
	username: string;
}

export const initialState: IProfileState = {
	activeTab: ActiveTabId.Stats,
	user: null,
	isLoading: false,
	errors: null,
	isSuccess: false,
	onSubmit: false,
	username: ''
};
