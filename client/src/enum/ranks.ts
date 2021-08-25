export const NextRankHonor = {
	TO_EIGHT: 50,
	TO_SEVEN: 100,
	TO_SIX: 200,
	TO_FIVE: 300,
	TO_FOUR: 500,
	TO_THREE: 750,
	TO_TWO: 1000,
	TO_ONE: 1250,
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
