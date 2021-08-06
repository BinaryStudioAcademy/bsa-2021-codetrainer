import React, { useState } from 'react';
import styles from './select.module.scss';
import { Option } from '..';
import { ISelectProps, ISelectValue } from './interface';
import clsx from 'clsx';

const Select = ({ values, activeValue, onChange }: ISelectProps) => {
	const [optionsListActive, setOptionsListActive] = useState(true);
	const listStyles = clsx(styles.optionsList, { [styles.optionsActive]: optionsListActive });

	const handleChange = (value: ISelectValue) => {
		setOptionsListActive(false);
		onChange(value);
	};

	return (
		<div className={styles.selectWrapper}>
			<h5 className={styles.select} onClick={() => setOptionsListActive(!optionsListActive)}>
				<img src={activeValue.icon} alt={`${activeValue.title} icon`} />
				{activeValue.title}
			</h5>
			<ul className={listStyles}>
				{values.map((value, index) => (
					<Option key={index} value={value} isActive={value.id === activeValue.id} onChange={handleChange} />
				))}
			</ul>
		</div>
	);
};

export default Select;
