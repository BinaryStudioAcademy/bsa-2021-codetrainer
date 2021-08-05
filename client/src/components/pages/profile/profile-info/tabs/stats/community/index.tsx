import React from 'react';
import communityIcon from 'assets/icons/community.svg';
import { List } from 'components/basic/list';
import { StatsBlock } from '../stats-block';

export interface ICommunityProps {
	comments: number;
	replies: number;
	collections: number;
	translations: number;
	approved: number;
}

const Community: React.FC<ICommunityProps> = (props) => {
	const { comments, collections, translations, replies, approved } = props;

	const items = [
		{ name: 'Comments', value: `${comments} (${replies} replies)` },
		{ name: 'Collections', value: collections },
		{ name: 'Translations', value: `${translations} (${approved} replies)` },
	];

	return (
		<StatsBlock icon={communityIcon} title="Community">
			<List items={items} />
		</StatsBlock>
	);
};

export default Community;
