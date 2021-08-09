import { Router, Request } from 'express';
import passport from 'passport';
import { IGithubProfile, setResponseSession } from '../helpers';
import { User } from '../data';
import { AuthService, GithubService } from '../services';
import { GithubApiPath, HttpCodes } from '../common';

interface IAccountRequest<A> extends Request {
	account: A;
}

export function githubRouter({
	authService,
	githubService,
}: {
	authService: AuthService;
	githubService: GithubService;
}): Router {
	const github = Router();

	github.get(GithubApiPath.LOGIN, passport.authenticate('github-login'));

	github.get(GithubApiPath.REGISTER, passport.authenticate('github-register'));

	github.get(GithubApiPath.LINK, passport.authenticate('github-link'));

	github.post(GithubApiPath.UNLINK, async (req, res) => {
		const { id } = req.user as User;
		await githubService.linkUserToGithub(id, undefined);
		res.status(HttpCodes.OK).send();
	});

	github.get(
		GithubApiPath.CALLBACK + GithubApiPath.LOGIN,
		passport.authenticate('github-login', { session: false }),
		async (req, res) => {
			const user = req.user as User;
			const token = await authService.login(user);
			setResponseSession(req, res, token);
		},
	);

	github.get(
		GithubApiPath.CALLBACK + GithubApiPath.REGISTER,
		passport.authenticate('github-register', { session: false }),
		async (req, res) => {
			const profile = req.user as unknown as IGithubProfile;
			const token = await githubService.registerUserFromGithubProfile(profile);
			setResponseSession(req, res, token);
		},
	);

	github.get(
		GithubApiPath.CALLBACK + GithubApiPath.LINK,
		passport.authorize('github-link', { session: false }),
		async (req, res) => {
			const { id } = req.user as User;
			const { githubId } = (req as IAccountRequest<{ githubId: string }>).account;
			await githubService.linkUserToGithub(id, githubId);
			res.status(HttpCodes.OK).end();
		},
	);

	return github;
}
