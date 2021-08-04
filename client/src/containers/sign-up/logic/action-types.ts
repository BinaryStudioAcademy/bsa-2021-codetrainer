// import { ISignUpState } from './state';

import { ISignUpForm } from 'typings/sign-up-form';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';
export const SIGN_UP_USER_ERROR = 'SIGN_UP_USER_ERROR';

export type TSignUpArgs = {
	user: ISignUpForm;
};
