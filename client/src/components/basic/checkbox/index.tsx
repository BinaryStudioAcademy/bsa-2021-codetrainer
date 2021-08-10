import React from 'react';
import {
	Checkbox as MaterialCheckbox,
	FormControlLabel,
	Typography
} from '@material-ui/core';
import styles from './checkbox.module.scss';

interface ICheckboxProps {
	label: string;
	name: string;
}

const Checkbox: React.FC<ICheckboxProps> = ({ label, name }) => {
	return (
		<FormControlLabel control={<MaterialCheckbox name={name} />} label={<Typography className={styles.formControlLabel}>{label}</Typography>} />
	)
}

export default Checkbox;
