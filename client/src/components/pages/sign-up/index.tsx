import React from 'react';
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormInput, CoverLayout } from 'components';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import styles from './sign-up.module.scss';

const SignupSchema = Yup.object().shape({
	firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().min(8, 'Too short').required('Required'),
	confirmPassword: Yup.string()
		.min(8, 'Too short')
		.required('Required')
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.password === value;
		}),
});

const SignUp: React.FC = () => {
	return (
		<CoverLayout>
			<h4>SignUp</h4>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={SignupSchema}
				onSubmit={(newUser) => {
					console.log(newUser);
				}}
			>
				<Form>
					<Field
						id="firstName"
						name="firstName"
						label="First Name"
						placeholder="Enter your first name"
						type="text"
						component={FormInput}
					/>
					<Field
						id="lastName"
						name="lastName"
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
					<Button className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.submitBtn)}>Sign Up</Button>
				</Form>
			</Formik>
			<div className={styles.footer}>
				Already Signed Up?{' '}
				<Link to="/sign-in" className={styles.link}>
					Sign in
				</Link>
			</div>
		</CoverLayout>
	);
};

export default SignUp;
