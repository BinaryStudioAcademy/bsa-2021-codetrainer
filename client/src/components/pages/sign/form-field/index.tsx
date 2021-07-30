import React, { FC } from 'react';
import { Field, FieldAttributes } from 'formik';
import { combineClasses } from 'helpers/combineClasses.helper';
import styles from './form-field.module.scss';

const FormField: FC<FieldAttributes<any>> = (props: FieldAttributes<any>) => (
	<Field {...props} className={combineClasses(styles.field, props.className)} />
);

export default FormField;
export const FORM_FIELD_CLASS = styles.field;
