import { getCustomRepository } from 'typeorm';
import { UserRepository, TaskRepository, User } from '../../data';
import { betaTaskScore, userRankToTaskRank, taskScore, userRankScore, countOfRanks, TASK_STATUS } from '../../common';

export class CalculateRank {
	private static getExtraPercent(userRank: number, taskRank: number): number {
		let rankDifferent = userRank - taskRank;
		if (rankDifferent > 2) {
			rankDifferent = 2;
		} else if (rankDifferent < -3) {
			rankDifferent = -3;
		}
		return userRankToTaskRank[rankDifferent];
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

	static async check(userId: string, taskId: string) {
		const userRepository = getCustomRepository(UserRepository);
		const taskRepository = getCustomRepository(TaskRepository);
		const user = await userRepository.getById(userId);
		const task = await taskRepository.getById(taskId);
		if (!user || !task) {
			return;
		}
		const userData = CalculateRank[task.status](user, task.rank);
		await userRepository.updateById(user.id, userData);
	}

	private static approved(user: User, taskRank: number): { rank: number; honor: number } {
		const extraPercent = CalculateRank.getExtraPercent(user.rank, taskRank);
		return CalculateRank.getUserData(user, taskScore[taskRank], extraPercent / 100 + 1);
	}

	private static beta(user: User): { rank: number; honor: number } {
		return CalculateRank.getUserData(user, betaTaskScore);
	}
}
