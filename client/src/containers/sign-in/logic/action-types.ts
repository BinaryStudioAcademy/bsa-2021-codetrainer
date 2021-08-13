import { ISignInForm } from 'typings/sign-in-form';
import { WebApi } from 'typings/webapi';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_IN_USER_SUCCESS = 'SIGN_IN_USER_SUCCESS';
export const SIGN_IN_USER_ERROR = 'SIGN_IN_USER_ERROR';

export type TSignInArgs = {
	userData: ISignInForm;
};

export type TSignInSuccessArgs = {
	user: WebApi.Entities.IUser;
};
