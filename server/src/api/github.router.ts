import { Router, Request } from 'express';
import passport from 'passport';
import { IRawGithubProfile, mapGithubResponseToGithubProfile, setResponseSession } from '../helpers';
import { User } from '../data';
import { AuthService, GithubService } from '../services';
import { GithubApiPath, HttpCodes } from '../common';
import { githubRedirectMiddleware } from '../middleware/github-redirect.middleware';

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

	github.get(GithubApiPath.LOGIN, githubRedirectMiddleware({ callback: GithubApiPath.LOGIN }));

	github.get(
		GithubApiPath.REGISTER,
		githubRedirectMiddleware({ callback: GithubApiPath.REGISTER, scope: ['user:email'] }),
	);

	github.get(GithubApiPath.LINK, githubRedirectMiddleware({ callback: GithubApiPath.LINK }));

	github.get(
		GithubApiPath.CALLBACK + GithubApiPath.REGISTER,
		passport.authenticate('github-continue-register', { session: false }),
		async (req, res) => {
			const profile = req.user as unknown as IRawGithubProfile;
			res.status(HttpCodes.OK).json(mapGithubResponseToGithubProfile(profile));
		},
	);

	github.post(
		GithubApiPath.CALLBACK + GithubApiPath.LOGIN,
		passport.authenticate('github-login', { session: false }),
		async (req, res) => {
			const user = req.user as User;
			const token = await authService.login(user);
			setResponseSession(req, res, token);
		},
	);

	github.post(
		GithubApiPath.CALLBACK + GithubApiPath.REGISTER,
		passport.authenticate('github-finish-register', { session: false }),
		async (req, res) => {
			const { githubId, email, username } = req.body;
			const token = await githubService.registerFromGithub({
				githubId,
				email,
				username,
			});
			setResponseSession(req, res, token);
		},
	);

	github.post(
		GithubApiPath.CALLBACK + GithubApiPath.LINK,
		passport.authorize('github-link', { session: false }),
		async (req, res) => {
			const { id } = req.user as User;
			const { githubId } = (req as IAccountRequest<{ githubId: string }>).account;
			await githubService.linkUserToGithub(id, githubId);
			res.status(HttpCodes.OK).json({
				user: {
					...req.user,
					githubId,
				},
			});
		},
	);

	github.post(GithubApiPath.CALLBACK + GithubApiPath.UNLINK, async (req, res) => {
		const { id } = req.user as User;
		await githubService.linkUserToGithub(id, undefined);
		res.status(HttpCodes.OK).json({
			user: {
				...req.user,
				githubId: undefined,
			},
		});
	});

	return github;
}
