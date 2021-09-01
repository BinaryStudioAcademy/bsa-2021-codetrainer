import React from 'react';
import clsx from 'clsx';
import { Select, Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { Spinner, TaskDescription } from 'components/common';
import { INextTaskProps } from './interface';

import styles from './nextTask.module.scss';

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
				<h5 className={styles.title}>Next Challenge</h5>

				<div className={styles.focusWrapper}>
					<p className={styles.focusTitle}>Choose Today’s Focus</p>
					<Select values={focusValues} activeValue={activeFocusValue} onChange={setActiveFocusValue} />
				</div>

				<div>
					<Button onClick={handleTrainClick} className={clsx(ButtonClasses.red, ButtonClasses.filled)}>
						Train
					</Button>
					<Button onClick={handleSkipClick} className={clsx(ButtonClasses.red, styles.skipButton)}>
						Skip
					</Button>
				</div>
			</div>

			<div className={styles.taskContainer}>
				{task ? (
					<TaskDescription
						id={task.id}
						rank={task.rank}
						name={task.name}
						description={task.description}
						examples={task.exampleTestCases}
						content={task.description || ''}
						tags={task.tags?.map((item) => item.name)}
					/>
				) : (
					<Spinner />
				)}
			</div>
		</article>
	);
};

export default NextTask;
