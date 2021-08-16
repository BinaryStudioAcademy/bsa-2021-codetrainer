import { http } from 'services';
import { WebApi } from 'typings/webapi';
import { HttpMethods } from 'constants/services';

export const updateUser = async ({ id, body }: any): Promise<WebApi.Entities.IUser> => {
	console.log({ body });
	const res = await http.callWebApi({
		method: HttpMethods.PUT,
		endpoint: `users/${id}`,
		body,
	});
	const { user } = res;
	console.log('user from server', user);
	return user as WebApi.Entities.IUser;
};

export const deleteUser = async (id: string) => {
	const res = await http.callWebApi({
		method: HttpMethods.DELETE,
		endpoint: `users/${id}`,
	});
	const { user } = res;
	console.log('delete user from server', user);
};
