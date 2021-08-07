import React from 'react';
import { FC } from 'react';
import { Button as BlueprintButton, ButtonProps } from '@blueprintjs/core';
import styles from './button.module.scss';
import clsx from 'clsx';

interface IButtonProps extends ButtonProps {
	color?: 'blue' | 'red' | 'grey';
}

const Button: FC<IButtonProps> = ({ color = 'blue', children, className, ...remains }) => (
	<BlueprintButton
		{...remains}
		className={clsx(
			styles.button,
			styles[color],
			{
				[styles.filled]: remains.fill,
				[styles.disabled]: remains.disabled,
			},
			className,
		)}
	>
		{children}
	</BlueprintButton>
);

export default Button;
