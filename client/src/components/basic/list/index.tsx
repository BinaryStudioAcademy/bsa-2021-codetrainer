import React from 'react';
import { Item } from './item';
import { IListProps } from './types';
import styles from './list.module.scss';

const List: React.FC<IListProps> = ({ items }) => {
	return (
		<ul className={styles.list}>
			{items.map(({ name, value }, index) => (
				<Item name={name} value={value} key={index} />
			))}
		</ul>
	);
};

export default List;
