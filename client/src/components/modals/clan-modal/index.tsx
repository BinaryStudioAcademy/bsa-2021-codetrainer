import React from 'react';
import { Formik, Form, Field } from 'formik';
import ImageUpload from './components/image-upload';
import { FormInput } from 'components';
import { Button } from '../../basic';
import styles from './clan-modal.module.scss';
import { Modal } from '../';
import { createClan } from 'services/create-clan.service';

interface IClanModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export const ClanModal: React.FC<IClanModalProps> = ({ isOpen, setIsOpen }) => {
	const validateClanName = (value: string) => {
		let error;
		if (value.length === 0) {
			error = "Input field can't be empty";
		}
		return error;
	};

	const onSubmit = async (value: string, setFieldError: any) => {
		try {
			await createClan(value);
			setIsOpen(false);
		} catch (e) {
			console.log(e);
			setFieldError('createClan', 'Something went wrong');
		}
	};

	const element = (
		<div className={styles.container}>
			<div className={styles.pictures}>
				<ImageUpload label="Set clan cover" />
				<ImageUpload label="Set clan icon" />
			</div>
			<div>
				<Formik
					initialValues={{ createClan: '' }}
					onSubmit={(values, { setFieldError }) => onSubmit(values.createClan, setFieldError)}
				>
					{({ validateField }) => (
						<Form className={styles.form}>
							<Field
								id="createClan"
								name="createClan"
								label={
									<label>
										<span>*</span> Create clan
									</label>
								}
								type="text"
								component={FormInput}
								validate={validateClanName}
							/>
							<Button onClick={() => validateField('createClan')} type="submit">
								Create Clan
							</Button>
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
				elements={{ title: 'NEW CLAN', showCloseButton: true, body: element }}
			/>
		</div>
	);
};
