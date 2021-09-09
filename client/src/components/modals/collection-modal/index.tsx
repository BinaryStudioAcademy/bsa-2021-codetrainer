import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import ImageUpload from './components/image-upload';
import { FormInput, Spinner } from 'components';
import { Button, Rank } from '../../basic';
import styles from './collection-modal.module.scss';
import { Modal } from '../';
import { createCollection } from 'services/collections.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import { IRootState } from 'typings/root-state';

interface ICollectionModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	handleFetchCollections: () => void;
}

// const mockData = [
// 	{
// 		id: '123',
// 		name: 'Homework',
// 		author: 'Super User',
// 		tasks: [
// 			{
// 				id: '321',
// 				name: 'Reverse the string',
// 				description: 'Reverse the given string. Example: string => gnirts',
// 				author: 'Super User',
// 				rank: 1,
// 			},
// 			{
// 				id: '231',
// 				name: 'Convert HTML Entities',
// 				description: 'Convert special characters to their corresponding HTML entities.',
// 				author: 'Super User',
// 				rank: 9,
// 			},
// 		],
// 		image: 'https://static.vecteezy.com/system/resources/previews/002/503/041/non_2x/flat-agenda-list-clipboard-design-style-cartoon-illustration-drawing-vector.jpg',
// 	},
// 	{
// 		id: '890',
// 		name: 'Tasks',
// 		author: 'Guest User',
// 		tasks: [
// 			{
// 				id: '321',
// 				name: 'Reverse the string',
// 				description: 'Reverse the given string. Example: string => gnirts',
// 				author: 'Super User',
// 				rank: 2,
// 			},
// 			{
// 				id: '231',
// 				name: 'Convert HTML Entities',
// 				description: 'Convert special characters to their corresponding HTML entities.',
// 				author: 'Super User',
// 				rank: 3,
// 			},
// 			{
// 				id: '231',
// 				name: 'Convert HTML Entities',
// 				description: 'Convert special characters to their corresponding HTML entities.',
// 				author: 'Super User',
// 				rank: 4,
// 			},
// 		],
// 		image: 'https://static.vecteezy.com/system/resources/previews/002/503/041/non_2x/flat-agenda-list-clipboard-design-style-cartoon-illustration-drawing-vector.jpg',
// 	},
// ];

const CreateCollectionSchema = Yup.object().shape({
	createCollection: Yup.string()
		.min(2, 'Your input is too short')
		.max(30, 'Your input is too long')
		.required("Input field can't be empty"),
});
export const CollectionModal: React.FC<ICollectionModalProps> = ({ isOpen, setIsOpen, handleFetchCollections }) => {
	const [isPrompt, setIsPrompt] = React.useState(false);
	const [isNewCollection, setIsNewCollection] = React.useState(false);
	const dispatch = useDispatch();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {
		collections: userCollections,
		isLoading,
		errors,
		selectedTask,
	} = useSelector((store: IRootState) => store.collections);
	useEffect(() => {
		handleFetchCollections();
	}, []);
	const onSubmit = async (value: string, setFieldError: any) => {
		try {
			await createCollection(value, selectedTask);
			setIsOpen(false);
			dispatch(
				setNotificationState({
					state: {
						notificationType: NotificationType.Success,
						message: 'Collection was successfully created',
					},
				}),
			);
		} catch (e) {
			setFieldError('createCollection', 'Something went wrong');
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

	const collections = (
		<div className={styles.collections}>
			{userCollections.length >= 1
				? userCollections.map((item) => {
						if (!item || !item.tasks) {
							return;
						}
						let sumOfRanks = 0;
						for (let i = 0; i < item.tasks.length; i++) {
							sumOfRanks += item.tasks[i].rank ?? 9;
						}
						return (
							<div key={item.id} className={styles.collection}>
								<img
									src={
										item.avatar ??
										'https://static.vecteezy.com/system/resources/previews/002/503/041/non_2x/flat-agenda-list-clipboard-design-style-cartoon-illustration-drawing-vector.jpg'
									}
								/>
								<div className={styles.collectionInfo}>
									<div className={styles.collectionHeader}>
										<h5>{item.name}</h5>
										<Rank
											rank={
												item.tasks.length >= 1 ? Math.trunc(sumOfRanks / item.tasks.length) : 9
											}
										/>
									</div>
									<p>Number of Challenges: {item.tasks.length} </p>
								</div>
							</div>
						);
				  })
				: 'You don`t have any collections yet.'}
			<div className={styles.newCollection} onClick={() => setIsNewCollection(true)}>
				<div className={styles.addButton}>
					<FontAwesomeIcon icon={faPlus} size="lg" />
				</div>
				<p>ADD NEW COLLECTION</p>
			</div>
		</div>
	);

	const noCollections = (
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
								<>
									<Button style={{ marginTop: '26px' }} onClick={() => setIsPrompt(true)}>
										Create
									</Button>
									<Button
										style={{ margin: '26px 0 0 20px' }}
										onClick={() => setIsNewCollection(false)}
									>
										Back
									</Button>
								</>
							)}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<Modal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					elements={{
						title: 'ADD TO COLLECTION',
						showCloseButton: true,
						body: isNewCollection ? noCollections : collections,
					}}
				/>
			)}
		</div>
	);
};
