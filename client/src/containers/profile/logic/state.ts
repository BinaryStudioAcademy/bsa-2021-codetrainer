import { IUser } from 'typings/common/IUser';
import { ActiveTabId } from './models';

export interface IProfileState {
	activeTab: ActiveTabId;
	isLoading: boolean;
	errors: Record<string, { msg: string }[]> | string | null;
	isSuccess: boolean;
	userData: IUser | null;
}

export const initialState: IProfileState = {
	activeTab: ActiveTabId.Stats,
	isLoading: false,
	errors: null,
	isSuccess: false,
	userData: null,
};
