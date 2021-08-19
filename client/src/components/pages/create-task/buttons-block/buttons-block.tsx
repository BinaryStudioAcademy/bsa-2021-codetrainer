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
}
export const ButtonsBlock = ({ handlePreviewClick }: IButtonsBlockProps) => {
	const [goToActiveValue, setGoToActiveValue] = useState({
		id: 1,
		title: 'Go to',
	});
	const [challengeActiveValue, setChallengeActiveValue] = useState({
		id: 1,
		title: 'Go to',
	});
	return (
		<>
			<div className={styles.buttonsBlock}>
				<Button className={clsx(ButtonClasses.red, styles.button)} onClick={handlePreviewClick}>
					Preview
				</Button>
				<div className="select">
					<label className="label">Go to</label>
					<Select
						values={goToValues}
						activeValue={goToActiveValue}
						onChange={(newValue: ISelectValue) => setGoToActiveValue(newValue)}
					/>
				</div>
				<div className="select">
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
		title: 'Go to',
	},
	{
		id: 2,
		title: 'Sopmethin else',
	},
];

const challengeValues = [
	{
		id: 1,
		title: 'New challenge',
	},
	{
		id: 2,
		title: 'Sopmethin else',
	},
];
