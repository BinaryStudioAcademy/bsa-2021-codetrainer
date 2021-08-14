import React from 'react';
import clsx from 'clsx';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { ISignInForm } from 'typings/sign-in-form';
import { SIGN_IN_SCHEMA } from './config';
import { CoverLayout, Separator } from 'components/common';
import Button, { ButtonClasses } from 'components/basic/button';
import { ROUTES } from 'constants/routes';
import { FormInput } from 'components';
import styles from '../sign-up/sign-up.module.scss';

interface ISignInPageProps {
	onFormSubmit: (form: ISignInForm) => void;
	onGithubSignIn?: () => void;
	error?: string;
}

const SignInPage: React.FC<ISignInPageProps> = ({ onFormSubmit, onGithubSignIn = () => {}, error }) => {
	return (
		<CoverLayout>
			<h4>Sign in</h4>
			{!!error && <div className={styles.error}>{error}</div>}
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={SIGN_IN_SCHEMA}
				onSubmit={onFormSubmit}
			>
				<Form className={styles.form}>
					<Button type="button" className={ButtonClasses.red} onClick={onGithubSignIn}>
						Sing in with GitHub
					</Button>
					<Separator className={styles.light}>or</Separator>
					<Field
						id="email"
						name="email"
						label="Email"
						placeholder="Enter your email"
						type="email"
						component={FormInput}
					/>
					<Field
						id="password"
						name="password"
						label="Password"
						placeholder="********"
						type="password"
						showForgotPassword
						component={FormInput}
					/>
					<Button type="submit" className={clsx(ButtonClasses.red, ButtonClasses.filled)}>
						Sign in
					</Button>
				</Form>
			</Formik>
			<footer className={styles.footer}>
				No account? <Link to={ROUTES.SignUp}>Sign up</Link>
			</footer>
		</CoverLayout>
	);
};

export default SignInPage;
