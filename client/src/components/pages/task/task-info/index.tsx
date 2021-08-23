import React from 'react';
import styles from './task-info.module.scss';
import { Challenge } from 'components';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import clsx from 'clsx';

export const TaskInfo = () => {
	const challengeProps = {
		id: 'fdsafsa',
		author: {
			firstName: 'fdsa',
			lastName: 'fdsafdsagfds',
			link: '',
		},
		linkToAuthor: '',
		title: 'title',
		rank: 8,
		stats: {
			favoriteSaves: 23,
			positiveFeedback: 88,
		},
		tags: ['fdsafdsa', 'fdsafdsewqrwe', 'terwtree'],
	};
	return (
		<div className={styles.taskInfo}>
			<Challenge {...challengeProps} />
			<div className={styles.buttonsBlock}>
				<Button className={clsx(ButtonClasses.red, ButtonClasses.filled)}>Train</Button>
				<Button className={clsx(ButtonClasses.red, styles.skipButton)}>Skip</Button>
			</div>
		</div>
	);
};
