import { IGithubProfile } from 'typings/common/IGithub';

export interface IGithubProps {
	profile?: IGithubProfile;
	onGithubLink?: () => void;
	error?: string;
}

export interface ISocialProps {
	twitterUrl?: string;
	linkedinUrl?: string;
	stackUrl?: string;
	github?: IGithubProps;
	onSubmit: (form: any) => void;
}
