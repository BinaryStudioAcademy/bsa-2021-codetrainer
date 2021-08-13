import { ISignInForm } from 'typings/sign-in-form';
import { IUser } from 'typings/webapi';
import callWebApi from '../helpers/call-api.helper';

export const signIn = async (userData: ISignInForm): Promise<IUser> => {
	try {
		const response = await callWebApi({
			method: 'POST',
			endpoint: `auth/login`,
			body: userData,
		});

		// WHAT IS A BETTER WAY TO HANDLE ERRORS HERE ???
		if (!response.ok) {
			const error = await response.json();
			throw error.message;
		}
		const { user } = await response.json();
		return user as IUser;
	} catch (error) {
		throw error;
	}
};
