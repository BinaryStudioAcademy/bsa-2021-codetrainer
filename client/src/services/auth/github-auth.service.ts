import { GITHUB_CALLBACK, GithubEndpoints } from 'services/github.service';
import { ISignUpByGithubForm } from 'typings/sign-up-form';
import { Auth as AuthService } from './auth-services';
import { mapUserResponseToUser } from 'helpers/user.helper';
import { WebApi } from 'typings/webapi';

export class GithubAuthService extends AuthService {
	async loginByGithub(code: string) {
		return this.authorize(
			await this.load({
				endpoint: GITHUB_CALLBACK + GithubEndpoints.LOGIN,
				query: { code },
			}),
		);
	}

	async registerByGithub(body: ISignUpByGithubForm) {
		return this.authorize(
			await this.load({
				endpoint: GITHUB_CALLBACK + GithubEndpoints.REGISTER,
				body,
			}),
		);
	}

	async link(code: string) {
		const { user }: { user: WebApi.Entities.IUser } = await this.load({
			endpoint: GITHUB_CALLBACK + GithubEndpoints.LINK,
			query: { code },
			skipAuthorization: false,
		});
		return mapUserResponseToUser(user);
	}

	async unlink() {
		const { user }: { user: WebApi.Entities.IUser } = await this.load({
			endpoint: GITHUB_CALLBACK + GithubEndpoints.UNLINK,
			skipAuthorization: false,
		});
		return mapUserResponseToUser(user);
	}
}
