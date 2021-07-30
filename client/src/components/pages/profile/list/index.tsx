import React, { ReactElement } from 'react';

interface IListProps {
	items: Array<IItemProps>
}

interface IItemProps {
	name: string,
	value: ReactElement | string | number | undefined;
}

export const List: React.FC<IListProps> = (props) => {

	const list = props.items.map(({ name, value}) => {
		return <Item name={name} value={value} key={name}/>;
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
			<span className="field-name">{name}: </span>
			<span className="field-value">{value}</span>
		</p>
	)
}