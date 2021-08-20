export interface IChallengeStats {
	favoriteSaves: number;
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
	linkToAuthor: string;
}

export interface IChallenge {
	id: string;
	author: {
		firstName: string;
		lastName: string;
		link: string;
	};
	linkToAuthor: string;
	title: string;
	rank: number;
	stats: {
		favoriteSaves: number;
		positiveFeedback: number;
	};
	tags: TChallengeTags;
}
