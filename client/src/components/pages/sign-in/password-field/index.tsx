// TODO: remove it and use common PasswordField component
import React, { useCallback, useState, useRef, FC } from 'react';
import { FieldAttributes } from 'formik';
import FormField, { FORM_FIELD_CLASS } from '../form-field';
import styles from './password-input.module.scss';
import hideIcon from 'assets/icons/hide.svg';
import showIcon from 'assets/icons/show.svg';
import clsx from 'clsx';

const PasswordField: FC<FieldAttributes<any>> = (props) => {
	const [isHiding, setHiding] = useState(true);
	const inputRef = useRef<HTMLButtonElement>();

	const toggleHiding = useCallback(() => {
		setHiding(!isHiding);
	}, [isHiding, setHiding]);

	const focus = useCallback(() => {
		inputRef.current?.focus();
	}, [inputRef]);

	return (
		<div className={clsx(FORM_FIELD_CLASS, styles.password)} onClick={focus}>
			<FormField
				{...props}
				type={isHiding ? 'password' : 'text'}
				innerRef={inputRef}
				name={props.name}
				placeholder={props.placeholder}
				className={styles.input}
			/>
			<button
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					toggleHiding();
				}}
				className={styles.hide}
			>
				<img src={isHiding ? hideIcon : showIcon} width={15} height={15} alt="hide" />
			</button>
		</div>
	);
};

export default PasswordField;