import React from 'react';
import communityIcon from '../../../../../../assets/icons/community.svg';
import '../stats.scss';
import { List } from '../../../list';
import { StatsBlock } from '../stats-block';

interface CommunityProps {
	comments: number;
	collections: number;
	transactions: number;
}

const Community: React.FC<CommunityProps> = (props) => {
	const { comments, collections, transactions } = props;
	const items = [{name: 'Comments', value: comments}, {name: 'Collections', value: collections}, {name: 'Transactions', value: transactions}]

	return (
		<StatsBlock icon={communityIcon} title='Community'>
			<List items={items} />
		</StatsBlock>
	);
};

export default Community;
