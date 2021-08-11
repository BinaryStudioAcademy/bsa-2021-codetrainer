import { IListItem } from '../list-radio/interfaces';

export interface IInformationProps {
	list: IList;
	formItems: Array<IFormItem>;
}

interface IList {
	initialValue: string;
	name: string;
	items: Array<IListItem>;
}

export interface IFormItem {
	id: string;
	name: string;
	label: string;
	placeholder: string;
	initialText: string;
	type: string;
}
