import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FormInput, FormSelect, Rank } from 'components';
import styles from './search-task.module.scss';
import { TASK_PROGRESS_OPTIONS, TASK_SORT_BY_OPTIONS, TASK_STATUS_OPTIONS } from 'constants/task';
import { Checkbox } from 'components/basic';

interface ISearchTask {
	tags: string[];
	ranks: number[];
}

const SearchTask: React.FC<ISearchTask> = ({ tags, ranks }) => {
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
					<Field
						id="sortBy"
						name="sortBy"
						label="Sort By"
						options={TASK_SORT_BY_OPTIONS}
						component={FormSelect}
					/>
					<Field
						id="status"
						name="status"
						label="Status"
						options={TASK_STATUS_OPTIONS}
						component={FormSelect}
					/>
					<Field
						id="progress"
						name="progress"
						label="Progress"
						options={TASK_PROGRESS_OPTIONS}
						component={FormSelect}
					/>

					<h6>Difficulty</h6>
					<div className={styles.rankContainer}>
						{ranks.map((rank) => (
							<Rank key={rank} rank={rank} />
						))}
					</div>
					<div id="checkbox-group">
						<h6>Tags</h6>
					</div>
					<div role="group" aria-labelledby="checkbox-group" className={styles.checkboxContainer}>
						{tags.map((tag, id) => (
							<Checkbox key={id} label={tag} name={tag} />
						))}
					</div>
					<button type="submit" className={styles.submitButton}>
						Sign Up
					</button>
				</Form>
			</Formik>
		</>
	);
};

export default SearchTask;
