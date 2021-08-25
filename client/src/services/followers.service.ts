import { http } from 'services';
import { ROUTES } from '../constants/routes';

export const fetchCommunity = async (id: string): Promise<Record<string, any>> => {
	const community = await http.callWebApi({
		method: 'GET',
		endpoint: `${ROUTES.Community}/${id}`,
	});

	return community;
};