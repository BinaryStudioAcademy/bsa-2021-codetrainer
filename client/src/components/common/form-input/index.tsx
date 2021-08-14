import React, { useState } from 'react';
import { FieldProps, getIn } from 'formik';
import styles from './form-input.module.scss';
import hideIcon from 'assets/icons/hide.svg';
import showIcon from 'assets/icons/show.svg';
import { Link } from 'react-router-dom';

interface IFormInputProps extends FieldProps {
	id: string;
	name: string;
	label?: string;
	type: string;
	placeholder: string;
	showForgotPassword: boolean;
}

const FormInput: React.FC<IFormInputProps> = ({
	id,
	label,
	type: initialType,
	placeholder,
	field: { name, value, onChange },
	form: { errors, touched },
	showForgotPassword = false,
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
		<div className={styles.container}>
			<div className={styles.labelWrapper}>
				{label && (
					<label htmlFor={id} className={styles.label}>
						{label}
					</label>
				)}
				{showForgotPassword && (
					<Link to="forgot-password" className={styles.forgot}>
						Forgot password?
					</Link>
				)}
			</div>
			<div className={styles.inputWrapper}>
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
					<div className={styles.iconWrapper} onClick={togglePasswordVisibility}>
						<img src={type === 'password' ? hideIcon : showIcon} className={styles.visibilityIcon} />
					</div>
				)}
			</div>
			{isTouched && error && <div className={styles.error}>{error}</div>}
		</div>
	);
};

export default FormInput;
