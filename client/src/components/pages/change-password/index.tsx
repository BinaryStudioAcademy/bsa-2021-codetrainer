import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormInput, CoverLayout } from 'components';
import styles from './change-password.module.scss';
import { ROUTES } from 'constants/routes';
import { IRecoverPassword } from '../forgot-password/types';
import { Errors } from '../forgot-password/errors/errors';

const ChangePasswordSchema = Yup.object().shape({
	password: Yup.string().min(8, 'Too short').required('Required'),
	confirmPassword: Yup.string()
		.min(8, 'Too short')
		.required('Required')
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.password === value;
		}),
});

const ChangePassword: React.FC<IRecoverPassword> = ({ onSubmit, errors }) => {
	return (
		<CoverLayout>
			<h4>Change Password</h4>
			<Errors errors={errors} />
			<Formik
				initialValues={{
					password: '',
					confirmPassword: '',
				}}
				validationSchema={ChangePasswordSchema}
				onSubmit={({ password }) => onSubmit(password)}
			>
				<Form className={styles.form}>
					<Field
						id="password"
						name="password"
						label="Password"
						placeholder="********"
						type="password"
						component={FormInput}
					/>
					<Field
						id="confirmPassword"
						name="confirmPassword"
						label="Confirm Password"
						placeholder="********"
						type="password"
						component={FormInput}
					/>
					<button type="submit" className={styles.submitBtn}>
						Change Password
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

export default ChangePassword;
