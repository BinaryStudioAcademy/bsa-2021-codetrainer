import React from 'react';
import communityIcon from '../../../../../../assets/icons/community.svg';
import styles from '../stats.module.scss';
import { List } from '../../../list';

interface CommunityProps {
	comments: number;
	collections: number;
	transactions: number;
}

const Community: React.FC<CommunityProps> = (props) => {
	const { comments, collections, transactions } = props;
	const items = [
		{ name: 'Comments', value: comments },
		{ name: 'Collections', value: collections },
		{ name: 'Transactions', value: transactions },
	];

	return (
		<div>
			<div className={styles.header}>
				<img src={communityIcon} id="communityIcon" />
				<label htmlFor="communityIcon" className={styles.iconLabel}>
					Community
				</label>
			</div>
			<List items={items} />
		</div>
	);
};

export default Community;
