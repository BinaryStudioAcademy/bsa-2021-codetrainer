import React, { FC, useRef } from 'react';
import { FieldProps, getIn } from 'formik';
import styles from './form-number.module.scss';

interface IFormNumberProps extends FieldProps {
	id: string;
	name: string;
	label?: string;
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
	readonly?: boolean;
}

const FormNumber: FC<IFormNumberProps> = ({
	id,
	label,
	min,
	max,
	step,
	placeholder,
	readonly = false,
	field: { name, value, onChange },
	form: { errors, touched },
}: IFormNumberProps) => {
	const numberRef = useRef<HTMLInputElement>(null);
	const error = getIn(errors, name);
	const isTouched = getIn(touched, name);

	return (
		<div className={styles.container}>
			<div className={styles.labelWrapper}>
				{label && (
					<label htmlFor={id} className={styles.label}>
						{label}
					</label>
				)}
			</div>
			<div className={styles.numberWrapper}>
				<input
					id={id}
					name={name}
					type="number"
					value={value}
					onChange={onChange}
					min={min}
					max={max}
					step={step}
					placeholder={placeholder}
					readOnly={readonly}
					className={styles.numberField}
					ref={numberRef}
				/>
				<div className={styles.stepWrapper}>
					<button
						type="button"
						onClick={() =>  {
							if (!readonly) {
								numberRef.current?.stepUp();
								numberRef.current?.focus();
							}
						}}
						tabIndex={-1}
						className={styles.stepUp}
					/>
					<button
						type="button"
						onClick={() => {
							if (!readonly) {
								numberRef.current?.stepDown();
								numberRef.current?.focus();
							}
						}}
						tabIndex={-1}
						className={styles.stepDown}
					/>
				</div>
			</div>
			{isTouched && error && <div className={styles.error}>{error}</div>}
		</div>
	);
};

export default FormNumber;
