import React, { PropsWithChildren, FC } from 'react';
import { combineClasses } from 'helpers/combineClasses.helper';
import styles from './separator.module.scss';

const Separator: FC<PropsWithChildren<any>> = props => (
	<div 
		{...props}
		className={combineClasses(props.className, styles.separator)}
	>
		<hr />
		<span className={styles.content}>
			{props.children}
		</span>
		<hr />
	</div>
);

export default Separator;
