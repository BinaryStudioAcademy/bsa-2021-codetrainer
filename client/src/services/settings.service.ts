import { http } from 'services';
import { WebApi } from 'typings/webapi';
import { HttpMethods } from 'constants/services';

export const updateUser = async (body: any): Promise<WebApi.Entities.IUser> => {
	const { id, ...other } = body;
	const res = await http.callWebApi({
		method: HttpMethods.PUT,
		endpoint: `users/${id}`,
		body: other,
	});
	const { user } = res;
	return user as WebApi.Entities.IUser;
};

export const deleteUser = async (id: string) => {
	return http.callWebApi({
		method: HttpMethods.DELETE,
		endpoint: `users/${id}`,
	});
};

export const updatePassword = async (body: any) => {
	const { id, password, newPassword } = body;
	console.log('body', body);
	await http.callWebApi({
		method: HttpMethods.PUT,
		endpoint: `users/${id}/password`,
		body: {
			password,
			newPassword,
		},
	});
};
