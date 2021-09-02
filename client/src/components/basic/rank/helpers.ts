import { rankDifficulty, honorDifficulty } from './config';
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

export function mapHonorToStyle({ honor, active }: { honor?: number; active?: boolean }): string {
	if (!honor) {
		return styles.honor;
	}
	if (honorDifficulty.HARD >= honor) {
		return styles[active ? 'active_hard' : 'hard'];
	}
	if (honorDifficulty.MEDIUM >= honor) {
		return styles[active ? 'active_medium' : 'medium'];
	}
	return styles[active ? 'active_easy' : 'easy'];
}
