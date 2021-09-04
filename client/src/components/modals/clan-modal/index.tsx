import React, { useState, useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { FormInput, FormImage, FormNumber, FormMarkdown, FormSelect, Modal, Spinner } from 'components';
import Button, { ButtonClasses } from 'components/basic/button';
import styles from './clan-modal.module.scss';
import ClanCover from './clan-cover';
import ConfirmModal from '../confirm-modal';

const clanTypes = [
	{
		name: 'Public',
		label: 'Public',
		value: 'public',
	},
	{
		name: 'Private',
		label: 'Private',
		value: 'private',
	},
];

export enum ClanModalType {
	CREATE = 'create',
	EDIT = 'edit',
}

export interface IClanForm {
	name?: string;
	description?: string;
	maxMembers?: number;
	type?: 'private' | 'public';
	avatar?: string | null;
	cover?: string | null;
}

interface IClanModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	type?: ClanModalType;
	isLoading?: boolean;
	initial?: IClanForm;
	onSubmit?: (clan: IClanForm) => void;
	onDelete?: () => void;
}

const ClanSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, 'Name is too short')
		.max(30, 'Name is too long')
		.required('Required'),
	description: Yup.string()
		.max(3000, 'Description is too long'),
});

export const ClanModal: React.FC<IClanModalProps> = ({
	isOpen,
	setIsOpen,
	type = ClanModalType.CREATE,
	initial = {
		maxMembers: 20,
	},
	isLoading = false,
	onSubmit = () => {},
	onDelete = () => {},
}: IClanModalProps) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

	const element = useMemo(() => (
		<div className={styles.container}>
			<Formik
				initialValues={initial}
				validationSchema={ClanSchema}
				onSubmit={onSubmit}
			>
				<Form className={styles.form}>
					<div className={styles.fields}>	
						<Field
							id="name"
							name="name"
							label="Name"
							placeholder="Enter name"
							type="text"
							readonly={isLoading}
							component={FormInput}
						/>
						<div className={styles.settings}>
							<div className={styles.main}>
								<Field
									id="type"
									name="type"
									label="Type"
									options={clanTypes}
									value={initial.type}
									readonly={isLoading}
									component={FormSelect}
								/>
							</div>
							<Field
								id="max-members"
								name="maxMembers"
								label="Max members"
								placeholder="Max count of members"
								type="number"
								min={1}
								max={50}
								step={1}
								readonly={isLoading}
								component={FormNumber}
							/>
						</div>
						<Field
							id="description"
							name="description"
							label="Description"
							title="Description"
							placeholder="Enter description"
							type="text"
							readonly={isLoading}
							component={FormMarkdown}
						/>
					</div>
					<div className={styles.images}>
						<Field
							id="avatar"
							name="avatar"
							title="Select an avatar"
							type="image"
							imageProps={{
								width: 80,
								height: 80,
							}}
							readonly={isLoading}
							component={FormImage}
						/>
						<Field
							id="cover"
							name="cover"
							title="Select a cover"
							type="image"
							imageComponent={ClanCover}
							readonly={isLoading}
							component={FormImage}
						/>
					</div>
					<div className={styles.buttons}>
						<Button
							type="submit"
							className={clsx(ButtonClasses.red, ButtonClasses.filled)}
							disabled={isLoading}
						>
							{type === ClanModalType.CREATE ? 'Create' : 'Edit' }
						</Button>
						{
							isLoading && (
								<div>
									<Spinner size="40px" />
								</div>
							)
						}
						{
							type === ClanModalType.EDIT && (
								<Button
									type="button"
									onClick={() => setIsDeleteOpen(true)}
									className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.delete)}
									disabled={isLoading}
								>
									Delete
								</Button>
							)
						}
					</div>
				</Form>
			</Formik>
		</div>
	), [initial]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				elements={{
					title: type === ClanModalType.CREATE ? 'Create clan' : 'Edit clan',
					showCloseButton: true,
					body: element
				}}
			/>
			<ConfirmModal
				isOpen={isDeleteOpen}
				setIsOpen={setIsDeleteOpen}
				onConfirm={(confirm) => {
					setIsDeleteOpen(false);
					if (confirm) {
						onDelete();
					}
				}}
				confirm="Delete"
				elements={{
					title: `Do you really want to delete the ${initial.name}?`,
					body: (
						<>
							It will be impossible to undo a deletion of the clan. <b>Still delete it?</b>
						</>
					),
				}}
			/>
		</>
	);
};
