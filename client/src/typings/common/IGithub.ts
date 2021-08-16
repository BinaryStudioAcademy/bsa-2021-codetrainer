export interface IGithubProfile {
	id: string;
	login: string;
	profileUrl: string;
	url: string;
}

export interface IGithubProfileWithEmail extends IGithubProfile {
	email: string;
}
