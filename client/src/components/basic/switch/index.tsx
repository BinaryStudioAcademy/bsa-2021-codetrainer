import React, { ChangeEvent } from 'react';
import { Switch as MaterialSwitch, FormControlLabel } from '@material-ui/core';
import { ISwitchProps } from './types';
import styles from './switch.module.scss';

const Switch: React.FC<ISwitchProps> = ({ label, onChange }) => (
	<FormControlLabel
		control={
			onChange ? (
				<MaterialSwitch
					onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
					className={styles.switch}
				/>
			) : (
				<MaterialSwitch className={styles.switch} />
			)
		}
		label={<span className={styles.switchLabel}>{label}</span>}
	/>
);

export default Switch;
