import React from 'react';
import clsx from 'clsx';
import { Button, Select } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { useState } from 'react';
import { ISelectValue } from 'components/basic/select/interface';

import styles from './buttons-block.module.scss';
import './buttons-block.scss';

interface IButtonsBlockProps {
	taskId: string | null;
	goToValues: ISelectValue[];
	tasks: ISelectValue[];
	onPreviewClick: () => void;
	onGoToChange: (id: string, newValue: string) => void;
	onTaskChange: (id: string) => void;
}
export const ButtonsBlock: React.FC<IButtonsBlockProps> = (props) => {
	const { taskId, onGoToChange, onTaskChange, onPreviewClick, goToValues, tasks } = props;
	const [goToActiveValue, setGoToActiveValue] = useState<ISelectValue>(goToValues[0]);
	const test = tasks.find((task) => task.id === taskId);
	return (
		<div className={styles.buttonsBlock}>
			{taskId ? (
				<Button className={clsx(ButtonClasses.red, styles.button)} onClick={onPreviewClick}>
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
							if (newValue.id) {
								onGoToChange(taskId, newValue.id);
							}
							setGoToActiveValue(newValue);
						}}
					/>
				</div>
			) : null}

			<div className={clsx('select', { rightPart: taskId ? false : true })}>
				<label className="label">Your challenge</label>
				<Select
					values={tasks}
					activeValue={test}
					onChange={({ id }) => {
						if (typeof id === 'string' && id !== taskId) {
							onTaskChange(id);
						}
					}}
					isButtonBlockSelect={true}
				/>
			</div>
		</div>
	);
};
