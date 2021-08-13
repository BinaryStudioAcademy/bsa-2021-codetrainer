import { http } from 'services';

export const createClan = async (name: string) => {
	const body = {
		name: name,
		isPublic: 'true',
	};
	try {
		const data = await http.callWebApi({
			method: 'POST',
			endpoint: 'clan',
			body: body,
		});
		return data;
	} catch (error) {
		return error;
	}
};
