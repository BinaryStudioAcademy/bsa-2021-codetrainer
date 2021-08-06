import React from 'react';
import { Formik, Form, Field } from 'formik';
import Modal from 'react-modal';
import ImageUpload from './components/image-upload';
import { FormInput } from 'components';
import { Button } from '../../basic';
import styles from './clan-modal.module.scss';

interface IClanModalProps {
	token: string;
}

Modal.setAppElement('#root');

export const ClanModal: React.FC<IClanModalProps> = (props) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);

	const createClan = React.useCallback((name: string) => {
		const header = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${props.token}`,
				'Content-Type': 'application/json',
			},
			withCredentials: true,
			body: JSON.stringify({ name: name, isPublic: true }),
		};
		const call = async () => {
			const response = await fetch('http://localhost:5000/api/clan', header);
			const data = await response.json();
			console.log(data);
		};
		call();
	}, []);

	const validateClanName = (value: string) => {
		let error;
		if (value.length === 0) {
			error = 'Clan name should be larger than 0 letters';
		}
		return error;
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const modalStyle = {
		content: {
			width: '50vw',
			height: '60vh',
			margin: 'auto',
			background: '#FAFBFF',
			border: 'none',
		},
	};

	return (
		<div>
			<button onClick={openModal}>Open Modal</button>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} contentLabel="Clan Modal">
				<div className={styles.container}>
					<div className={styles.flex}>
						<h2 className={styles.title}>NEW CLAN</h2>
						<a className={styles.close} onClick={closeModal}>
							x
						</a>
					</div>
					<div className={styles.pictures}>
						<ImageUpload label="Set clan cover" />
						<ImageUpload label="Set clan icon" />
					</div>
					<div>
						<Formik initialValues={{ createClan: '' }} onSubmit={(values) => createClan(values.createClan)}>
							{({ errors, touched, validateField, validateForm }) => (
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
			</Modal>
		</div>
	);
};
