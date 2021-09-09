export const SOCKET_URL = {
	STAGING: process.env.REACT_APP_API_BASE_URL,
	LOCAL: '/',
};

export const SOCKET_EVENTS = {
	CONNECT_ERROR: 'connect_error',
	SOLUTION_RESULT: 'SOLUTION:RESULT',
	TASK_RESULT: 'TASK:RESULT',
};
