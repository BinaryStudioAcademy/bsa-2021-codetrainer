export interface IChallengeStatsProps {
	favoriteSaves: number;
	positiveFeedback: number;
	author: {
		firstName: string;
		lastName: string;
		link: string;
	};
}

export interface IChallengeHeaderProps {
	title: string;
	rank: number;
	linkToAuthor: string;
}

export default IChallengeProps;
