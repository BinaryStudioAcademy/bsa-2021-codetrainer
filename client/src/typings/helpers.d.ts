declare namespace Helpers {
	export interface IRequestArgs {
		endpoint: string;
		skipAuthorization?: boolean;
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
		query?: Record<string, any>;
		body?: any;
	}
}
