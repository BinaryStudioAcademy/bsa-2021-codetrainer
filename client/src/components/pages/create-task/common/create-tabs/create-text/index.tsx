import React from 'react';
import { ITabProps } from '../types';

import styles from './styles.module.scss';

export const CreateText: React.FC<ITabProps> = ({ value, onChange, editable }) => {
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = event.target.value;
		onChange(newValue);
	};
	return (
		<textarea
			className={styles.textarea}
			autoFocus
			value={value}
			onChange={handleChange}
			readOnly={!Boolean(editable)}
		/>
	);
};
