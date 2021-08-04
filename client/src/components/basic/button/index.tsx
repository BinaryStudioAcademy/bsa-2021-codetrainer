import React from 'react';
import { FC } from 'react';
import { Button as BlueprintButton } from '@blueprintjs/core';
import styles from './button.module.scss';
import clsx from 'clsx';

import { IButtonProps } from './interface';

const Button: FC<IButtonProps> = ({ color = 'blue', children, className, ...remains }) => (
	<BlueprintButton
		{...remains}
		color={color}
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
