export const NextRankHonor = {
	TO_EIGHT: 20,
	TO_SEVEN: 75,
	TO_SIX: 230,
	TO_FIVE: 645,
	TO_FOUR: 1770,
	TO_THREE: 4830,
	TO_TWO: 13150,
	TO_ONE: 35760,
	TO_INFINITY: Infinity,
};

export const getNextRank = (rank: number) => {
	switch (rank) {
		case 9:
			return 'TO_EIGHT';
		case 8:
			return 'TO_SEVEN';
		case 7:
			return 'TO_SIX';
		case 6:
			return 'TO_FIVE';
		case 5:
			return 'TO_FOUR';
		case 4:
			return 'TO_THREE';
		case 3:
			return 'TO_TWO';
		case 2:
			return 'TO_ONE';
		case 1:
			return 'TO_INFINITY';
		default:
			return 'TO_EIGHT';
	}
};

export const NUMBER_OF_RANKS = 9;
