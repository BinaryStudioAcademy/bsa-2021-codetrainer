import React from 'react';
import { FC } from 'react';
import { combineClasses } from 'helpers/combineClasses.helper';
import { Button as BlueprintButton, ButtonProps as BlueprintButtonProps } from '@blueprintjs/core';
import styles from './button.module.scss';

interface ButtonProps extends BlueprintButtonProps {
	color?: 'blue' | 'red';
}

const Button: FC<ButtonProps> = ({ color, children, className, ...remains }) => (
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
