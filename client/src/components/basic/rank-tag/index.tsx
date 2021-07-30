import React from 'react';
import styles from './rank-tag.module.scss';

const RankTag: React.FC<{ rank: number }> = ({ rank }) => {
	return (
		<div className={styles.rankTag}>
			<span className={styles.rankTagText}>{rank} Rank</span>
		</div>
	);
};

export default RankTag;
