import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormInput, CoverLayout } from 'components';
import styles from './reset-password.module.scss';

const ResetPasswordSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	// password: Yup.string().min(8, 'Too short').required('Required'),
	// confirmPassword: Yup.string()
	// 	.min(8, 'Too short')
	// 	.required('Required')
	// 	.test('passwords-match', 'Passwords must match', function (value) {
	// 		return this.parent.password === value;
	// 	}),
});

const ResetPassword: React.FC = () => {
	return (
		<CoverLayout>
			<h4>Forgot Password</h4>
			<Formik
				initialValues={{
					email: '',
				}}
				validationSchema={ResetPasswordSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				<Form>
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
				Back to ?{' '}
				<Link to="/sign-in" className={styles.link}>
					Sign in
				</Link>
			</div>
		</CoverLayout>
	);
};

export default ResetPassword;
