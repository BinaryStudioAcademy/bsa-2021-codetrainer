import React, { ReactElement } from 'react';
import styles from './item.module.scss';

export interface IItemProps {
	name: string;
	value?: ReactElement | string | number;
}

export const Item: React.FC<IItemProps> = (props) => {
	const { name } = props;
	const value = props.value || props.value === 0 ? props.value : 'Unknown';

	return (
		<p>
			<span className={styles.fieldName}>{name}: </span>
			<span>{value}</span>
		</p>
	);
};
