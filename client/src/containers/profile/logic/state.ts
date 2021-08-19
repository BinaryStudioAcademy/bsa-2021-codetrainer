import { IUser } from 'typings/common/IUser';
import { ActiveTabId } from './models';

export interface IProfileState {
	activeTab: ActiveTabId;
	isLoading: boolean;
	error: string | null
	isSuccess: boolean;
	userData: IUser | null;
}

export const initialState: IProfileState = {
	activeTab: ActiveTabId.Stats,
	isLoading: false,
	error: null,
	isSuccess: false,
	userData: null,
};
