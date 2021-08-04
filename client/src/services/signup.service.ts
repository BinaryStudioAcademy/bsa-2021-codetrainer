import { ISignUpForm } from 'typings/sign-up-form';
import callWebApi from '../helpers/call-api.helper';

export const signUp = async (user: ISignUpForm): Promise<any> => {
	try {
		const res = await callWebApi({
			method: 'POST',
			endpoint: `auth/register`,
			body: user,
		});
		return res;
	} catch (e) {
		return null;
	}
};
