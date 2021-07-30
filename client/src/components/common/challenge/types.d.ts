export interface IChallengeStatsProps {
	favouriteSaves: number;
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
}

export type TChallengeTagsProps = Array<string>;

export interface IChallengeProps {
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
	tags: TChallengeTagsProps;
}

export default IChallengeProps;
