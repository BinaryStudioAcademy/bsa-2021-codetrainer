import React from 'react';
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormInput } from 'components';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import List from '../list-radio';
import { IFormItem, IInformationProps } from './interfaces';
import styles from './information.module.scss';

const SignupSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	clan: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	skills: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
});

const Information: React.FC<IInformationProps> = (props) => {
	const getFieldItem = (item: Omit<IFormItem, 'initialText'>) => {
		return (
			<Field
				id={item.id}
				name={item.name}
				label={item.label}
				placeholder={item.placeholder}
				type={item.type}
				component={FormInput}
				key={item.id}
			/>
		);
	};

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
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				<Form className={styles.form}>
					{items.map((item: IFormItem) => getFieldItem(item))}

					<div className={styles.experience}>
						<List header="Development experience" name="experience" items={props.list.items} />
					</div>

					<Button className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.submitBtn)}>
						Save Changes
					</Button>
				</Form>
			</Formik>
		);
	};

	return (
		<>
			<h4 className={styles.header}>Information</h4>
			{renderFormFields(props.formItems)}
		</>
	);
};

export default Information;
