import React from 'react';
import { IItemProps } from './types';
import styles from './item.module.scss';

export const Item: React.FC<IItemProps> = ({ value, name }) => {
	return (
		<li className={styles.listItem}>
			{name && <span className={styles.listItemName}>{name}: </span>}
			<span className={styles.listItemValue}>{value || value === 0 ? value : 'Unknown'}</span>
		</li>
	);
};
