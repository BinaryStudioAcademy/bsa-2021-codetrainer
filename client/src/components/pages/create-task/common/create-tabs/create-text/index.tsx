import React, { useState } from 'react';
import { ITabProps } from '../types';

import styles from './styles.module.scss';

export const CreateText: React.FC<ITabProps> = ({ text, onChange, editable }) => {
	const [value, setValue] = useState<string>(text);
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = event.target.value;
		setValue(newValue);
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
