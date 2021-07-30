import React, { ReactElement } from 'react';
import styles from './list.module.scss';

interface IListProps {
	items: Array<IItemProps>
}

export interface IItemProps {
	name: string,
	value: ReactElement | string | number | undefined;
}

export const List: React.FC<IListProps> = (props) => {

	const list = props.items.map(({ name, value}, index) => {
		return <Item name={name} value={value} key={index}/>;
	})

	return (
		<div>
			{list}
		</div>
	)
}

export const Item: React.FC<IItemProps> = (props) => {

	const {name} = props;
	const value = props.value ? props.value : 'Unknown';

	return (
		<p>
			<span className={styles.fieldName}>{name}: </span>
			<span>{value}</span>
		</p>
	)
}