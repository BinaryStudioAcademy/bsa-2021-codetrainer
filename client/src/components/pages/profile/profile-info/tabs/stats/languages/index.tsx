import React from 'react';
import languagesIcon from 'assets/icons/languages.svg';
import { List } from 'components/basic';
import { StatsBlock } from '../stats-block';

export interface ILanguagesProps {
	mostRecent: string;
}

const Languages: React.FC<ILanguagesProps> = (props) => {
	const { mostRecent } = props;
	const items = [{ name: 'Most Recent', value: mostRecent }];

	return (
		<StatsBlock icon={languagesIcon} title="Languages">
			<List items={items} />
		</StatsBlock>
	);
};

export default Languages;
