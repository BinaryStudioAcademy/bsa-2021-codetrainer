import React, { useState } from 'react';
import { getIn } from 'formik';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IFormInputProps, EType } from './types.d';
import styles from './form-input.module.scss';

const FormInput: React.FC<IFormInputProps> = ({
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
	const isPasswordField = initialType === EType.PASSWORD;

	const togglePasswordVisibility = () => {
		const newType = type === EType.PASSWORD ? EType.TEXT : EType.PASSWORD;
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
			{isPasswordField ? (
				type === EType.TEXT ? (
					// @ts-ignore
					<VisibilityOffIcon onClick={togglePasswordVisibility} className={styles.visibilityButton} />
				) : (
					<VisibilityIcon onClick={togglePasswordVisibility} className={styles.visibilityButton} />
				)
			) : null}
			{isTouched && error && <div className={styles.error}>{error}</div>}
		</div>
	);
};

export default FormInput;
