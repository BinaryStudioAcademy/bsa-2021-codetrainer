import { FieldProps } from 'formik';

export interface IFormSelectProps extends FieldProps {
	id: string;
	label?: string;
	placeholder: string;
	options: { value: string; name: string }[];
}
