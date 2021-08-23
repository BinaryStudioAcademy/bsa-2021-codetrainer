import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImageUpload from './components/image-upload';
import { FormInput } from 'components';
import { Button } from '../../basic';
import styles from './clan-modal.module.scss';
import { Modal } from '../';
import { createClan } from 'services/create-clan.service';
import { useDispatch } from 'react-redux';
import * as userActions from 'containers/user/logic/actions';
import { useUserSelector } from 'hooks/useAppSelector';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

interface IClanModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const CreateClanSchema = Yup.object().shape({
	createClan: Yup.string()
		.min(2, 'Your input is too short')
		.max(30, 'Your input is too long')
		.required("Input field can't be empty"),
});

export const ClanModal: React.FC<IClanModalProps> = ({ isOpen, setIsOpen }) => {
	const [isPrompt, setIsPrompt] = React.useState(false);
	const dispatch = useDispatch();
	const user = useUserSelector();
	const onSubmit = async (value: string, setFieldError: any) => {
		if (user?.clan !== null) {
			dispatch(
				setNotificationState({
					state: {
						notificationType: NotificationType.Error,
						message: 'Leave the clan to create a new one first.',
					},
				}),
			);
		}
		try {
			const clan = await createClan(value);
			setIsOpen(false);
			dispatch(userActions.setUserClan({ clan: clan }));
		} catch (e) {
			setFieldError('createClan', 'Something went wrong');
		}
	};

	const prompt = (validateField: (field: string) => Promise<string>) => (
		<div className={styles.prompt}>
			<p>Are you sure?</p>
			<Button type="submit" onClick={() => validateField('createClan')}>
				Submit
			</Button>
			<Button onClick={() => setIsPrompt(false)}>Cancel</Button>
		</div>
	);

	const element = (
		<div className={styles.container}>
			<div className={styles.pictures}>
				<ImageUpload label="Set clan cover" />
				<ImageUpload label="Set clan icon" />
			</div>
			<div>
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
							<div className={styles.formInput}>
								<Field id="createClan" name="createClan" type="text" component={FormInput} />
							</div>
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
