import React from 'react';
import styles from './nextTask.module.scss';
import { Select, Button } from 'components/basic';
import { TaskDescription } from 'components/common';
import { INextTaskProps } from './interface';

const NextTask: React.FC<INextTaskProps> = ({
	task,
	focusValues,
	activeFocusValue,
	setActiveFocusValue,
	handleTrainClick,
	handleSkipClick,
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
					<Button text="Train" onClick={handleTrainClick} />
					<Button text="Skip" onClick={handleSkipClick} classList={styles.skipButton} />
				</div>
			</div>

			<div className={styles.taskContainer}>
				<TaskDescription rank={task.rank} title={task.title} content={task.description} tags={task.tags} />
			</div>
		</article>
	);
};

export default NextTask;
