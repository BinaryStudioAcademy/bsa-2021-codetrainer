import React from 'react';
import { TSortCallback } from '../../types';
import styles from './clans-sort-panel.module.scss';

const ClansSortPanel: React.FC<{ sortByTime: TSortCallback; sortByRank: TSortCallback; sortBySize: TSortCallback }> = ({
	sortByTime,
	sortByRank,
	sortBySize,
}) => {
	return (
		<div className={styles.clansSortPanel}>
			<button className={styles.clansSortPanelButton} onClick={sortByRank}>
				Sort by rank
			</button>
			<button className={styles.clansSortPanelButton} onClick={sortByTime}>
				Sort by creation time
			</button>
			<button className={styles.clansSortPanelButton} onClick={sortBySize}>
				Sort by size
			</button>
		</div>
	);
};

export default ClansSortPanel;
