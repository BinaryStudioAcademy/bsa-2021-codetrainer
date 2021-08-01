import React, { FC } from 'react';
import { Checkbox as BlueprintCheckbox, CheckboxProps } from '@blueprintjs/core';
import clsx from 'clsx';
import styles from './checkbox.module.scss';

const Checkbox: FC<CheckboxProps> = ({ children, className, ...remains }) => (
	<BlueprintCheckbox {...remains} className={clsx(styles.checkbox, className)}>
		<span className={styles.label}>{children}</span>
	</BlueprintCheckbox>
);

export default Checkbox;
