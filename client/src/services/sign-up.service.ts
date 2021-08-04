import { ISignUpForm } from 'typings/sign-up-form';
import callWebApi from '../helpers/call-api.helper';

export const signUp = async (userData: ISignUpForm): Promise<WebApi.Entities.IUser> => {
	try {
		const response = await callWebApi({
			method: 'POST',
			endpoint: `auth/register`,
			body: userData,
		});
		// WHAT IS A BETTER WAY TO HANDLE ERRORS HERE ???
		if (!response.ok) {
			const error = await response.json();
			throw error.message;
		}
		const { user } = await response.json();
		return user as WebApi.Entities.IUser;
	} catch (error) {
		throw error;
	}
};
