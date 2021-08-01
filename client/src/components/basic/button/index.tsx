import clsx from 'clsx';
import React from 'react';
import styles from './button.module.scss';
import { IButtonProps } from './interface';

const Button: React.FC<IButtonProps> = ({ text, classList = '', taskButton = false, onClick = () => null }) => {
	const buttonStyles = clsx(styles.button, classList, { [styles.taskButton]: taskButton });

	return (
		<button type="button" className={buttonStyles} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
