export interface IHeaderProps {
	name: string;
	rank: number;
	notificationCounter: number;
	mark: number;
	avatar?: string;
	listItems: Array<IListItem>;
}

export interface IListItem {
	image: string;
	text: string;
	id: string;
}
