import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { FormControlLabel, FormGroup } from '@material-ui/core';
import { InfoPopover, Select, Switch } from 'components/basic';
import { Discipline, IDisciplineItem } from 'containers/create-new-task/data';
import { ISelectValue } from 'components/basic/select/interface';
import DisciplineElement from '../discipline-element';

import './create-task-settings.scss';
import styles from './create-task-settings.module.scss';

interface ICreateTaskSettingsProps {
	disciplineItems: IDisciplineItem[];
	discipline?: Discipline;
	allowContributors?: boolean;
	// language: ISelectValue;
	// languages: ISelectValue[];
	tags?: string[];
	name?: string;
	rank: ISelectValue;
	ranks: ISelectValue[];
	onChange: (type: string, value: string | { name: string }[] | boolean) => void;
}

export const CreateTaskSettings: React.FC<ICreateTaskSettingsProps> = ({
	disciplineItems,
	discipline,
	allowContributors,
	// languages,
	// language,
	rank,
	name,
	tags,
	ranks,
	onChange,
}) => {
	const handleChangeTags = (event: ChangeEvent<HTMLInputElement>) =>
		onChange(
			'tags',
			event.target.value
				.trim()
				.split(',')
				.map((tag) => ({ name: tag.trim() })),
		);

	const handleChangeContributes = (event: ChangeEvent<HTMLInputElement>) =>
		onChange('allowContributors', event.target.checked);
	return (
		<div className={styles.createTaskSettings}>
			<h2 className={clsx('heading', styles.heading)}>Create a New Challenge</h2>
			<form className={styles.settingsTask}>
				<div className={styles.group}>
					<label htmlFor="task-name" className={styles.label}>
						Name
					</label>
					<input
						id="task-name"
						placeholder="Enter Challenge Name"
						value={name}
						onChange={(newText: ChangeEvent<HTMLInputElement>) => onChange('name', newText.target.value)}
					/>
				</div>
				<div className={styles.group}>
					<h3 className={styles.disciplinesHeading}>Disciplines</h3>
					<div className={styles.disciplineItems}>
						{disciplineItems.map((item) => {
							return (
								<DisciplineElement
									onClick={() => onChange('discipline', item.value)}
									active={item.value === discipline}
									icon={<item.iconFC width={25} height={25} />}
									text={item.label}
									key={item.value}
								/>
							);
						})}
					</div>
				</div>
				{/* <label className={styles.label}>
					Language version
					<InfoPopover iconType={'help'}>Choose the language version the task will work for.</InfoPopover>
				</label>
				<Select
					className={styles.languageVersionSelect}
					values={languages}
					activeValue={language}
					onChange={({ title }) => onChange('language', title)}
				/> */}
				<div className={styles.group}>
					<label className={styles.label}>
						Estimated Rank
						<InfoPopover iconType={'help'}>
							Choose the rank you are expecting this task to be ranked as.
						</InfoPopover>
					</label>
					<Select values={ranks} activeValue={rank} onChange={({ title }) => onChange('rank', title)} />
				</div>
				<div className={styles.group}>
					<label className={styles.label} htmlFor="tags">
						Tags
					</label>
					<input
						id="tags"
						placeholder="Enter Tags (separated by comma)"
						value={(tags || []).join(', ')}
						onChange={handleChangeTags}
					/>
				</div>
				<FormGroup>
					<FormControlLabel
						value="bottom"
						control={<Switch checked={allowContributors} onChange={handleChangeContributes} />}
						label={
							<span className="switchLabel">
								Allow Contributors?
								<InfoPopover iconType={'help'}>
									Check to allow contributors to make changes to this task while it&apos;s in beta.
									You will be notified of any edits made by other users.
								</InfoPopover>
							</span>
						}
						classes={{
							root: 'hello',
						}}
						labelPlacement="end"
					/>
				</FormGroup>
			</form>
		</div>
	);
};
