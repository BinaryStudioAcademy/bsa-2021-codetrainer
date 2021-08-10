import { FieldProps } from 'formik';

export enum EType {
	TEXT = 'text',
	PASSWORD = 'password',
}

export interface IFormInputProps extends FieldProps {
	id: string;
	name: string;
	label?: string;
	type: string;
	placeholder: string;
}
