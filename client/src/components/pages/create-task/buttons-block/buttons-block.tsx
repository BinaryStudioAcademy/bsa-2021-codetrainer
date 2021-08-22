import { Button, Select } from 'components/basic';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import React from 'react';
import styles from './buttons-block.module.scss';
import './buttons-block.scss';
import { useState } from 'react';
import { ISelectValue } from 'components/basic/select/interface';
import { useDispatch } from 'react-redux';
import { setTask } from 'containers/create-new-task/logic/actions';

interface IButtonsBlockProps {
	handlePreviewClick: () => void;
	taskId: string | null;
	yourChallengeValues?: ISelectValue[] | null;
	onChallengeChange: (id: string | null) => void;
	handleReset: () => void;
	challengeActiveValue: ISelectValue;
	setChallengeActiveValue: (value: ISelectValue) => void;
	handleGoToChange: (taskId: string | null, actionId: string | null) => void;
}
export const ButtonsBlock = ({
	handlePreviewClick,
	taskId,
	yourChallengeValues,
	onChallengeChange,
	handleReset,
	challengeActiveValue,
	setChallengeActiveValue,
	handleGoToChange,
}: IButtonsBlockProps) => {
	const [goToActiveValue, setGoToActiveValue] = useState<ISelectValue>({
		id: '1',
		title: 'Go to',
	});

	const dispatch = useDispatch();

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
							onChange={(newValue: ISelectValue) => {
								handleGoToChange(taskId, newValue.id);
								setGoToActiveValue(newValue);
							}}
						/>
					</div>
				) : null}

				<div className={clsx('select', { rightPart: taskId ? false : true })}>
					<label className="label">Your challenge</label>
					{yourChallengeValues ? (
						<Select
							values={yourChallengeValues}
							activeValue={challengeActiveValue}
							onChange={(newValue: ISelectValue) => {
								dispatch(setTask({ taskId: newValue.id }));
								if (newValue.id !== '0') {
									onChallengeChange(newValue.id);
								} else {
									handleReset();
								}
								setChallengeActiveValue(newValue);
							}}
							isButtonBlockSelect={true}
						/>
					) : null}
				</div>
			</div>
		</>
	);
};
const goToValues = [
	{
		id: '1',
		title: 'Details',
	},
	{
		id: '2',
		title: 'Discourse',
	},
	{
		id: '3',
		title: 'Solutions',
	},
	{
		id: '4',
		title: 'Translations',
	},
	{
		id: '5',
		title: 'Trainer',
	},
];
