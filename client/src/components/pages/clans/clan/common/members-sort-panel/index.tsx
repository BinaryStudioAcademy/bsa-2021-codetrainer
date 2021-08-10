import React from 'react';
import { TSortCallback } from '../../../types';
import styles from './members-sort-panel.module.scss';

const MembersSortPanel: React.FC<{ sortByTime: TSortCallback; sortByRank: TSortCallback }> = ({
	sortByTime,
	sortByRank,
}) => {
	return (
		<div className={styles.membersSortPanel}>
			<button className={styles.membersSortPanelButton} onClick={sortByRank}>
				Sort by rank
			</button>
			<button className={styles.membersSortPanelButton} onClick={sortByTime}>
				Sort by time
			</button>
		</div>
	);
};

export default MembersSortPanel;
