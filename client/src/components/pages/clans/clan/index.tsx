import React from 'react';
import styles from './clan.module.scss';
import { IClanProps } from '../types';
import ClanInfo from './common/clan-info';
import MembersList from './common/members-list';
import MembersSortPanel from './common/members-sort-panel';

const ClanPage: React.FC<IClanProps> = ({ clan, sortByRank, sortByTime }) => {
	return (
		<div className={styles.container}>
			<ClanInfo clan={clan} />
			<section className={styles.membersSection}>
				<MembersSortPanel sortByRank={sortByRank} sortByTime={sortByTime} />
				<MembersList members={clan.members} />
			</section>
		</div>
	);
};

export default ClanPage;
