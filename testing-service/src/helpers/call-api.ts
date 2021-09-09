import fetch, { RequestInfo, RequestInit, BodyInit, Response } from 'node-fetch';
import { ApiPath, TestApiPath } from '../common/api';
import { ENV } from '../common/env-enum';
import { HttpMethods } from '../common/http-methods';
import { createToken } from './create-token';

const getUrl = (args: Record<string, any>): RequestInfo => ENV.APP.URL + ENV.APP.API_PATH + args.endPoint;

const getArgs = (args: Record<string, any>): RequestInit => {
	const headers: Headers | string[][] | Record<string, string> | undefined = {};
	let body: BodyInit = '';

	const token = createToken({ id: ENV.APP.NAME });

	if (args.body) {
		if (args.method === 'GET') {
			throw new Error('GET request does not support request body.');
		}
		if (args.body) {
			body = JSON.stringify({ ...args.body, token });
			headers['Content-Type'] = 'application/json';
		}
		headers.Accept = 'application/json';
	}

	return {
		method: args.method,
		headers,
		...(args.method === 'GET' ? {} : { body }),
	};
};

export const callApi = async (args: Record<string, any>) => {
	try {
		const res: Response = await fetch(getUrl(args), getArgs(args));
		// console.info('response => ', res);
	} catch (error) {
		console.info('error => ', error);
	}
};

export const sendTestResult = async (result: Record<string, unknown>, path: string) => {
	callApi({
		endPoint: `${ApiPath.TESTS}${path}`,
		method: HttpMethods.POST,
		body: result,
	});
};
