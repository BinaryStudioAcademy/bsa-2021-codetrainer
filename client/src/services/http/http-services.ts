import { AuthApiPath } from 'enum';
import { HttpMethods } from 'constants/services';
import serverFetch from 'helpers/call-api.helper';
import { UnauthorizedError, ValidationError } from 'helpers/error';
import { AccessToken } from '../auth';

export class Http {
	async callWebApi(requestArgs: Helpers.IRequestArgs) {
		const { skipAuthorization } = requestArgs;
		const checkAccessToken =
			!skipAuthorization && AccessToken.isTimeAccessTokenExpired() && AccessToken.hasRefreshToken();
		if (checkAccessToken) {
			const response = await serverFetch({
				endpoint: AuthApiPath.REFRESH_TOKEN,
				method: HttpMethods.POST,
				bearer: '',
			});
			const { token } = await response.json();
			if (token) {
				AccessToken.setToken(token);
			}
		}

		return serverFetch({ ...requestArgs, bearer: AccessToken.bearer })
			.then(this.checkStatus)
			.then(this.getJson)
			.catch(this.error);
	}

	private async checkStatus(response: Response) {
		if (response.ok) {
			return response;
		}
		let textBody;
		if (response.status === 400) {
			const text = await response.json();
			throw new ValidationError(text);
		}
		try {
			textBody = await response.text();
			const parsedException = JSON.parse(textBody);
			throw new Error(parsedException?.message ?? response.statusText);
		} catch (e) {
			if (textBody === 'Unauthorized') {
				throw new UnauthorizedError('Unauthorized');
			}
			throw new Error(e?.message || 'error');
		}
	}

	private getJson(response: Response) {
		return response.json();
	}

	private error(err: Error) {
		throw err;
	}
}

export type THttp = InstanceType<typeof Http>;
