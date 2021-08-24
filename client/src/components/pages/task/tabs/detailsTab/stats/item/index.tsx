import React from 'react';
import styles from './item.module.scss';

export interface IItemProps {
	item: string;
	value: string;
}

export const Item = ({ item, value }: IItemProps) => {
	return (
		<div className={styles.listItem}>
			<span>{item}</span>
			<span>{value}</span>
		</div>
	);
};
