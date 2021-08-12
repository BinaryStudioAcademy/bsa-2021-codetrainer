import React from 'react';
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormInput, CoverLayout } from 'components';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import styles from './sign-up.module.scss';
import { ROUTES } from 'constants/routes';
import { ISignUpForm } from 'typings/sign-up-form';

const SignupSchema = Yup.object().shape({
	username: Yup.string()
		.matches(/^[a-zA-Z0-9\-]+$/, 'Use only letters, numbers and hyphens')
		.min(3, 'Minimum length: 3')
		.max(20, 'Maximum length: 20')
		.required('Required'),
	name: Yup.string().min(2, 'Minimum length: 2').max(30, 'Maximum length: 30').required('Required'),
	surname: Yup.string().min(2, 'Minimum length: 2').max(30, 'Maximum length: 30').required('Required'),
	email: Yup.string()
		.email('Invalid email')
		.min(5, 'Minimum length: 5')
		.max(50, 'Maximum length: 50')
		.required('Required'),
	password: Yup.string().min(8, 'Minimum length: 8').max(25, 'Maximum length: 25').required('Required'),
	confirmPassword: Yup.string()
		.min(8, 'Minimum length: 8')
		.max(25, 'Maximum length: 25')
		.required('Required')
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.password === value;
		}),
});

interface ISignUnPageProps {
	onFormSubmit: (form: ISignUpForm) => void;
	error?: string;
}

const SignUpPage: React.FC<ISignUnPageProps> = ({ onFormSubmit, error }) => {
	return (
		<CoverLayout className={styles.signUp}>
			<Formik
				initialValues={{
					username: '',
					name: '',
					surname: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					onFormSubmit(values);
				}}
			>
				<Form className={styles.form}>
					<h4>SignUp</h4>
					{!!error && <div className={styles.error}>{error}</div>}
					<Field
						id="username"
						name="username"
						label="Username"
						placeholder="Enter your username"
						type="text"
						component={FormInput}
					/>
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
					<Button className={clsx(ButtonClasses.red, ButtonClasses.filled)}>Sign Up</Button>
				</Form>
			</Formik>
			<footer>
				Already Signed up? <Link to={ROUTES.SignIn}>Sign in</Link>
			</footer>
		</CoverLayout>
	);
};

export default SignUpPage;
