import React from 'react';
import clsx from 'clsx';
import { IMembersSortProps } from './types';
import { SortOptions } from 'containers/clans/clan/logic/state';
import styles from './members-sort-panel.module.scss';

const MembersSortPanel: React.FC<IMembersSortProps> = ({ sortByTime, sortByRank, currentSort }) => {
	return (
		<div className={styles.membersSortPanel}>
			<button
				className={
					currentSort === SortOptions.BY_RANK
						? clsx(styles.membersSortPanelButtonActive, styles.membersSortPanelButton)
						: styles.membersSortPanelButton
				}
				onClick={sortByRank}
			>
				Sort by rank
			</button>
			<button
				className={
					currentSort === SortOptions.BY_TIME
						? clsx(styles.membersSortPanelButtonActive, styles.membersSortPanelButton)
						: styles.membersSortPanelButton
				}
				onClick={sortByTime}
			>
				Sort by time
			</button>
		</div>
	);
};

export default MembersSortPanel;
