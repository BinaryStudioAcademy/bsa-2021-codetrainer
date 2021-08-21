import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import ImageUpload from './components/image-upload';
import { FormInput } from 'components';
import { Button } from '../../basic';
import styles from './collection-modal.module.scss';
import { Modal } from '../';
import { createCollection } from 'services/create-collection.service';

interface ICollectionModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const CreateCollectionSchema = Yup.object().shape({
	createCollection: Yup.string()
		.min(2, 'Your input is too short')
		.max(30, 'Your input is too long')
		.required("Input field can't be empty"),
});
export const CollectionModal: React.FC<ICollectionModalProps> = ({ isOpen, setIsOpen }) => {
	const [isPrompt, setIsPrompt] = React.useState(false);

	const onSubmit = async (value: string, setFieldError: any) => {
		try {
			await createCollection(value);
			setIsOpen(false);
		} catch (e) {
			setFieldError('createClan', 'Something went wrong');
		}
	};

	const prompt = (validateField: (field: string) => Promise<string>) => (
		<div className={styles.prompt}>
			<p>Are you sure?</p>
			<Button type="submit" onClick={() => validateField('createCollection')}>
				Submit
			</Button>
			<Button onClick={() => setIsPrompt(false)}>Cancel</Button>
		</div>
	);

	const element = (
		<div>
			<div>
				<Formik
					initialValues={{ createCollection: '' }}
					validationSchema={CreateCollectionSchema}
					onSubmit={(values, { setFieldError }) => onSubmit(values.createCollection, setFieldError)}
				>
					{({ validateField }) => (
						<Form className={styles.form}>
							<label htmlFor="createCollection">
								<span>*</span> Create collection
							</label>
							<div className={styles.formInput}>
								<Field
									id="createCollection"
									name="createCollection"
									type="text"
									component={FormInput}
								/>
							</div>
							{isPrompt ? (
								prompt(validateField as (field: string) => Promise<string>)
							) : (
								<Button style={{ marginTop: '26px' }} onClick={() => setIsPrompt(true)}>
									Create Collection
								</Button>
							)}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);

	return (
		<div>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				elements={{ title: 'NEW COLLECTION', showCloseButton: true, body: element }}
			/>
		</div>
	);
};
