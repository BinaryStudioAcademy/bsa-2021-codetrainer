import React from 'react';
import styles from './index.module.scss';

const RankTag: React.FC<{ rank: number }> = ({ rank }) => {
	return (
		<div className={styles['rank-tag']}>
			<span className={styles['rank-tag__text']}>{rank} Rank</span>
		</div>
	);
};

export default RankTag;
