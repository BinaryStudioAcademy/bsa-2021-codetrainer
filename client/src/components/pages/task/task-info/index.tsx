import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './task-info.module.scss';
import { Challenge } from 'components';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import clsx from 'clsx';
import { IChallenge } from 'components/common/challenge/types';

export interface ITaskInfoProps {
	challengeProps: IChallenge;
	handleSkipClick: () => void;
}

export const TaskInfo = ({ challengeProps, handleSkipClick }: ITaskInfoProps) => {
	const history = useHistory();

	return (
		<div className={styles.taskInfo}>
			<Challenge {...challengeProps} showAddToCollection={false} />
			<div className={styles.buttonsBlock}>
				<Button
					className={clsx(ButtonClasses.red, ButtonClasses.filled)}
					onClick={() => history.push(`${challengeProps.linkToTask}/train`)}
				>
					Train
				</Button>
				<Button onClick={handleSkipClick} className={clsx(ButtonClasses.red, styles.skipButton)}>
					Skip
				</Button>
			</div>
		</div>
	);
};
