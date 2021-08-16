import React from 'react';
import ClansList from './components/clans-list';
import ClansSortPanel from './components/clans-sort-panel';
import { IClansProps } from '../types';
import styles from './clans.module.scss';

const ClansPage: React.FC<IClansProps> = ({
	user,
	clans,
	sortByRank,
	sortBySize,
	sortByTime,
	joinClan,
	leaveClan,
	currentSort,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.sectionHeader}>
				<h1>Clans</h1>
			</div>
			<section className={styles.clansSection}>
				<ClansSortPanel
					sortByRank={sortByRank}
					sortByTime={sortByTime}
					sortBySize={sortBySize}
					currentSort={currentSort}
				/>
				<ClansList joinClan={joinClan} leaveClan={leaveClan} clans={clans} userId={user.id} />
			</section>
		</div>
	);
};

export default ClansPage;
