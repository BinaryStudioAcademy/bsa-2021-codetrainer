import { http } from 'services';

export const fetchCommunity = async (id: string): Promise<Record<string, any>> => {
	const community = await http.callWebApi({
		method: 'GET',
		endpoint: `followers/community/${id}`,
	});

	return community;
};
