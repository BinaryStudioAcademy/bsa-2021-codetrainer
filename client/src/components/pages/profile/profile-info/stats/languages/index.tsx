import React from 'react';
import languagesIcon from '../../../../../../assets/icons/languages.svg';
import { List } from '../../../list';
import { StatsBlock } from '../stats-block';

interface ILanguagesProps {
	languagesTrained: number;
	highestTrained: string;
	mostRecent: string;
}

const Languages: React.FC<ILanguagesProps> = (props) => {
	const { languagesTrained, highestTrained, mostRecent } = props;
	const items = [
		{ name: 'Total Languages Trained', value: languagesTrained },
		{ name: 'Highest Trained', value: highestTrained },
		{ name: 'Most Recent', value: mostRecent },
	];

	return (
		<StatsBlock icon={languagesIcon} title="Languages">
			<List items={items} />
		</StatsBlock>
	);
};

export default Languages;
