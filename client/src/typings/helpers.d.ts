declare namespace Helpers {
	export interface IRequestArgs {
		endpoint: string;
		method: 'GET' | 'POST' | 'PUT' | 'DELETE';
		skipAuthorization?: boolean;
		query?: Record<string, any>;
		body?: any;
	}
}
