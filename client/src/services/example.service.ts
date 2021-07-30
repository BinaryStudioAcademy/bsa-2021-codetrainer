import callWebApi from '../helpers/call-api.helper';

export const fetchExample = async (exampleName: string): Promise<WebApi.Entities.IExample> => {
	const res = await callWebApi({
		method: 'POST',
		endpoint: `auth/login`,
		body: {
			email: 'test@test.com',
			password: '123',
		},
	});
	const { user } = await res.json();

	return user as WebApi.Entities.IExample;
};
