import { rankDifficulty } from './config';
import styles from './rank.module.scss';

export function mapRankToStyle({ rank, active }: { rank?: number; active?: boolean }): string {
	if (!rank) {
		return styles.honor;
	}
	if (rankDifficulty.HARD.includes(rank)) {
		return styles[active ? 'active_hard' : 'hard'];
	}
	if (rankDifficulty.MEDIUM.includes(rank)) {
		return styles[active ? 'active_medium' : 'medium'];
	}
	return styles[active ? 'active_easy' : 'easy'];
}
