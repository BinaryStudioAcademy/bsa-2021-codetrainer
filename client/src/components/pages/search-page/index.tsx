import React from 'react';
import SearchTask from './search-task';
import styles from './search-page.module.scss';
import ChallengesList from './challenges-list';
import { IChallenge } from 'components/common/challenge/types';

export interface ISearchPageProps {
	ranks: number[];
	tags: ITag[];
	challenges: IChallenge[];
}

export interface ITag {
	name: string;
	numberOfTasks: number;
}

const SearchPage = ({ ranks, tags, challenges }: ISearchPageProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.searchPanel}>
				<SearchTask
					ranks={ranks}
					tags={tags.map((tag) => {
						return tag.name + '(' + tag.numberOfTasks.toString() + ')';
					})}
				/>
			</div>
			<div className={styles.challengesList}>
				<ChallengesList challenges={challenges} />
			</div>
		</div>
	);
};

export default SearchPage;
