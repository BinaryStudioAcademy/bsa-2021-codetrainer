import { rankDifficulty } from './config';
import styles from './rank.module.scss';

export function mapRankToStyle(rank: number | undefined): string {
	if (rank !== undefined) {
		if (rankDifficulty.HARD.includes(rank)) {
			return styles.hard;
		}
		if (rankDifficulty.MEDIUM.includes(rank)) {
			return styles.medium;
		}
		return styles.easy;
	}
	return styles.honor;
}
