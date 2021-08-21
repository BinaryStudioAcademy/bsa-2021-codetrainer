import React from 'react';
// import { Formik, Form, Field } from 'formik';
import { Modal } from '../index';

export const CollectionModal = () => {
	const [isOpen, setIsOpen] = React.useState(true);

	const element = (
		<div>
			{/* <div>
				<Formik
					initialValues={{ createClan: '' }}
					validationSchema={CreateClanSchema}
					onSubmit={(values, { setFieldError }) => onSubmit(values.createClan, setFieldError)}
				>
					{({ validateField }) => (
						<Form className={styles.form}>
							<label htmlFor="createClan">
								<span>*</span> Create clan
							</label>
							<Field id="createClan" name="createClan" type="text" component={FormInput} />
							{isPrompt ? (
								prompt(validateField as (field: string) => Promise<string>)
							) : (
								<Button style={{ marginTop: '26px' }} onClick={() => setIsPrompt(true)}>
									Create Clan
								</Button>
							)}
						</Form>
					)}
				</Formik>
			</div> */}
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
