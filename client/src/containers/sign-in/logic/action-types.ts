import { IUser } from 'typings/common/IUser';
import { ISignInForm } from 'typings/sign-in-form';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_IN_USER_BY_GITHUB = 'SIGN_IN_USER:GITHUB';
export const SIGN_IN_USER_SUCCESS = 'SIGN_IN_USER:SUCCESS';
export const SIGN_IN_USER_ERROR = 'SIGN_IN_USER:ERROR';
export const SIGN_IN_DATA_CLEAR = 'SIGN_IN_DATA_CLEAR';

export type TSignInArgs = {
	userData: ISignInForm;
};

export type TSignInByGithubArgs = {
	code: string;
};

export type TSignInSuccessArgs = {
	user: IUser;
};
