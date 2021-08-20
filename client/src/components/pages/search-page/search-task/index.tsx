import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FormInput, FormSelect } from 'components';
import { ClickableRank } from 'components/basic/rank/clickable-rank';
import styles from './search-task.module.scss';
import { TASK_PROGRESS_OPTIONS, TASK_SORT_BY_OPTIONS, TASK_STATUS_OPTIONS } from 'constants/task';
import { Button, Checkbox } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import { ISearchState } from 'containers/search-page/logic/state';

interface ISearchTask {
	tags: { label: string; name: string }[];
	filter: ISearchState['filter'];
	ranks: number[];
	onChange: (filter: Record<string, any>) => void;
	onSubmit: () => void;
}

export const SearchTask: React.FC<ISearchTask> = ({ tags, ranks, onChange, onSubmit, filter }) => {
	const handleChangeTags = (data: { name: string; checked: boolean }) => {
		const tagsState = new Set(filter.tags);
		if (data.checked) {
			tagsState.add(data.name);
		} else {
			tagsState.delete(data.name);
		}
		onChange({ tags: tagsState });
	};

	const handleChangeRank = (rank: number) => {
		onChange({ rank: filter.rank === rank ? null : rank });
	};
	const handleSubmit = (query: Record<string, any>) => {
		onChange(query);
		onSubmit();
	};
	return (
		<>
			<Box mb={2}>
				<h4>Search Task</h4>
			</Box>
			<Formik
				initialValues={{
					status: filter.status,
					progress: filter.progress,
					sort: filter.sort,
					query: filter.query,
				}}
				onSubmit={(values) => handleSubmit(values)}
			>
				<Form>
					<Field id="query" name="query" placeholder="Search..." type="text" component={FormInput} />
					<label htmlFor="sort">Sort By</label>
					<Field id="sortBy" name="sort" options={TASK_SORT_BY_OPTIONS} component={FormSelect} />
					<label htmlFor="status">Status</label>
					<Field id="status" name="status" options={TASK_STATUS_OPTIONS} component={FormSelect} />
					<label htmlFor="progress">Progress</label>
					<Field id="progress" name="progress" options={TASK_PROGRESS_OPTIONS} component={FormSelect} />

					<h6>Difficulty</h6>
					<div className={styles.rankContainer}>
						{ranks.map((rank) => (
							<ClickableRank
								key={rank.toString()}
								rank={rank}
								active={filter?.rank === rank}
								onChange={() => handleChangeRank(rank)}
							/>
						))}
					</div>
					<div id="checkbox-group">
						<h6>Tags</h6>
					</div>
					<div role="group" aria-labelledby="checkbox-group" className={styles.checkboxContainer}>
						{tags.length
							? tags.map((tag, id) => (
									<Checkbox
										key={id.toString()}
										label={tag.label}
										name={tag.name}
										checked={filter.tags.has(tag.name)}
										onChange={(checked: boolean) => handleChangeTags({ name: tag.name, checked })}
									/>
							  ))
							: 'no tags'}
					</div>
					<Button type="submit" className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.submitBtn)}>
						Search
					</Button>
				</Form>
			</Formik>
		</>
	);
};
