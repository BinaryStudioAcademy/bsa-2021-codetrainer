/* eslint-disable camelcase, no-underscore-dangle */
import { User } from '../data';

export interface IGithubProfile {
	id: string;
	username: string;
	_json: {
		avatar_url?: string;
	};
	emails: [
		{
			value: string;
		},
	];
}

export function mapGithubProfileToUserFields(profile: IGithubProfile): Omit<User, 'id' | 'password'> {
	return {
		email: profile.emails[0].value,
		name: profile.username,
		surname: '',
		githubId: profile.id,
		profileUrl: profile._json.avatar_url,
	} as User;
}
