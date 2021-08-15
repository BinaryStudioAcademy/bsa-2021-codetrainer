import React from 'react';
import clsx from 'clsx';
import { SortOptions } from 'containers/clans/clans/logic/state';
import { IClansSortProps } from './types';
import styles from './clans-sort-panel.module.scss';

const ClansSortPanel: React.FC<IClansSortProps> = ({ sortByTime, sortByRank, sortBySize, currentSort }) => {
	return (
		<div className={styles.clansSortPanel}>
			<button
				className={
					currentSort === SortOptions.BY_RANK
						? clsx(styles.clansSortPanelButton, styles.clansSortPanelButtonActive)
						: styles.clansSortPanelButton
				}
				onClick={sortByRank}
			>
				Sort by rank
			</button>
			<button
				className={
					currentSort === SortOptions.BY_TIME
						? clsx(styles.clansSortPanelButton, styles.clansSortPanelButtonActive)
						: styles.clansSortPanelButton
				}
				onClick={sortByTime}
			>
				Sort by creation time
			</button>
			<button
				className={
					currentSort === SortOptions.BY_SIZE
						? clsx(styles.clansSortPanelButton, styles.clansSortPanelButtonActive)
						: styles.clansSortPanelButton
				}
				onClick={sortBySize}
			>
				Sort by size
			</button>
		</div>
	);
};

export default ClansSortPanel;
