import React from 'react';
import { Formik, Form, Field } from 'formik';
import ImageUpload from './components/image-upload';
import { FormInput } from 'components';
import { Button } from '../../basic';
import styles from './clan-modal.module.scss';
import { Modal } from '../';

export const ClanModal: React.FC = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNzQ4YmQwLWQyNGQtNDY2Yi1iMWMxLTVkOTQ1MDczN2VhYSIsImlhdCI6MTYyODA5MTIwNywiZXhwIjoxNjI4MTc3NjA3fQ.5ChvB4gmO-R9EXfmakMcjtUZhKhnVDHFav_6-76xCHo'

	// const createClan = React.useCallback((name: string) => {
	// 	const header = {
	// 		method: 'POST',
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 			'Content-Type': 'application/json',
	// 		},
	// 		withCredentials: true,
	// 		body: JSON.stringify({ name: name, isPublic: true }),
	// 	};
	// 	const call = async () => {
	// 		const response = await fetch('http://localhost:5000/api/clan', header);
	// 		const data = await response.json();
	// 		console.log(data);
	// 	};
	// 	call();
	// }, []);

	const validateClanName = (value: string) => {
		let error;
		if (value.length < 4) {
			error = 'Clan name should be minimum four letters';
		}
		return error;
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const element = (
		<div className={styles.container}>
			<div className={styles.pictures}>
				<ImageUpload label="Set clan cover" />
				<ImageUpload label="Set clan icon" />
			</div>
			<div>
				<Formik initialValues={{ createClan: '' }} onSubmit={() => console.log('submited')}>
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
			<button onClick={openModal}>Open Modal</button>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				elements={{ title: 'NEW CLAN', showCloseButton: true, body: element }}
			/>
		</div>
	);
};
