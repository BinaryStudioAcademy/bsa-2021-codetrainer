import { ActiveTabId } from './models';

export interface IProfileState {
	activeTab: ActiveTabId;
}

export const initialState: IProfileState = {
	activeTab: ActiveTabId.Stats,
};
