import React from 'react';
import styles from './not-found.module.scss';
import { Button, CoverLayout } from 'components';
import { ButtonClasses } from 'components/basic/button';
import clsx from 'clsx';
import { ROUTES } from 'constants/routes';
import historyHelper from 'helpers/history.helper';
import { TaskList } from 'components/common';

const NotFound: React.FC = () => {
	const tasks = [
		{
			id: '1',
			linkToAuthor: '/',
			author: {
				firstName: 'A',
				lastName: 'B',
				link: '/',
			},
			stats: {
				favoriteSaves: 12,
				positiveFeedback: 12,
			},
			title: 'Title',
			rank: 2,
			tags: ['Tag 1', 'Tag 2'],
		},
		{
			id: '2',
			linkToAuthor: '/',
			author: {
				firstName: 'A',
				lastName: 'B',
				link: '/',
			},
			stats: {
				favoriteSaves: 12,
				positiveFeedback: 12,
			},
			title: 'Title',
			rank: 2,
			tags: ['Tag 1', 'Tag 2'],
		},
	];
	return (
		<>
			<CoverLayout className={styles.container}>
				<div className={styles.content}>
					<div className={styles.mainHeader}>404</div>
					<div className={styles.secondHeader}>You got lost, or we got lost</div>
					<Button
						type="submit"
						className={clsx(ButtonClasses.red, ButtonClasses.filled)}
						onClick={() => historyHelper.push(ROUTES.Home)}
					>
						Go Back
					</Button>
				</div>
			</CoverLayout>
			<TaskList title="Similar tasks" tasks={tasks} />
		</>
	);
};

export default NotFound;
