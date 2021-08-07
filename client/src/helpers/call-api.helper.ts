import qs from 'qs';

interface IRequestArgs extends Helpers.IRequestArgs {
	bearer?: string;
}

type TBody =
	| string
	| Blob
	| ArrayBufferView
	| ArrayBuffer
	| FormData
	| URLSearchParams
	| ReadableStream<Uint8Array>
	| null
	| undefined;

const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/';
const API = 'api/';

export default async function serverFetch(args: IRequestArgs): Promise<Response> {
	try {
		const res: Response = await fetch(getUrl(args), getArgs(args));
		return res;
	} catch (err) {
		throw err;
	}
}

const getUrl = (args: IRequestArgs): RequestInfo =>
	BASE_URL + API + args.endpoint + (args.query ? `?${qs.stringify(args.query)}` : '');

const getArgs = (args: IRequestArgs): RequestInit => {
	const headers: Headers | string[][] | Record<string, string> | undefined = {};
	let body: TBody;

	if (args.bearer && !args.skipAuthorization) {
		headers.Authorization = args.bearer;
	}

	if (args.body) {
		if (args.method === 'GET') {
			throw new Error('GET request does not support request body.');
		}
		if (args.body instanceof FormData) {
			body = args.body;
		} else {
			body = JSON.stringify(args.body);
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
