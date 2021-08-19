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
