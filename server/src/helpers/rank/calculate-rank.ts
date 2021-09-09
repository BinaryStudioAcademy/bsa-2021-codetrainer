import { User, Task } from '../../data';
import { userRankToTaskRank, taskScore, userRankScore, countOfRanks, SOLUTION_STATUS, TASK_STATUS } from '../../common';

class CalculateRank {
	private getExtraPercent(userRank: number, taskRank: number): number {
		let rankDifferent = userRank - taskRank;
		if (rankDifferent > 2) {
			rankDifferent = 2;
		} else if (rankDifferent < -3) {
			rankDifferent = -3;
		}
		return userRankToTaskRank[rankDifferent];
	}

	private getUserData(user: User, taskPoint: number, extraPercent: number = 1) {
		if (user.rank > countOfRanks || user.rank < 1) {
			return {
				honor: 0,
				rank: countOfRanks,
			};
		}
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

	check({ user, task, status }: { user?: User; task?: Task; status: SOLUTION_STATUS }) {
		if (!user || !task || status !== SOLUTION_STATUS.COMPLETED || task.status === TASK_STATUS.DRAFT) {
			return {};
		}
		return this.approved(user, task.rank);
	}

	private approved(user: User, taskRank: number): { rank: number; honor: number } {
		const extraPercent = this.getExtraPercent(user.rank, taskRank);
		return this.getUserData(user, taskScore[taskRank], extraPercent / 100 + 1);
	}

	// private beta(user: User): { rank: number; honor: number } {
	// 	return this.getUserData(user, betaTaskScore);
	// }
}

export const calculateRank = new CalculateRank();
