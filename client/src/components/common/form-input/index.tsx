import React, { useState } from 'react';
import { FieldProps, getIn } from 'formik';
import styles from './form-input.module.scss';
import hideIcon from 'assets/icons/hide.svg';
import showIcon from 'assets/icons/show.svg';
import clsx from 'clsx';

interface IFormInputProps extends FieldProps {
	id: string;
	name: string;
	label?: string;
	type: string;
	placeholder: string;
}

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
				<img
					onClick={togglePasswordVisibility}
					className={clsx(styles.visibilityBtn, type === 'password' && styles.opacity)}
					src={type === 'password' ? showIcon : hideIcon}
					width={20}
					height={25}
					alt="hide"
				/>
			)}
			{isTouched && error && <div className={styles.error}>{error}</div>}
		</div>
	);
};

export default FormInput;
