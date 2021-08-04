import React from 'react';
import { Challenge } from 'components';
import SearchTask from './search-task';
import styles from './search-page.module.scss';

const SearchPage: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.searchPanel}>
				<SearchTask
					ranks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
					tags={[
						'Fundamentals(350)',
						'Rank Up(45)',
						'Practice and Repeat(13)',
						'Beta(108)',
						'Random(65)',
						'Math(45)',
						'Algorithms(15)',
					]}
				/>
			</div>
			<div className={styles.challengesList}>
				<Challenge
					challenge={{
						author: {
							firstName: 'A',
							lastName: 'B',
							link: '/',
						},
						stats: {
							favouriteSaves: 12,
							positiveFeedback: 12,
						},
						title: 'Title',
						rank: 2,
						tags: ['Tag 1', 'Tag 2'],
					}}
				/>
			</div>
		</div>
	);
};

export default SearchPage;
