import { http } from 'services';

export const createCollection = async (name: string) => {
	const body = {
		name: name,
	};
	try {
		const data = await http.callWebApi({
			method: 'POST',
			endpoint: 'collections',
			body: body,
		});
		return data;
	} catch (error) {
		return error;
	}
};
