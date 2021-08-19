import { http } from 'services';

export const fetchTasks = async () => {
	const res = await http.callWebApi({
		method: 'GET',
		endpoint: 'tasks',
	});

	return res;
};

export const fetchTaskComments = async () => {
	const res = await http.callWebApi({
		method: 'GET',
		endpoint: 'comment-task',
	});

	return res;
};
// export const fetchExample = async (exampleName: string): Promise<WebApi.Entities.IExample> => {
// 	const res = await callWebApi({
// 		method: 'POST',
// 		endpoint: `auth/login`,
// 		body: {
// 			email: 'test@test.com',
// 			password: '123',
// 		},
// 	});
// 	const { user } = await res.json();
//
// 	return user as WebApi.Entities.IExample;
// };
