export interface IChallengeStats {
	favouriteSaves: number;
	positiveFeedback: number;
	author: {
		firstName: string;
		lastName: string;
		link: string;
	};
}

export interface IChallengeHeader {
	title: string;
	rank: number;
}

export type IChallengeTags = Array<string>;

export interface IChallenge {
	author: {
		firstName: string;
		lastName: string;
		link: string;
	};
	title: string;
	rank: number;
	stats: {
		favouriteSaves: number;
		positiveFeedback: number;
	};
	tags: IChallengeTags;
}

export default IChallenge;
