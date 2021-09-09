import React from 'react';
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormInput, Button } from 'components';
import { ButtonClasses } from 'components/basic/button';
import List from '../list-radio';
import { IFormItem, IInformationProps } from './interfaces';
import styles from './information.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

const SignupSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Minimum length: 2').max(30, 'Maximum length: 30').required('Required'),
	surname: Yup.string().min(2, 'Minimum length: 2').max(30, 'Maximum length: 30').required('Required'),
	username: Yup.string()
		.min(3, 'Minimum length: 3')
		.max(20, 'Maximum length: 20')
		.matches(/^[a-zA-Z0-9]+\-?[a-zA-Z0-9]+$/, 'Use only letters, numbers and hyphens')
		.required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
});

const Information: React.FC<IInformationProps> = (props) => {
	const renderFormFields = (items: Array<IFormItem>) => {
		const fieldsValues = items.reduce((acc: any, current) => {
			acc[current.name] = current.initialText;
			return acc;
		}, {});

		const listValues = { [props.list.name]: props.list.initialValue };
		const initialValues = Object.assign(listValues, fieldsValues);

		return (
			<Formik
				initialValues={initialValues}
				validationSchema={SignupSchema}
				onSubmit={(value) => {
					const { clan, ...info } = value;
					props.onSubmit(info);
				}}
			>
				<Form className={styles.form}>
					{items.map((item: IFormItem, index) => (
						<div className={styles.inputField} key={index.toString()}>
							<Field
								id={item.id}
								name={item.name}
								label={item.label}
								placeholder={item.placeholder}
								type={item.type}
								readonly={item.readonly}
								component={FormInput}
								key={item.id}
								className={styles.input}
							/>
						</div>
					))}
					<div>
						<div className={styles.label}>Clan</div>
						<div className={styles.clanInfo}>
							{props.clan ? (
								<Link to={`${ROUTES.Clan}/${props.clan.id}`}>{props.clan.name}</Link>
							) : (
								'You are not in a clan'
							)}
						</div>
					</div>
					<div className={styles.experience}>
						<List header="Development experience" name={props.list.name} items={props.list.items} />
					</div>

					<Button className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.submitBtn)}>
						Save Changes
					</Button>
				</Form>
			</Formik>
		);
	};

	return (
		<div>
			<h4 className={styles.header}>Information</h4>
			{renderFormFields(props.formItems)}
		</div>
	);
};

export default Information;
