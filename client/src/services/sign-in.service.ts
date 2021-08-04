import { ISignInForm } from 'typings/sign-in-form';
import callWebApi from '../helpers/call-api.helper';

export const signIn = async (user: ISignInForm): Promise<any> => {
	try {
		const response = await callWebApi({
			method: 'POST',
			endpoint: `auth/login`,
			body: user,
		});
		// WHAT IS A BETTER WAY TO HANDLE ERRORS HERE ???
		if (!response.ok) {
			const error = await response.json();
			throw error.message;
		}
	} catch (error) {
		throw error;
	}
};
