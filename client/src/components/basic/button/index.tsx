import React from 'react';
import { FC } from 'react';
import { combineClasses } from 'helpers/combineClasses.helper';
import { Button as BlueprintButton, ButtonProps } from '@blueprintjs/core';
import styles from './button.module.scss';

interface IButtonProps extends ButtonProps {
	color?: 'blue' | 'red';
}

const Button: FC<IButtonProps> = ({ color, children, className, ...remains }) => (
	<BlueprintButton
		{...remains}
		className={combineClasses(
			styles.button,
			styles[color as string],
			remains.fill ? styles.filled : null,
			remains.disabled ? styles.disabled : null,
			className,
		)}
	>
		{children}
	</BlueprintButton>
);

Button.defaultProps = {
	color: 'blue',
};

export default Button;
