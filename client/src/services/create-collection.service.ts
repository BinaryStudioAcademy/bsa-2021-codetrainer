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

//to do: remove when becomes obsolete
export const getCollections = async () => {
	try {
		const data = await http.callWebApi({
			method: 'GET',
			endpoint: 'collections',
		});
		return data;
	} catch (error) {
		return error;
	}
};
