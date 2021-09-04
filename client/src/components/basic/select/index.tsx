import React, { useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';
import styles from './select.module.scss';
import { Option } from '..';
import { ISelectProps, ISelectValue } from './interface';
import clsx from 'clsx';

const Select = ({ values, activeValue, onChange, className }: ISelectProps) => {
	const [optionsListActive, setOptionsListActive] = useState(false);
	const listStyles = clsx(styles.optionsList, { [styles.optionsActive]: optionsListActive });
	const handleChange = (value: ISelectValue) => {
		setOptionsListActive(false);
		if (onChange) {
			onChange(value);
		}
	};
	const wrapperClass = clsx(styles.selectWrapper, styles.buttonBlock);

	return (
		<ClickAwayListener onClickAway={() => setOptionsListActive(false)}>
			<div className={clsx(wrapperClass, className)}>
				<h5 className={styles.select} onClick={() => setOptionsListActive(!optionsListActive)}>
					{activeValue?.icon && <img src={activeValue?.icon} alt="icon" />}
					<span>{activeValue?.title}</span>
				</h5>
				<ul className={listStyles}>
					{values.map((value, index) => (
						<Option
							key={index}
							value={value}
							isActive={value.id === activeValue?.id}
							onChange={handleChange}
						/>
					))}
				</ul>
			</div>
		</ClickAwayListener>
	);
};

export default Select;
