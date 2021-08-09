import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormInput, CoverLayout } from 'components';
import styles from './forgot-password.module.scss';
import { ROUTES } from 'constants/routes';

const ForgotPasswordSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPassword: React.FC = () => {
	return (
		<CoverLayout>
			<h4>Forgot Password</h4>
			<Formik
				initialValues={{
					email: '',
				}}
				validationSchema={ForgotPasswordSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				<Form className={styles.form}>
					<Field
						id="email"
						name="email"
						label="Email"
						placeholder="Enter your email"
						type="email"
						component={FormInput}
					/>
					<button type="submit" className={styles.submitBtn}>
						Send Password
					</button>
				</Form>
			</Formik>
			<div className={styles.footer}>
				Back to{' '}
				<Link to={ROUTES.SignIn} className={styles.link}>
					Sign in
				</Link>
			</div>
		</CoverLayout>
	);
};

export default ForgotPassword;
