export enum SocialSettingsActions {
	LINK_TO_GITHUB = 'SETTINGS_SOCIAL_LINK',
	UNLINK_FROM_GITHUB = 'SETTINGS_SOCIAL_UNLINK',
	GITHUB_ERROR = 'SETTINGS_SOCIAL_ERROR',
}

export type TLinkToGithubArgs = { code: string };
export type TGithubErrorArgs = { error: string };
