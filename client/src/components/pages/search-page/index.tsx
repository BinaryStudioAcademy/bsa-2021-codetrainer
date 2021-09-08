import React from 'react';
import { InView } from 'react-intersection-observer';
import { SearchTask } from './search-task';
import styles from './search-page.module.scss';
import ChallengesList from './challenges-list';
import { IChallenge } from 'components/common/challenge/types';
import { ISearchState } from 'containers/search-page/logic/state';

export interface ISearchPageProps {
	data: {
		count: number;
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
	onChangePage: (isChange: boolean) => void;
	updateTaskFavoriteStatus: (id: string) => void;
}

const SearchPage: React.FC<ISearchPageProps> = (props) => {
	const { data, filter, onChange, onSubmit, onChangePage, updateTaskFavoriteStatus } = props;
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
				<ChallengesList
					count={data.count}
					challenges={data.challenges}
					updateTaskFavoriteStatus={updateTaskFavoriteStatus}
				/>
				{Boolean(data.count) && data.challenges.length < data.count ? (
					<InView onChange={onChangePage} className={styles.challengesLoading}>
						Loading...
					</InView>
				) : null}
			</div>
		</div>
	);
};

export default SearchPage;
