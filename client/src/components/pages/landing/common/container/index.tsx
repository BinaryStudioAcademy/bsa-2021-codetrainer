import React from 'react';
import clsx from 'clsx';
import styles from './container.module.scss';

const Container: React.FC<{ fluid?: boolean; className?: string }> = ({
	fluid = false,
	children,
	className,
	...props
}) => {
	return (
		<div className={fluid ? clsx(styles.containerFluid, className) : clsx(styles.container, className)} {...props}>
			{children}
		</div>
	);
};

export default Container;
