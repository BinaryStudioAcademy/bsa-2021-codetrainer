import React, { useCallback, useMemo } from 'react';
import { FieldProps } from 'formik';
import styles from './form-select.module.scss';
import Select from 'react-select';

interface IFormSelectProps extends FieldProps {
	id: string;
	label?: string;
	placeholder: string;
	options: { value: string; name: string }[];
}

const FormSelect: React.FC<IFormSelectProps> = ({
	id,
	label,
	placeholder,
	options,
	field: { name, value },
	form: { setFieldValue },
}) => {
	const selected = useMemo(() => options.find((option) => option.value === value), [options, value]);

	const onChange = useCallback(
		(option) => {
			setFieldValue(name, option.value);
		},
		[setFieldValue, name],
	);

	return (
		<div className={styles.selectWrapper}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}
			<Select
				name={name}
				value={selected}
				onChange={onChange}
				placeholder={placeholder}
				options={options}
				styles={{
					singleValue: () => ({
						color: 'var(--text-color)',
					}),
					menu: () => ({
						backgroundColor: 'var(--secondary-container-color)',
						color: 'var(--text-color)',
						fontFamily: 'Montserrat',
						fontWeight: 500,
					}),
					indicatorSeparator: () => ({
						display: 'none',
					}),
					control: (styles) => ({
						...styles,
						backgroundColor: 'var(--secondary-container-color)',
						color: 'var(--text-color)',
						border: '0px',
						padding: '4px 8px',
						borderRadius: '7px',
						fontFamily: 'Montserrat',
						fontWeight: 500,
					}),
				}}
				menuPortalTarget={document.body}
			/>
		</div>
	);
};

export default FormSelect;
