import React from 'react';

interface IItemListProps {
	items: {[index: number]: string}
}


export const ItemList: React.FC<IItemListProps> = (props) => {
	return (
		<p>
			<span className="field-name">Name: </span>
			<span className="field-value"></span>
		</p>
	)
}