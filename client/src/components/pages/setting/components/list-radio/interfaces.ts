export interface IListProps {
	header: string;
	name: string;
	items: Array<IListItem>;
}

export interface IListItem {
	value: string;
	text: string;
}
