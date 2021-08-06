export interface ISelectValue {
	id: number;
	title: string;
	icon?: string;
}

export interface ISelectProps {
	values: ISelectValue[];
	activeValue?: ISelectValue;
	onChange?: (value: ISelectValue) => void;
}
