import React from 'react';
import { Formik, Form, Field } from 'formik';
import FormInput from 'components/common/form-input';
import FormSelect from 'components/common/form-select';
import styles from './search-task.module.scss';
import RankTag from 'components/basic/rank-tag';

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
		label: 'All',
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

const SearchTask = () => {
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
					<div>
						<RankTag rank={4} />
					</div>
					<h6>Tags</h6>
					<div>Add Tags buttons here when available</div>
					<button type="submit" className={styles.submitButton}>
						Sign Up
					</button>
				</Form>
			</Formik>
		</>
	);
};

export default SearchTask;
