import { TSvgFC } from 'containers/create-new-task/logic/models';

export interface ISelectValue {
	id: string | null;
	title: string;
	icon?: string;
	iconFC?: TSvgFC;
}

export interface ISelectProps {
	className?: string;
	values: ISelectValue[];
	activeValue?: ISelectValue;
	onChange?: (value: ISelectValue) => void;
	isButtonBlockSelect?: boolean;
}
