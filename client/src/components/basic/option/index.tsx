import React, { useState } from 'react';

import styles from './option.module.scss';

import { IOptionProps } from './interface';

const Option: React.FC<IOptionProps> = ({ value, isActive, onChange }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<li
			className={[styles.wrapper, !isLoaded ? styles.doNotShow : '', isActive ? styles.activeOption : ''].join(
				' ',
			)}
			onClick={() => onChange(value)}
		>
			<img src={value.icon} alt={`${value.title} icon`} onLoad={() => setIsLoaded(true)} />
			{value.title}
		</li>
	);
};

export default Option;
