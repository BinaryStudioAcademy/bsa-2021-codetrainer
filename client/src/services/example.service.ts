import callWebApi from '../helpers/call-api.helper';

export const fetchExample = async (exampleName: string): Promise<WebApi.Entities.Example> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `example/text/${exampleName}`,
	});
	const exampleData = await res.json();

	return exampleData as WebApi.Entities.Example;
};
