import React, { useState } from 'react';
import clsx from 'clsx';
import Option from './components/option';
import { ISelectProps, ISelectValue } from './types';
import arrowIcon from './assets/arrow.svg';
import styles from './select.module.scss';

const Select: React.FC<ISelectProps> = ({ activeValue, values, onChange }) => {
	const [optionsListActive, setOptionsListActive] = useState(false);
	const [activeOption, setActiveOption] = useState<ISelectValue | undefined>(activeValue);

	const listStyles = clsx(styles.optionsList, {
		[styles.optionsActive]: optionsListActive,
	});

	const changeHandler = (value: ISelectValue) => {
		setOptionsListActive(false);
		setActiveOption(value);
		if (onChange) {
			onChange(value);
		}
	};

	return (
		<div className={styles.selectWrapper}>
			<h5 className={styles.select} onClick={() => setOptionsListActive(!optionsListActive)}>
				{activeOption && activeOption.iconFC ? (
					<activeOption.iconFC className={styles.selectIcon} />
				) : (
					<img src={arrowIcon} alt="Icon" className={styles.selectIcon} />
				)}
				{activeOption && activeOption.title}
			</h5>
			<ul className={listStyles}>
				{values.map((value, index) => (
					<Option
						key={index}
						value={value}
						isActive={value.id === activeOption?.id}
						onChange={changeHandler}
					/>
				))}
			</ul>
		</div>
	);
};

export default Select;
