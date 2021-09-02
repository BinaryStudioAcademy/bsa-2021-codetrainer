export const taskScore: Record<string, number> = {
	9: 2,
	8: 3,
	7: 8,
	6: 22,
	5: 55,
	4: 110,
	3: 250,
	2: 440,
	1: 1000,
};
export const userRankScore: Record<string, number> = {
	9: 0,
	8: 20,
	7: 75,
	6: 230,
	5: 645,
	4: 1770,
	3: 4830,
	2: 13150,
	1: 35760,
};
export const countOfRanks = 9;
export const userRankToTaskRank: Record<string, number> = {
	2: 30,
	1: 12,
	0: 5,
	'-1': 1.7,
	'-2': 0.3,
	'-3': 0.09,
};

export const betaTaskScore = 2;
