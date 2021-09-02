import { FC, HTMLProps } from 'react';
import { FieldProps } from 'formik';

export interface IFormImageProps extends FieldProps {
	id: string;
	name: string;
	title?: string;
	readonly?: boolean;
	imageComponent?: FC<HTMLProps<HTMLImageElement>>
	imageProps?: HTMLProps<HTMLImageElement>;
}
