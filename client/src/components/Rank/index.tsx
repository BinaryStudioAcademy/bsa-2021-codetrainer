import { combineClasses } from 'helpers/combineClasses.helper';
import React, { FC } from 'react';
import styles from './rank.module.scss';

function mapRankToClass(rank: number): string | undefined {
	if ([1, 2, 3].includes(rank)) {
		return styles.hard;
	} else if ([4, 5, 6].includes(rank)) {
		return styles.medium;
	} else if ([7, 8, 9].includes(rank)) {
		return styles.easy;
	}
}

interface RankProps {
	rank: number;
}

const Rank: FC<RankProps> = (props) => (
	<span className={combineClasses(styles.rank, mapRankToClass(props.rank))}>{props.rank} rank</span>
);

export default Rank;
