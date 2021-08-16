import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './separator.module.scss';

const Separator: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...remaining }) => (
	<div {...remaining} className={clsx(className, styles.separator)}>
		<hr />
		<span className={styles.content}>{children}</span>
		<hr />
	</div>
);

export default Separator;
