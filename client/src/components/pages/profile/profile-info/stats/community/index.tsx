import React from 'react';
import communityIcon from '../../../../../../assets/icons/community.svg';
import '../stats.scss';
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
			<div className="header">
				<img src={communityIcon} id="communityIcon" />
				<label htmlFor="communityIcon" className="icon-label">
					Community
				</label>
			</div>
			<List items={items} />
		</div>
	);
};

export default Community;
