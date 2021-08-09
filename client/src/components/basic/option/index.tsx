import React, { useState } from 'react';
import styles from './option.module.scss';
import { IOptionProps } from './interface';
import clsx from 'clsx';

const Option: React.FC<IOptionProps> = ({ value, isActive, onChange }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const optionStyles = clsx(styles.wrapper, { [styles.doNotShow]: !isLoaded, [styles.activeOption]: isActive });

	return (
		<li className={optionStyles} onClick={() => onChange(value)}>
			{value.iconFC ? <value.iconFC onLoad={() => setIsLoaded(true)} width={15} height={15} /> : null}
			<span>{value.title}</span>
		</li>
	);
};

export default Option;
