import React from 'react';
import { Field } from 'formik';

type Props = {
    id: string;
    name: string;
    label: string;
    type: string;
}

const FormInput: React.FC<Props> = ({id, name, label, type})=>{
    return(
        <div>
        <label htmlFor={id}>{label}</label>
        <Field id={id} name={name} type={type} />
        </div>
    );
}

export default FormInput;