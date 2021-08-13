import { ENV, AuthApiPath } from '../../common';

export const createLinkResetPassword = (resetToken: string) =>
	`${ENV.APP.URL}${AuthApiPath.CHANGE_PASSWORD}?token=${resetToken}`;
