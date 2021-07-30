import React from 'react';
import languagesIcon from '../../../../../../assets/icons/languages.svg';
import '../stats.scss';
import { List } from '../../../list';

interface LanguagesProps {
	languagesTrained: number;
	highestTrained: string;
	mostRecent: string;
}

const Languages: React.FC<LanguagesProps> = (props) => {
	const { languagesTrained, highestTrained, mostRecent } = props;
	const items = [
		{ name: 'Total Languages Trained', value: languagesTrained },
		{ name: 'Highest Trained', value: highestTrained },
		{ name: 'Most Recent', value: mostRecent },
	];

	return (
		<div>
			<div className="header">
				<img src={languagesIcon} id="languagesIcon" />
				<label htmlFor="languagesIcon" className="icon-label">
					Languages
				</label>
			</div>
			<List items={items} />
		</div>
	);
};

export default Languages;
