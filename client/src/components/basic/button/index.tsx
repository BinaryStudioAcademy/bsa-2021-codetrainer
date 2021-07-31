import React from 'react';

import styles from './button.module.scss';

import { IButtonProps } from './interface';

const Button: React.FC<IButtonProps> = ({ text, classList = '', taskButton = false, onClick = () => null }) => {
	return (
		<button
			type="button"
			className={`${styles.button} ${taskButton ? styles.taskButton : ''} ${classList}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
