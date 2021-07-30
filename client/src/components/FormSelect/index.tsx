import React, { useCallback, useMemo } from 'react';
import { FieldProps } from 'formik';
import styles from './FormSelect.module.scss';
import Select from 'react-select';

type Props = FieldProps & {
	id: string;
	label?: string;
	placeholder: string;
	options: { value: string; name: string }[];
};

const FormSelect: React.FC<Props> = ({
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
					menu: () => ({
						backgroundColor: '#f0f3f9',
					}),
					input: () => ({
						backgroundColor: '#f0f3f9',
					}),
				}}
				menuPortalTarget={document.body}
			/>
		</div>
	);
};

export default FormSelect;
