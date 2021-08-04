import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormInput, CoverLayout } from 'components';
import { ISignUpForm } from 'typings/sign-up-form';
import styles from './sign-up.module.scss';
import { ROUTES } from 'constants/routes';

const SignupSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	surname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().min(8, 'Too short').required('Required'),
	confirmPassword: Yup.string()
		.min(8, 'Too short')
		.required('Required')
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.password === value;
		}),
});

interface ISignUnPageProps {
	onFormSubmit: (form: ISignUpForm) => void;
}

const SignUpPage: React.FC<ISignUnPageProps> = ({ onFormSubmit }) => {
	return (
		<CoverLayout>
			<h4>SignUp</h4>
			<Formik
				initialValues={{
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
				<Form>
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
					<button type="submit" className={styles.submitBtn}>
						Sign Up
					</button>
				</Form>
			</Formik>
			<div className={styles.footer}>
				Already Signep up?{' '}
				<Link to={ROUTES.Login} className={styles.link}>
					Sign in
				</Link>
			</div>
		</CoverLayout>
	);
};

export default SignUpPage;
