import React from 'react';
import { SearchTask } from './search-task';
import styles from './search-page.module.scss';
import ChallengesList from './challenges-list';
import { IChallenge } from 'components/common/challenge/types';
import { ISearchState } from 'containers/search-page/logic/state';

export interface ISearchPageProps {
	data: {
		ranks: number[];
		tags: {
			name: string;
			numberOfTasks: number;
		}[];
		challenges: IChallenge[];
	};
	filter: ISearchState['filter'];
	onChange: (filter: Record<string, any>) => void;
	onSubmit: () => void;
}

const SearchPage: React.FC<ISearchPageProps> = (props) => {
	const { data, filter, onChange, onSubmit } = props;
	return (
		<div className={styles.container}>
			<div className={styles.searchPanel}>
				<SearchTask
					ranks={data.ranks}
					tags={data.tags.map((tag) => ({
						label: tag.name + '(' + tag.numberOfTasks.toString() + ')',
						name: tag.name,
					}))}
					filter={filter}
					onSubmit={onSubmit}
					onChange={onChange}
				/>
			</div>
			<div className={styles.challengesList}>
				<ChallengesList challenges={data.challenges} />
			</div>
		</div>
	);
};

export default SearchPage;
