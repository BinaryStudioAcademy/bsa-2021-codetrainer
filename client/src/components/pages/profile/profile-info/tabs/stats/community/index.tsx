import React from 'react';
import communityIcon from 'assets/icons/community.svg';
import { List } from 'components/basic/list';
import { StatsBlock } from '../stats-block';

export interface ICommunityProps {
	comments: number;
	collections: number;
}

const Community: React.FC<ICommunityProps> = (props) => {
	const { comments, collections } = props;
	const items = [
		{ name: 'Comments', value: `${comments}` },
		{ name: 'Collections', value: collections },
	];

	return (
		<StatsBlock icon={communityIcon} title="Community">
			<List items={items} />
		</StatsBlock>
	);
};

export default Community;
