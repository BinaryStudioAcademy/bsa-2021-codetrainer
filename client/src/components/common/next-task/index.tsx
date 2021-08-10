import React from 'react';
import clsx from 'clsx';
import { Select, Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { TaskDescription } from 'components/common';
import { INextTaskProps } from './types';
import styles from './nextTask.module.scss';

const NextTask: React.FC<INextTaskProps> = ({
	task,
	focusValues,
	activeFocusValue,
	setActiveFocusValue,
	onTrainClick,
	onSkipClick,
}) => {
	return (
		<article className={styles.wrapper}>
			<div className={styles.selectingContainer}>
				<h5 className={styles.title}>Next Task</h5>

				<div className={styles.focusWrapper}>
					<p className={styles.focusTitle}>Choose Today’s Focus</p>
					<Select values={focusValues} activeValue={activeFocusValue} onChange={setActiveFocusValue} />
				</div>

				<div>
					<Button className={clsx(ButtonClasses.red, ButtonClasses.filled)}>Train</Button>
					<Button className={clsx(ButtonClasses.red, styles.skipButton)}>Skip</Button>
				</div>
			</div>

			<div className={styles.taskContainer}>
				<TaskDescription rank={task.rank} title={task.title} content={task.description} tags={task.tags} />
			</div>
		</article>
	);
};

export default NextTask;
