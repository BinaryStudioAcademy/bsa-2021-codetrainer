import { IClanForm } from 'components/modals/clan-modal/types';
import { http } from 'services';

export const createClan = async (clan: IClanForm) => {
	try {
		const data = await http.callWebApi({
			method: 'POST',
			endpoint: 'clan',
			body: clan,
		});
		return data;
	} catch (error) {
		return error;
	}
};
