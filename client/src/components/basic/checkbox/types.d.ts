import { ChangeEvent, HTMLInputElement } from 'react';

export interface ICheckboxProps {
	label: string;
	name: string;
	onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}
