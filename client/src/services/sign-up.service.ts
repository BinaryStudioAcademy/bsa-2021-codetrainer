import { ISignUpForm } from 'typings/sign-up-form';
import callWebApi from '../helpers/call-api.helper';

export const signUp = async (user: ISignUpForm): Promise<any> => {
	try {
		const response = await callWebApi({
			method: 'POST',
			endpoint: `auth/register`,
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
