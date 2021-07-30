import React, { useState } from 'react';
import { FieldProps, getIn } from 'formik';
import styles from './form-input.module.scss';
import { Icon } from '@blueprintjs/core';

type Props = FieldProps & {
	id: string;
	name: string;
	label?: string;
	type: string;
	placeholder: string;
};

const FormInput: React.FC<Props> = ({
	id,
	label,
	type: initialType,
	placeholder,
	field: { name, value, onChange },
	form: { errors, touched },
}) => {
	const error = getIn(errors, name);
	const isTouched = getIn(touched, name);
	const [type, setType] = useState(initialType);
	const isPasswordField = initialType === 'password';

	const togglePasswordVisibility = () => {
		const newType = type === 'password' ? 'text' : 'password';
		setType(newType);
	};

	return (
		<div className={styles.inputWrapper}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}
			<input
				id={id}
				name={name}
				onChange={onChange}
				value={value}
				type={type}
				placeholder={placeholder}
				className={isPasswordField ? styles.passwordField : styles.inputField}
			/>
			{isPasswordField && (
				//@ts-ignore
				<Icon onClick={togglePasswordVisibility} icon="eye-off" className={styles.visibilityBtn} />
			)}
			{isTouched && error && <div className={styles.error}>{error}</div>}
		</div>
	);
};

export default FormInput;
