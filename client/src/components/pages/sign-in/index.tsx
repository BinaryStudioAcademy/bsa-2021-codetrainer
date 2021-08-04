import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import clsx from 'clsx';
import { ISignInForm } from 'typings/sign-in-form';
import { SIGN_IN_SCHEMA } from './config';
import CoverLayout from './cover-layout';
import PasswordField from './password-field';
import FormField from './form-field';
import Separator from './separator';
import Button, { ButtonClasses } from './button';
import styles from './sign-in.module.scss';
import { ROUTES } from 'constants/routes';

interface ISignInPageProps {
	onFormSubmit: (form: ISignInForm) => void;
	onGithubSignIn?: () => void;
	error?: string;
}

const SignInPage: React.FC<ISignInPageProps> = ({ onFormSubmit, onGithubSignIn = () => {}, error }) => {
	return (
		<CoverLayout className={styles.signIn}>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={SIGN_IN_SCHEMA}
				onSubmit={onFormSubmit}
			>
				{({ errors, touched, isValidating }) => (
					<Form className={styles.form}>
						<h4>Sign in</h4>
						{!!error && <div className={styles.error}>{error}</div>}
						<Button type="button" className={ButtonClasses.red} onClick={onGithubSignIn}>
							Sing in with GitHub
						</Button>
						<Separator className={styles.light}>or</Separator>
						<div>
							<div className={styles.labelWrapper}>
								<label htmlFor="email">Email</label>
							</div>
							<FormField
								id="email"
								name="email"
								placeholder="Email"
								className={clsx({ [styles.error]: errors.email })}
							/>
							<div className={styles.errorLabel}>{touched.email && errors.email}</div>
						</div>
						<div>
							<div className={styles.labelWrapper}>
								<label htmlFor="password">Password</label>
								<Link to="forgot-password" className={styles.right}>
									Forgot password?
								</Link>
							</div>
							<PasswordField
								id="password"
								name="password"
								placeholder="Password"
								className={clsx({ [styles.error]: errors.password })}
							/>
							<div className={styles.errorLabel}>{touched.password && errors.password}</div>
						</div>
						<Button type="submit" className={clsx(ButtonClasses.red, ButtonClasses.filled)}>
							Sign in
						</Button>
					</Form>
				)}
			</Formik>
			<footer>
				No account? <Link to={ROUTES.Register}>Sign up</Link>
			</footer>
		</CoverLayout>
	);
};

export default SignInPage;
