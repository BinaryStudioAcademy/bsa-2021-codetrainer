import { Button, Select } from 'components/basic';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import React from 'react';
import styles from './buttons-block.module.scss';
import './buttons-block.scss';
import { useState } from 'react';
import { ISelectValue } from 'components/basic/select/interface';

interface IButtonsBlockProps {
	handlePreviewClick: () => void;
	taskId: string | null;
}
export const ButtonsBlock = ({ handlePreviewClick, taskId }: IButtonsBlockProps) => {
	const [goToActiveValue, setGoToActiveValue] = useState({
		id: 1,
		title: 'Go to',
	});
	const [challengeActiveValue, setChallengeActiveValue] = useState({
		id: 0,
		title: 'Switch task',
	});
	return (
		<>
			<div className={styles.buttonsBlock}>
				{taskId ? (
					<Button className={clsx(ButtonClasses.red, styles.button)} onClick={handlePreviewClick}>
						Preview
					</Button>
				) : null}
				{taskId ? (
					<div className="select">
						<label className="label">Go to</label>
						<Select
							values={goToValues}
							activeValue={goToActiveValue}
							onChange={(newValue: ISelectValue) => setGoToActiveValue(newValue)}
						/>
					</div>
				) : null}

				<div className={clsx('select', { rightPart: taskId ? false : true })}>
					<label className="label">Your challenge</label>
					<Select
						values={challengeValues}
						activeValue={challengeActiveValue}
						onChange={(newValue: ISelectValue) => setChallengeActiveValue(newValue)}
						isButtonBlockSelect={true}
					/>
				</div>
			</div>
		</>
	);
};
const goToValues = [
	{
		id: 1,
		title: 'Details',
	},
	{
		id: 2,
		title: 'Discourse',
	},
	{
		id: 3,
		title: 'Solutions',
	},
	{
		id: 4,
		title: 'Translations',
	},
	{
		id: 5,
		title: 'Revisions',
	},
	{
		id: 6,
		title: 'Trainer',
	},
];

const challengeValues = [
	{
		id: 1,
		title: 'New task',
	},
	{
		id: 2,
		title: 'User task1',
	},
	{
		id: 3,
		title: 'User task2',
	},
];
