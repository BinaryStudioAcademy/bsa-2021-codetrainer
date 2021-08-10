import { http } from 'services';

export const createClan = async (name: string) => {
	const body = {
		name: name,
		isPublic: 'true',
	};
	await http.callWebApi({
		method: 'POST',
		endpoint: 'clan',
		body: body,
	});
};
