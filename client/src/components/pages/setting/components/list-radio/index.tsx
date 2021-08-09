import React from 'react';
import styles from './list.module.scss';
import { Field } from 'formik';
import { IListProps, IListItem } from './interfaces';

const List: React.FC<IListProps> = (props) => {
	const getRadioItem = (item: IListItem, key: number) => {
		return (
			<label key={key}>
				<Field type="radio" name={props.name} value={item.value} className={styles.listItem} />
				{item.text}
			</label>
		);
	};

	return (
		<div className={styles.listContainer}>
			<span className={styles.header}>{props.header}</span>
			<div className={styles.listContainer}>
				{props.items.map((item: IListItem, key) => getRadioItem(item, key))}
			</div>
		</div>
	);
};

export default List;
