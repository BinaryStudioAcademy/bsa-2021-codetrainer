import React from 'react';
import { Field } from 'formik';
import styles from './FormInput.module.scss';

type Props = {
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder: string;
}

const FormInput: React.FC<Props> = ({id, name, label, type, placeholder})=>{
    return(
        <div>
        <label htmlFor={id} className={styles.label} >{label}</label>
        <Field id={id} name={name} type={type} placeholder={placeholder} className={styles.inputField}/>
        </div>
    );
}

export default FormInput;