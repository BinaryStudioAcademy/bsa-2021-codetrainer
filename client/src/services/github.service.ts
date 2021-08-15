import { IGithubProfile, IGithubProfileWithEmail } from 'typings/common/IGithub';
import { http } from 'services';

export const GET_GITHUB_PROFILE_BY_ID = 'https://api.github.com/user/';
export const GITHUB_API = 'auth/github';
export const GITHUB_CALLBACK = GITHUB_API + '/callback';

export enum GithubEndpoints {
	LOGIN = '/login',
	REGISTER = '/register',
	LINK = '/link',
	UNLINK = '/unlink',
}

type TGithubProfileResponse = {
	id: string;
	login: string;
	avatar_url: string;
	html_url: string;
};

function mapGithubProfileToProps({ id, login, ...remains }: TGithubProfileResponse): IGithubProfile {
	return {
		id,
		login,
		profileUrl: remains.avatar_url,
		url: remains.html_url,
	};
}

export async function getProfile(githubId: string): Promise<IGithubProfile> {
	const res = await fetch(GET_GITHUB_PROFILE_BY_ID + githubId, {
		method: 'GET',
	});
	const profile = await res.json();
	return mapGithubProfileToProps(profile);
}

export async function getProfileFromRegister(code: string): Promise<IGithubProfileWithEmail> {
	return http.callWebApi({
		endpoint: GITHUB_CALLBACK + GithubEndpoints.REGISTER,
		method: 'GET',
		query: { code },
		skipAuthorization: true,
	});
}
