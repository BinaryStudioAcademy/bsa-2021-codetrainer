import { IUser } from 'typings/sign-in-form';

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export type TSignUserArgs = {
	user: IUser;
};
