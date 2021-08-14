export enum SocialSettingsActions {
	LINK_TO_GITHUB = 'SETTINGS:SOCIAL:LINK',
	UNLINK_FROM_GITHUB = 'SETTINGS:SOCIAL:UNLINK',
	GITHUB_ERROR = 'SETTINGS:SOCIAL:ERROR',
}

export type TLinkToGithubArgs = { code: string };
export type TGithubErrorArgs = { error: string };
