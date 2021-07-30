import React from 'react';
import { FC } from 'react';
import { combineClasses } from 'helpers/combineClasses.helper';
import { Button as BlueprintButton, ButtonProps as BlueprintButtonProps } from '@blueprintjs/core';
import styles from './button.module.scss';

interface ButtonProps extends BlueprintButtonProps {
	color?: 'blue' | 'red';
}

const Button: FC<ButtonProps> = (props) => (
	<BlueprintButton
		className={combineClasses(
			styles.button,
			styles[props.color as string],
			props.fill ? styles.filled : null,
			props.disabled ? styles.disabled : null,
			props.className,
		)}
	>
		{props.children}
	</BlueprintButton>
);

Button.defaultProps = {
	color: 'blue',
};

export default Button;
