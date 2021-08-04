import { AuthApiPath } from 'enum';
import { HttpMethods } from 'constants/services';
import callWebApi from 'helpers/call-api.helper';
import { UnauthorizedError } from 'helpers/error';
import { RefreshToken } from '../auth';

export class Http {
	async fetch(requestArgs: Helpers.IRequestArgs) {
		const { skipAuthorization } = requestArgs;
		const checkRefreshToken =
			!skipAuthorization && RefreshToken.isTimeAccessTokenExpired() && RefreshToken.hasRefreshToken();
		if (checkRefreshToken) {
			const response = await callWebApi({
				endpoint: AuthApiPath.REFRESH_TOKEN,
				method: HttpMethods.POST,
				bearer: '',
			});
			const { token } = await response.json();
			if (token) {
				RefreshToken.setToken(token);
			}
		}
		return callWebApi({ ...requestArgs, bearer: RefreshToken.getBearer() })
			.then(this.checkStatus)
			.then(this.getJson)
			.catch(this.error);
	}

	private async checkStatus(response: Response) {
		if (response.ok) {
			return response;
		}
		let textBody;
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
