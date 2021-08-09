import { Router, Request } from 'express';
import passport from 'passport';
import { setResponseSession } from '../helpers/cookie-session';
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

	github.get(GithubApiPath.LOGIN, passport.authenticate('github-login'));

	github.get(GithubApiPath.REGISTER, passport.authenticate('github-register'));

	github.get(GithubApiPath.LINK, passport.authenticate('github-link'));

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
			const token = await authService.login(user);
			setResponseSession(req, res, token);
		},
	);

	github.get(
		GithubApiPath.CALLBACK + GithubApiPath.REGISTER,
		passport.authenticate('github-register', { session: false }),
		async (req, res) => {
			const profile = req.user as IGithubProfile;
			const token = await githubService.registerUserFromGithubProfile(profile);
			setResponseSession(req, res, token);
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
