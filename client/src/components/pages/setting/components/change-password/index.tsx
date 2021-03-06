import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormInput, Button } from 'components';
import { ButtonClasses } from 'components/basic/button';
import clsx from 'clsx';
import styles from './change-password.module.scss';
import { IChangePasswordProps } from './interfaces';

const ChangePasswordSchema = Yup.object().shape({
	newPassword: Yup.string().min(8, 'Minimum length: 8').max(25, 'Maximum length: 25').required('Required'),
	confirmNewPassword: Yup.string()
		.min(8, 'Minimum length: 8')
		.max(25, 'Maximum length: 25')
		.required('Required')
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.newPassword === value;
		}),
	currentPassword: Yup.string().min(8, 'Minimum length: 8').max(25, 'Maximum length: 25').required('Required'),
});

const ChangePassword: React.FC<IChangePasswordProps> = (props) => {
	return (
		<div>
			<h4 className={styles.header}>Change Password</h4>
			<Formik
				initialValues={{
					newPassword: '',
					confirmNewPassword: '',
					currentPassword: '',
				}}
				validationSchema={ChangePasswordSchema}
				onSubmit={(values) => {
					props.onSubmitPasswordChange({
						currentPassword: values.currentPassword,
						newPassword: values.newPassword,
					});
				}}
			>
				<Form className={styles.form}>
					<Field
						id="newPassword"
						name="newPassword"
						label="New Password (Leave blank if you don`t wish change it)"
						type="password"
						component={FormInput}
					/>
					<Field
						id="confirmNewPassword"
						name="confirmNewPassword"
						label="Confirm New Password"
						type="password"
						component={FormInput}
					/>
					<Field
						id="currentPassword"
						name="currentPassword"
						label="Current Password (Needed if you change your password)"
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
