import React, { useCallback, useState, FC } from 'react';
import { FieldAttributes } from 'formik';
import { combineClasses } from 'helpers/combineClasses.helper';
import FormField from 'components/FormField';
import formStyles from 'components/FormField/form-field.module.scss';
import passwordStyles from './password-input.module.scss';
import hideIcon from 'assets/icons/hide.svg';
import showIcon from 'assets/icons/show.svg';

const PasswordField: FC<FieldAttributes<any>> = props => {
	const [isHiding, setHiding] = useState(true);
	const inputRef = React.createRef<HTMLButtonElement>();

	const toggleHiding = useCallback(() => {
		setHiding(!isHiding);
	}, [isHiding, setHiding]);

	const focus = useCallback(() => {
		inputRef.current?.focus();
	}, [inputRef]);

	return (
		<div
			className={combineClasses(formStyles.field, passwordStyles.password)}
			onClick={focus}
		>
			<FormField
				{...props}
				type={isHiding ? 'password' : 'text'}
				innerRef={inputRef}
				name={props.name}
				placeholder={props.placeholder}
				className={passwordStyles.input}
			/>
			<button
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					toggleHiding();
				}}
				className={passwordStyles.hide}
			>
				<img
					src={isHiding ? hideIcon : showIcon}
					width={15}
					height={15}
					alt="hide"
				/>
			</button>
		</div>
	);
}

export default PasswordField;
