import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormInput } from 'components';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import clsx from 'clsx';
import styles from './change-password.module.scss';

const ChangePasswordSchema = Yup.object().shape({
	password: Yup.string().min(8, 'Too short').required('Required'),
	confirmPassword: Yup.string()
		.min(8, 'Too short')
		.required('Required')
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.password === value;
		}),
});

const ChangePassword: React.FC = () => {
	return (
		<div>
			<h4 className={styles.header}>Change Password</h4>
			<Formik
				initialValues={{
					password: '',
					confirmPassord: '',
				}}
				validationSchema={ChangePasswordSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				<Form className={styles.form}>
					<Field
						id="newPassword"
						name="newPassword"
						label="New Password (Leave blank if you don`t wish change it)"
						placeholder="********"
						type="password"
						component={FormInput}
					/>
					<Field
						id="confirmNewPassword"
						name="confirmNewPassword"
						label="Confirm New Password"
						placeholder="********"
						type="password"
						component={FormInput}
					/>
					<Field
						id="currentPassword"
						name="currentPassword"
						label="Current Password (Needed if you change your password)"
						placeholder="********"
						type="password"
						component={FormInput}
					/>
					<Link to="/forgot-password" className={styles.link}>
						Forgot your password
					</Link>
					<Button className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.submitBtn)}>
						Change Password
					</Button>
				</Form>
			</Formik>
		</div>
	);
};

export default ChangePassword;
