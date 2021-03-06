import React from 'react';
import clsx from 'clsx';
import { Select, Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { TaskDescription } from 'components/common';
import { INextTaskProps } from './interface';
import { ISelectValue } from 'components/basic/select/interface';

import styles from './nextTask.module.scss';

const NextTask: React.FC<INextTaskProps> = ({
	task,
	focusValues,
	activeFocusValue,
	handleTrainClick,
	handleSkipClick,
	onChangeSelect,
}) => {
	const handleChangeSelect = (value: ISelectValue) => {
		onChangeSelect(Number(value.id));
	};
	return (
		<article className={styles.wrapper}>
			<div className={styles.selectingContainer}>
				<h5 className={styles.title}>Next Challenge</h5>

				<div className={styles.focusWrapper}>
					<p className={styles.focusTitle}>Choose Today’s Focus</p>
					<Select
						values={focusValues}
						activeValue={activeFocusValue}
						onChange={handleChangeSelect}
						className={styles.focusSelect}
					/>
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
					'Sorry, there is not any challenge yet.'
				)}
			</div>
		</article>
	);
};

export default NextTask;
