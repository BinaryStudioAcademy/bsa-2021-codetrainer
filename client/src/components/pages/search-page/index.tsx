import React from 'react';
import Challenge from 'components/common/challenge';
import SearchTask from './search-task';
import styles from './search-page.module.scss';

const SearchPage: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.searchPanel}>
				<SearchTask />
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
