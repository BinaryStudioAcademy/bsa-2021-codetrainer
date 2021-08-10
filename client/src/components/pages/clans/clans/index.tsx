import React from 'react';
import ClansList from './common/clans-list';
import ClansSortPanel from './common/clans-sort-panel';
import { IClansProps } from '../types';
import styles from './clans.module.scss';

const ClansPage: React.FC<IClansProps> = ({ clans, sortByRank, sortBySize, sortByTime }) => {
	return (
		<div className={styles.container}>
			<div className={styles.sectionHeader}>
				<h1>Clans</h1>
			</div>
			<section className={styles.clansSection}>
				<ClansSortPanel sortByRank={sortByRank} sortByTime={sortByTime} sortBySize={sortBySize} />
				<ClansList clans={clans} />
			</section>
		</div>
	);
};

export default ClansPage;
