import React from 'react';
import { Checkbox as MaterialCheckbox, FormControlLabel, Typography } from '@material-ui/core';
import styles from './checkbox.module.scss';

interface ICheckboxProps {
	label: string;
	name: string;
	checked: boolean;
	onChange: (check: boolean) => void;
}

const Checkbox: React.FC<ICheckboxProps> = ({ checked, label, name, onChange }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.checked);
	};
	return (
		<FormControlLabel
			control={<MaterialCheckbox checked={checked} name={name} />}
			onChange={() => handleChange}
			label={<Typography className={styles.formControlLabel}>{label}</Typography>}
		/>
	);
};

export default Checkbox;
