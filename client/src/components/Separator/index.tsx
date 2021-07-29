import React, { PropsWithChildren, FC, HTMLAttributes } from 'react';
import { combineClasses } from 'helpers/combineClasses.helper';
import styles from './separator.module.scss';

const Separator: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children, className, ...remaining }) => (
	<div
		{...remaining}
		className={combineClasses(className, styles.separator)}
	>
		<hr />
		<span className={styles.content}>
			{children}
		</span>
		<hr />
	</div>
);

export default Separator;
