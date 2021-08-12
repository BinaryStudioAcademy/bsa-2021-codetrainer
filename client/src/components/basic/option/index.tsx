import React, { useState } from 'react';
import styles from './option.module.scss';
import { IOptionProps } from './interface';
import clsx from 'clsx';

const Option: React.FC<IOptionProps> = ({ value, isActive, onChange }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const optionStyles = clsx(styles.wrapper, { [styles.doNotShow]: !isLoaded, [styles.activeOption]: isActive });

	return (
		<li className={optionStyles} onClick={() => onChange(value)}>
			{value.icon && <img src={value.icon} alt="icon" onLoad={() => setIsLoaded(true)} />}
			<span>{value.title}</span>
		</li>
	);
};

export default Option;
