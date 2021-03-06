import React, { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

import styles from './button.module.scss';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
	<button {...props} className={clsx(styles.button, props.className, { [styles.disabled]: props.disabled })}>
		{props.children}
	</button>
);

export default Button;

export const ButtonClasses = Object.freeze({
	red: styles.red,
	blue: styles.blue,
	filled: styles.filled,
});
