import { IRecoverPassword } from './state';

export const RESET_PASSWORD = 'RECOVER_PASSWORD:RESET_PASSWORD';
export const FORGOT_PASSWORD = 'RECOVER_PASSWORD:FORGOT_PASSWORD';
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD:SUCCESS';
export const RECOVER_PASSWORD_ERROR = 'RECOVER_PASSWORD:ERROR';
export const RECOVER_PASSWORD_STATE_RESET = 'RECOVER_PASSWORD:STATE_RESET';

export type TRecoverPasswordError = {
	payload: IRecoverPassword['errors'];
};

export type TForgotPassword = {
	payload: Containers.IForgotPassword;
};

export type TResetPassword = {
	payload: Containers.IResetPassword;
};
