import React, { FC } from 'react';
import { Checkbox as BlueprintCheckbox, CheckboxProps } from '@blueprintjs/core';
import { combineClasses } from 'helpers/combineClasses.helper';
import styles from './checkbox.module.scss';

const Checkbox: FC<CheckboxProps> = ({ children, className, ...remains }) => (
	<BlueprintCheckbox {...remains} className={combineClasses(styles.checkbox, className)}>
		<span className={styles.label}>{children}</span>
	</BlueprintCheckbox>
);

export default Checkbox;
