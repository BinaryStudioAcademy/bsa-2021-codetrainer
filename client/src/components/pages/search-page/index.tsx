import React from 'react';
import { Challenge } from 'components';
import SearchTask from './search-task';
import styles from './search-page.module.scss';

export interface ISearchPageProps {
	ranks: number[];
	tags: ITag[];
	challenge: IChallengeProps;
}
export interface ITag {
	tagName: string;
	numberOfTasks: number;
}
export interface IChallengeProps {
	linkToAuthor: string;
	author: IAuthor;
	stats: IStats;
	title: string;
	rank: number;
	tags: string[];
}
interface IAuthor {
	firstName: string;
	lastName: string;
	link: string;
}
interface IStats {
	favoriteSaves: number;
	positiveFeedback: number;
}
const SearchPage = ({ ranks, tags, challenge }: ISearchPageProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.searchPanel}>
				<SearchTask
					ranks={ranks}
					tags={tags.map((tag) => {
						return tag.tagName + '(' + tag.numberOfTasks.toString() + ')';
					})}
				/>
			</div>
			<div className={styles.challengesList}>
				<Challenge {...challenge} />
			</div>
		</div>
	);
};

export default SearchPage;
