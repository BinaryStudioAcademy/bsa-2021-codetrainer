import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
	<button {...props} className={clsx(styles.button, props.className)}>
		{props.children}
	</button>
);

export default Button;

export const ButtonClasses = Object.freeze({
	red: styles.red,
	blue: styles.blue,
	filled: styles.filled,
});
