import React from 'react';
import styles from './rank-tag.module.scss';

interface IRankTagProps {
	rank: number;
}

const RankTag: React.FC<IRankTagProps> = ({ rank }) => {
	return (
		<div className={styles.rankTag}>
			<span className={styles.rankTagText}>{rank} Rank</span>
		</div>
	);
};

export default RankTag;
