export interface ISelectValue {
	title: string;
	icon: string;
}

export interface ISelectProps {
	values: ISelectValue[];
	activeValue: ISelectValue;
	onChange: React.Dispatch<React.SetStateAction<ISelectValue>>;
}
