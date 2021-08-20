import React from 'react';
import { IClanProps } from '../types';
import ClanInfo from './components/clan-info';
import MembersList from './components/members-list';
import MembersSortPanel from './components/members-sort-panel';
import styles from './clan.module.scss';

const ClanPage: React.FC<IClanProps> = ({
	clan,
	sortByRank,
	sortByTime,
	leaveClan,
	currentSort,
	handleInviteClick,
}) => {
	return (
		<div className={styles.container}>
			<ClanInfo clan={clan} leaveClan={leaveClan} handleInviteClick={handleInviteClick} />
			<section className={styles.membersSection}>
				<MembersSortPanel sortByRank={sortByRank} sortByTime={sortByTime} currentSort={currentSort} />
				<MembersList members={clan.members} />
			</section>
		</div>
	);
};

export default ClanPage;
