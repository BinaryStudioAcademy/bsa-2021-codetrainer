import React from 'react';
import { Checkbox as MaterialCheckbox, FormControlLabel } from '@material-ui/core';
import { ICheckboxProps } from './types';
import styles from './checkbox.module.scss';

const Checkbox: React.FC<ICheckboxProps> = ({ label, name, onChange }) => (
	<FormControlLabel
		control={<MaterialCheckbox onChange={onChange} className={styles.checkbox} name={name} />}
		label={<span className={styles.checkboxLabel}>{label}</span>}
	/>
);

export default Checkbox;
