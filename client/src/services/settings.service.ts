import { http } from 'services';

export const updateUser = async ({id, body}:any): Promise<WebApi.Entities.IUser> => {
	console.log({body});
	const res = await http.callWebApi({
		method: 'PUT',
		endpoint: `users/${id}`,
		body,
	});
	const { user } = await res.json();
	console.log(user);
	return user as WebApi.Entities.IUser;
};
