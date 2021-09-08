export interface IChallengeStats {
	updateTaskFavoriteStatus: (id: string) => void;
	id: string;
	stats: {
		favoriteSaves: number;
		positiveFeedback: number;
		author: {
			firstName: string;
			lastName: string;
			username: string;
		};
	};
}

export interface IChallengeHeader {
	title: string;
	rank: number;
	linkToTask: string;
}

export interface IChallenge {
	id: string;
	author: {
		firstName: string;
		lastName: string;
		username: string;
	};
	linkToTask: string;
	title: string;
	rank: number;
	stats: {
		favoriteSaves: number;
		positiveFeedback: number;
	};
	tags: string[] | [];
}
