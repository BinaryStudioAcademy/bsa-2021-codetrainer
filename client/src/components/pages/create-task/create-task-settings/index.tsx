import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { FormControlLabel, FormGroup } from '@material-ui/core';
import { InfoPopover, Select, Switch } from 'components/basic';
import { Discipline, IDisciplineItem } from 'containers/create-new-task/logic/models';
import { ISelectProps } from 'components/basic/select/interface';
import DisciplineElement from '../discipline-element';

import './create-task-settings.scss';
import styles from './create-task-settings.module.scss';

interface ICreateTaskSettingsProps {
	disciplineItems: IDisciplineItem[];
	onChangeDiscipline: (discipline: Discipline) => void;
	chosenDiscipline: Discipline;
	onSwitchClick: (newValue: boolean) => void;
	isSelectedSwitch: boolean;
	selectProps: ISelectProps;
	taskName: string;
	setTaskName: (value: string) => void;
	rank: string;
	setRank: (value: string) => void;
	tags: string;
	setTags: (value: string) => void;
	rankSelectProps: ISelectProps;
}

export const CreateTaskSettings: React.FC<ICreateTaskSettingsProps> = ({
	disciplineItems,
	onChangeDiscipline,
	chosenDiscipline,
	onSwitchClick,
	isSelectedSwitch,
	selectProps,
	taskName,
	setTaskName,
	tags,
	setTags,
	rankSelectProps,
}) => {
	return (
		<div className={styles.createTaskSettings}>
			<h2 className={clsx('heading', styles.heading)}>Create a New Challenge</h2>
			<form className={styles.settingsTask}>
				<label htmlFor="task-name" className={styles.label}>
					Name
				</label>
				<input
					id="task-name"
					placeholder="Enter Challenge Name"
					value={taskName}
					onChange={(newText: ChangeEvent<HTMLInputElement>) => setTaskName(newText.target.value)}
				/>

				<h3 className={styles.disciplinesHeading}>Disciplines</h3>
				<div className={styles.disciplineItems}>
					{disciplineItems.map((item) => {
						return (
							<DisciplineElement
								onClick={() => onChangeDiscipline(item.value)}
								active={item.value === chosenDiscipline}
								icon={<item.iconFC width={25} height={25} />}
								text={item.label}
								key={item.value}
							/>
						);
					})}
				</div>
				<label className={styles.label}>
					Language version
					<InfoPopover iconType={'help'}>Choose the language version the task will work for.</InfoPopover>
				</label>
				<Select
					className={styles.languageVersionSelect}
					values={selectProps.values}
					activeValue={selectProps.activeValue}
					onChange={selectProps.onChange}
				/>
				<label className={styles.label}>
					Estimated Rank
					<InfoPopover iconType={'help'}>
						Choose the rank you are expecting this task to be ranked as.
					</InfoPopover>
				</label>
				<Select
					values={rankSelectProps.values}
					activeValue={rankSelectProps.activeValue}
					onChange={rankSelectProps.onChange}
				/>
				<label className={styles.label} htmlFor="tags">
					Tags
				</label>
				<input
					id="tags"
					placeholder="Enter Tags (separated by comma)"
					value={tags}
					onChange={(newRank: ChangeEvent<HTMLInputElement>) => setTags(newRank.target.value)}
				/>
				<FormGroup>
					<FormControlLabel
						value="bottom"
						control={
							<Switch checked={isSelectedSwitch} onChange={(e) => onSwitchClick(!isSelectedSwitch)} />
						}
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
