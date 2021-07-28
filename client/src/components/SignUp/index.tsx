import React from 'react';
import Layout from 'components/Layout';
import FormInput from 'components/FormInput';
import { Formik, Form } from 'formik';
import styles from './SignUp.module.css'

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
                placeholder="Enter your first name"
                type="text"
                />
                <FormInput
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                type="text"
                />
                <FormInput
                id="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                />
                <FormInput
                id="password"
                name="password"
                label="Password"
                placeholder="********"
                type="password"
                />
                <FormInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="********"
                type="password"
                />
                <button type="submit" className={styles.submitBtn}>Sign Up</button>
            </Form>
            </Formik>
        </Layout>
    );
};

export default SignUp;