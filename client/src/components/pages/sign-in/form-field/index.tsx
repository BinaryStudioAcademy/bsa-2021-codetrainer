// TODO: remove it and use common FormField component

import React, { FC } from 'react';
import { Field, FieldAttributes } from 'formik';
import clsx from 'clsx';
import styles from './form-field.module.scss';

const FormField: FC<FieldAttributes<any>> = (props: FieldAttributes<any>) => (
	<Field {...props} className={clsx(styles.field, props.className)} />
);

export default FormField;
export const FORM_FIELD_CLASS = styles.field;