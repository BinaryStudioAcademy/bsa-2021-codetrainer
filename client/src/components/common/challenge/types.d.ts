export interface IStatsProps {
	stats: {
		favoriteSaves: number;
		positiveFeedback: number;
		author: {
			firstName: string;
			lastName: string;
			link: string;
		};
	};
}

export interface IHeaderProps {
	title: string;
	rank: number;
	linkToAuthor: string;
}

export default IChallengeProps;
