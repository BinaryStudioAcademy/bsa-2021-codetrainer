import fetch from 'node-fetch';
import { ApiPath, TaskApiPath } from '../common/api';
import { ENV } from '../common/env-enum';
import { HttpMethods } from '../common/http-methods';
import { createToken } from './create-token';

export const callApi = async (taskId: string, solutionId: string, answer: any) => {
	const token = createToken({ id: ENV.APP.NAME });
	fetch(`${ENV.APP.URL}${ENV.APP.API_PATH}${ApiPath.TASK}/${taskId}/${TaskApiPath.TRAIN}/${solutionId}`, {
		method: HttpMethods.POST,
		body: JSON.stringify({ answer, token }),
		headers: { 'Content-Type': 'application/json' },
	});
};
