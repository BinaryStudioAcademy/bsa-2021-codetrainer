import { betaTaskScore, userRankToTaskRank, taskScore, userRankScore, countOfRanks } from '../../common';
import { User } from '../../data';

export class CalculateRank {
	private static getExtraPercent(userRank: number, taskRank: number): number {
		let rankDifferent = userRank - taskRank;
		let userRankToTaskRankKey!: string;
		if (rankDifferent === 0) {
			userRankToTaskRankKey = 'zero';
		} else if (rankDifferent > 0) {
			userRankToTaskRankKey = 'plus';
		} else {
			userRankToTaskRankKey = 'minus';
		}
		rankDifferent = rankDifferent > 2 ? 2 : rankDifferent;
		rankDifferent = rankDifferent < -3 ? 3 : rankDifferent;
		return userRankToTaskRank[userRankToTaskRankKey][rankDifferent];
	}

	private static getUserData(user: User, taskPoint: number, extraPercent: number = 1) {
		const rankScore = Object.values(userRankScore).sort((a, b) => a - b);
		const getUserPoint = Math.round(taskPoint * extraPercent);
		const userTotalHonor =
			rankScore.reduce((prev, score, index) => (index <= countOfRanks - user.rank ? prev + score : prev), 0) +
			user.honor +
			getUserPoint;
		return rankScore.slice(1).reduce(
			(prev, score) =>
				prev.honor >= score
					? {
							honor: prev.honor - score,
							rank: prev.rank - 1,
					  }
					: prev,
			{ honor: userTotalHonor, rank: countOfRanks },
		);
	}

	static approved(user: User, taskRank: number): { rank: number; honor: number } {
		const extraPercent = CalculateRank.getExtraPercent(user.rank, taskRank);
		return CalculateRank.getUserData(user, taskScore[taskRank], extraPercent / 100 + 1);
	}

	static beta(user: User): { rank: number; honor: number } {
		return CalculateRank.getUserData(user, betaTaskScore);
	}
}
