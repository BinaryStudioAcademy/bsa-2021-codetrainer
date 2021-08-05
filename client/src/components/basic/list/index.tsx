import React from 'react';
import { IItemProps, Item } from './item';

interface IListProps {
	items: Array<IItemProps>;
}

export const List: React.FC<IListProps> = (props) => {
	const list = props.items.map(({ name, value }, index) => {
		return <Item name={name} value={value} key={index} />;
	});

	return <div>{list}</div>;
};
