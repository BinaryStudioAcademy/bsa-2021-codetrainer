import React, { useState } from 'react';
import clsx from 'clsx';
import { IOptionProps } from './types';
import styles from './option.module.scss';

const Option: React.FC<IOptionProps> = ({ value, isActive, onChange }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const optionStyles = clsx(styles.option, {
		[styles.optionUnactive]: !isLoaded,
		[styles.optionActive]: isActive,
	});

	return (
		<li className={optionStyles} onClick={() => onChange(value)}>
			{value.iconFC ? <value.iconFC onLoad={() => setIsLoaded(true)} className={styles.optionIcon} /> : null}
			<span>{value.title}</span>
		</li>
	);
};

export default Option;
