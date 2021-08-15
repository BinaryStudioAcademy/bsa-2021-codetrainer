/* eslint-disable camelcase, no-underscore-dangle */

export interface IRawGithubProfile {
	id: string;
	username: string;
	_json: {
		html_url: string;
		avatar_url?: string;
	};
	emails: [
		{
			value: string;
		},
	];
}

export interface IGithubProfile {
	id: string;
	email: string;
	login: string;
	url: string;
	profileUrl?: string;
}

export function mapGithubResponseToGithubProfile(profile: IRawGithubProfile): IGithubProfile {
	return {
		id: profile.id,
		email: profile.emails[0].value,
		login: profile.username,
		profileUrl: profile._json.avatar_url,
		url: profile._json.html_url,
	};
}
