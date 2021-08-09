import { IUser } from 'typings/sign-in-form';

export interface IUserState {
	user: IUser | null;
}

export const initialState: IUserState = {
	user: null,
};
