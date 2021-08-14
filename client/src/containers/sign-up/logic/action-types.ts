import { IGithubProfileWithEmail } from 'typings/common/IGithub';
import { ISignUpForm, ISignUpByGithubForm } from 'typings/sign-up-form';

export const SET_GITHUB = 'SIGN_UP_USER:SET_GITHUB';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const CONTINUE_BY_GITHUB = 'SIGN_UP_USER:CONTINUE_GITHUB';
export const SIGN_UP_BY_GITHUB = 'SIGN_UP_USER:GITHUB';
export const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER:SUCCESS';
export const SIGN_UP_USER_ERROR = 'SIGN_UP_USER:ERROR';
export const SIGN_UP_DATA_CLEAR = 'SIGN_UP_DATA_CLEAR';

export type TSetGithubArgs = {
	github?: IGithubProfileWithEmail;
};
export type TSignUpArgs = {
	userData: ISignUpForm;
};
export type TContrinueByGithubArgs = {
	code: string;
};
export type TSignUpByGithubArgs = {
	userData: ISignUpByGithubForm;
};
