import { Request, Response } from 'express';
import { ENV, HttpCodes } from '../common';

// passport-github isn't the perfect solution
// GithubStrategy set 302 status code so it's impossible to handle this in fetch

function generateGithubLink({ callback, scope }: { callback: string; scope?: string[] }) {
	const query = new URLSearchParams({
		client_id: ENV.GITHUB.CLIEND_ID,
		redirect_uri: ENV.GITHUB.CALLBACK + callback,
	});
	if (scope && scope.length !== 0) {
		query.append('scope', scope.join(' '));
	}
	return `https://github.com/login/oauth/authorize?${query.toString()}`;
}

export function githubRedirectMiddleware({ callback, scope = [] }: { callback: string; scope?: string[] }) {
	const link = generateGithubLink({ callback, scope });
	return (_req: Request, res: Response) => {
		res.status(HttpCodes.OK).json({ link });
	};
}
