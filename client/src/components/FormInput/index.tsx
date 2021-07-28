import { FieldProps, getIn } from 'formik';
import React from 'react';
import styles from './FormInput.module.scss';

type Props = FieldProps & {
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder: string;
}

const FormInput: React.FC<Props> = ({
        id,
        label,
        type,
        placeholder,
        field: { name, value, onChange},
        form: {errors, touched}
    })=>{
        const error = getIn(errors, name);
        const isTouched = getIn(touched, name);

    return(
        <div className={styles.inputWrapper}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input
                id={id}
                name={name}
                onChange={onChange}
                value={value}
                type={type}
                placeholder={placeholder}
                className={styles.inputField}
            />
            {isTouched && error && <div className={styles.error}>{error}</div>}
        </div>
    );
}

export default FormInput;