import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import ImageUpload from './components/image-upload';
import { FormInput } from 'components';
import { Button, Rank } from '../../basic';
import styles from './collection-modal.module.scss';
import { Modal } from '../';
import { createCollection } from 'services/create-collection.service';

interface ICollectionModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const mockData = [
	{
		id: '123',
		name: 'Homework',
		author: 'Super User',
		tasks: [
			{
				id: '321',
				name: 'Reverse the string',
				description: 'Reverse the given string. Example: string => gnirts',
				author: 'Super User',
				rank: 1,
			},
			{
				id: '231',
				name: 'Convert HTML Entities',
				description: 'Convert special characters to their corresponding HTML entities.',
				author: 'Super User',
				rank: 9,
			},
		],
		image: 'https://static.vecteezy.com/system/resources/previews/002/503/041/non_2x/flat-agenda-list-clipboard-design-style-cartoon-illustration-drawing-vector.jpg',
	},
	{
		id: '890',
		name: 'Tasks',
		author: 'Guest User',
		tasks: [
			{
				id: '321',
				name: 'Reverse the string',
				description: 'Reverse the given string. Example: string => gnirts',
				author: 'Super User',
				rank: 2,
			},
			{
				id: '231',
				name: 'Convert HTML Entities',
				description: 'Convert special characters to their corresponding HTML entities.',
				author: 'Super User',
				rank: 3,
			},
		],
		image: 'https://static.vecteezy.com/system/resources/previews/002/503/041/non_2x/flat-agenda-list-clipboard-design-style-cartoon-illustration-drawing-vector.jpg',
	},
];

const CreateCollectionSchema = Yup.object().shape({
	createCollection: Yup.string()
		.min(2, 'Your input is too short')
		.max(30, 'Your input is too long')
		.required("Input field can't be empty"),
});
export const CollectionModal: React.FC<ICollectionModalProps> = ({ isOpen, setIsOpen }) => {
	const [isPrompt, setIsPrompt] = React.useState(false);
	// const [isNoCollections, setIsNoCollections] = React.useState(false);

	const isNoCollections = false;

	const onSubmit = async (value: string, setFieldError: any) => {
		try {
			await createCollection(value);
			setIsOpen(false);
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
			{mockData.map((item) => {
				let sumOfRanks = 0;
				for (let i = 0; i < item.tasks.length; i++) {
					sumOfRanks += item.tasks[i].rank;
				}
				return (
					<div key={item.id} className={styles.collection}>
						<img src={item.image} />
						<div className={styles.collectionInfo}>
							<div className={styles.collectionHeader}>
								<h5>{item.name}</h5>
								<Rank rank={Math.trunc(sumOfRanks / item.tasks.length)} />
							</div>
							<p>
								Made by <span>{item.author}</span>
							</p>
						</div>
					</div>
				);
			})}
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
			{isNoCollections ? (
				<Modal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					elements={{ title: 'NEW COLLECTION', showCloseButton: true, body: noCollections }}
				/>
			) : (
				<Modal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					elements={{ title: 'ADD TO COLLECTION', showCloseButton: true, body: collections }}
				/>
			)}
		</div>
	);
};
