// TODO: remove it and use common Button component

import React, { ButtonHTMLAttributes, FC } from 'react';
import { combineClasses } from 'helpers/combineClasses.helper';
import styles from './button.module.scss';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
	<button {...props} className={combineClasses(styles.button, props.className)}>
		{props.children}
	</button>
);

export default Button;

export const ButtonClasses = Object.freeze({
	red: styles.red,
	blue: styles.blue,
	filled: styles.filled,
});
