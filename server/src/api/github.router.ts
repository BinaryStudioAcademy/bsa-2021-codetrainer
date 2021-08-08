import { Router, Request } from 'express';
import passport from 'passport';
import { IGithubProfile } from '../helpers/github.helper';
import { IUserFields } from '../types/user/user-fields';
import { TAuthService, GithubService } from '../services';
import { GithubApiPath } from '../common/enum/api/github-api-path';
import { HttpCodes } from '../common/enum/http-codes';

interface IAccountRequest<A> extends Request {
	account: A;
}

export function githubRouter({
	auth: authService,
	githubService,
}: {
	auth: TAuthService;
	githubService: GithubService;
}): Router {
	const github = Router();

	github.post(GithubApiPath.LOGIN, passport.authenticate('github-login'));

	github.post(GithubApiPath.REGISTER, passport.authenticate('github-register'));

	github.post(GithubApiPath.LINK, passport.authenticate('github-link'));

	github.post(GithubApiPath.UNLINK, async (req, res) => {
		const { id } = req.user as IUserFields;
		await githubService.linkUserToGithub(id, undefined);
		res.status(HttpCodes.OK).send();
	});

	github.get(
		GithubApiPath.CALLBACK + GithubApiPath.LOGIN,
		passport.authenticate('github-login', { session: false }),
		async (req, res) => {
			const user = req.user as IUserFields;
			res.status(HttpCodes.OK).json(await authService.login(user));
		},
	);

	github.get(
		GithubApiPath.CALLBACK + GithubApiPath.REGISTER,
		passport.authenticate('github-register', { session: false }),
		async (req, res) => {
			const profile = req.user as IGithubProfile;
			res.status(HttpCodes.OK).json(await githubService.registerUserFromGithubProfile(profile));
		},
	);

	github.get(
		GithubApiPath.CALLBACK + GithubApiPath.LINK,
		passport.authorize('github-link', { session: false }),
		async (req, res) => {
			const { id } = req.user as IUserFields;
			const { githubId } = (req as IAccountRequest<{ githubId: string }>).account;
			await githubService.linkUserToGithub(id, githubId);
			res.status(HttpCodes.OK).end();
		},
	);

	return github;
}
