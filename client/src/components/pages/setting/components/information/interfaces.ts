import { IListItem } from '../list-radio/interfaces';

export interface IInformationProps {
	list: IList;
	formItems: Array<IFormItem>;
	onSubmit: (form: any) => void;
}

interface IList {
	initialValue?: string;
	name: string;
	items: Array<IListItem>;
}

export interface IFormItem {
	id: string;
	name: string;
	label: string;
	placeholder: string;
	initialText?: string | Array<string>;
	type: string;
	readonly?: boolean;
}
