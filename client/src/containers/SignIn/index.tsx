import React from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import CoverLayout from 'components/CoverLayout';
import PasswordField from 'components/PasswordField';
import FormField from 'components/FormField';
import Separator from 'components/Separator';
import Button, { ButtonClasses } from 'components/Button';
import { combineClasses } from 'helpers/combineClasses.helper';
import styles from './sign-in.module.scss';

function validateEmail(email: string): string | undefined {
	if (!email) {
		return 'Enter email';
	}
	else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(email)) {
		return 'Invalid email';
	}
}

function validatePassword(password: string): string | undefined {
	if (!password) {
		return 'Enter password';
	}
}

const SignIn: React.FC = () => {
	return (
		<CoverLayout className={styles.signIn}>
			<Formik
				initialValues={{
					email: "",
					password: ""
				}}
				onSubmit={e => console.info(e)}
			>
				{({ errors, touched, isValidating }) => (
					<Form className={styles.form}>
						<h4>Sign in</h4>
						<Button
							type="button"
							className={ButtonClasses.red}
						>
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
								validate={validateEmail}
							/>
							<div className={styles.error}>{ touched.email && errors.email }</div>
						</div>
						<div>
							<div className={styles.labelWrapper}>
								<label htmlFor="password">Password</label>
								<Link to="reset-password" className={styles.right}>Forgot password?</Link>
							</div>
							<PasswordField
								id="password"
								name="password"
								placeholder="Password"
								validate={validatePassword}
							/>
							<div className={styles.error}>{ touched.password && errors.password }</div>
						</div>
						<Button
							type="submit"
							className={combineClasses(ButtonClasses.red, ButtonClasses.filled)}
						>
							Sign in
						</Button>
					</Form>
				)}
			</Formik>
			<footer>
				No account? <Link to="/sign-up">Sign up</Link>
			</footer>
		</CoverLayout>
	);
};

export default SignIn;
