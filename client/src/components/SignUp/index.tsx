import React from 'react';
import Layout from 'components/Layout';
import FormInput from 'components/FormInput';
import { Formik, Form } from 'formik';

const SignUp: React.FC = () =>{
    return (
        <Layout>
            <h4>SignUp</h4>
            <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            onSubmit={values => {
                console.log(values)
            }}
            >
            <Form>
                <FormInput
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                />
                <FormInput
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                />
                <FormInput
                id="email"
                name="email"
                label="Email"
                type="email"
                />
                <FormInput
                id="password"
                name="password"
                label="Password"
                type="password"
                />
                <FormInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                />
                <button type="submit">Sign Up</button>
            </Form>
            </Formik>
        </Layout>
    );
};

export default SignUp;