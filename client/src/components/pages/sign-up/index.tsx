import React from 'react';
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormInput, CoverLayout, Separator } from 'components/common';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { ROUTES } from 'constants/routes';
import { ISignUpForm } from 'typings/sign-up-form';
import { IGithubProfileWithEmail } from 'typings/common/IGithub';
import styles from './sign-up.module.scss';

const SignUpGithubSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, 'Minimum length: 3')
		.max(20, 'Maximum length: 20')
		.matches(/^[A-Za-z0-9]+\-?[A-Za-z0-9]+$/, 'Use only letters, numbers and hyphens')
		.required('Required'),
	email: Yup.string()
		.email('Invalid email')
		.min(5, 'Minimum length: 5')
		.max(50, 'Maximum length: 50')
		.required('Required'),
});

const SignUpSchema = SignUpGithubSchema.concat(
	Yup.object().shape({
		name: Yup.string().min(2, 'Minimum length: 2').max(30, 'Maximum length: 30').required('Required'),
		surname: Yup.string().min(2, 'Minimum length: 2').max(30, 'Maximum length: 30').required('Required'),
		password: Yup.string().min(8, 'Minimum length: 8').max(25, 'Maximum length: 25').required('Required'),
		confirmPassword: Yup.string()
			.min(8, 'Minimum length: 8')
			.max(25, 'Maximum length: 25')
			.required('Required')
			.test('passwords-match', 'Passwords must match', function (value) {
				return this.parent.password === value;
			}),
	}),
);

interface ISignUnPageProps {
	onFormSubmit: (form: ISignUpForm) => void;
	onGithubSignUp?: () => void;
	error?: string;
	github?: IGithubProfileWithEmail;
}

const SignUpPage: React.FC<ISignUnPageProps> = ({ onFormSubmit, onGithubSignUp, github, error }) => {
	return (
		<CoverLayout className={styles.signUp}>
			<h4 className={styles.header}>SignUp</h4>
			{!!error && <div className={styles.error}>{error}</div>}
			<Formik
				initialValues={{
					email: github?.email || '',
					username: github?.login || '',
					name: '',
					surname: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={github ? SignUpGithubSchema : SignUpSchema}
				onSubmit={(values) => {
					onFormSubmit(values);
				}}
			>
				<Form className={styles.form}>
					{github ? (
						<div className={styles.info}>
							Linked to{' '}
							<a href={github.url} target="_blank" rel="noreferrer">
								{github.login}
							</a>
						</div>
					) : (
						<>
							<Button type="button" className={ButtonClasses.red} onClick={onGithubSignUp}>
								Sing up with GitHub
							</Button>
							<Separator className={styles.light}>or</Separator>
						</>
					)}
					<Field
						id="email"
						name="email"
						label="Email"
						placeholder="Enter your email"
						type="email"
						component={FormInput}
					/>
					<Field
						id="username"
						name="username"
						label="Username"
						placeholder="Enter your username"
						type="text"
						component={FormInput}
					/>
					{!github ? (
						<>
							<Field
								id="name"
								name="name"
								label="First Name"
								placeholder="Enter your first name"
								type="text"
								component={FormInput}
							/>
							<Field
								id="surname"
								name="surname"
								label="Last Name"
								placeholder="Enter your last name"
								type="text"
								component={FormInput}
							/>
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
						</>
					) : null}
					<Button className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.submitBtn)}>Sign Up</Button>
				</Form>
			</Formik>
			<footer className={styles.footer}>
				Already have an account?{' '}
				<Link to={ROUTES.SignIn} className={styles.link}>
					Sign in
				</Link>
			</footer>
		</CoverLayout>
	);
};

export default SignUpPage;
