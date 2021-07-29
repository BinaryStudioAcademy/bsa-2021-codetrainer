import React from 'react';
import styles from './SearchTask.module.scss';
import { Formik, Form, Field } from 'formik';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';

const sortByOptions = [
	{
		value: 'NEWEST',
		label: 'Newest',
	},
	{
		value: 'OLDEST',
		label: 'Oldest',
	},
];

const statusOptions = [
	{
		value: 'APPROVED',
		label: 'Approved',
	},
	{
		value: 'SUBMITTED',
		label: 'Submitted',
	},
	{
		value: 'NOT_APPROVED',
		label: 'Not Approved',
	},
];

const progressOptions = [
	{
		value: 'ALL',
		label: 'all',
	},
	{
		value: 'IN_PROGRESS',
		label: 'In Progress',
	},
	{
		value: 'NOT_STARTED',
		label: 'Not Started',
	},
];

const SearchTask: React.FC = () => {
	return (
		<>
			<h4>Search Task</h4>
			<Formik
				initialValues={{
					query: '',
					sortBy: 'NEWEST',
					status: 'APPROVED',
					progress: 'ALL',
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				<Form>
					<Field id="query" name="query" placeholder="Search..." type="text" component={FormInput} />
					<Field id="sortBy" name="sortBy" label="Sort By" options={sortByOptions} component={FormSelect} />
					<Field id="status" name="status" label="Status" options={statusOptions} component={FormSelect} />
					<Field
						id="progress"
						name="progress"
						label="Progress"
						options={progressOptions}
						component={FormSelect}
					/>

					<h6>Difficulty</h6>
					<div>Add Rank buttons here when available</div>
					<h6>Tags</h6>
					<div>Add Tags buttons here when available</div>
					<button type="submit" className={styles.submitBtn}>
						Sign Up
					</button>
				</Form>
			</Formik>
		</>
	);
};

export default SearchTask;
