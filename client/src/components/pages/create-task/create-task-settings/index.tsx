import React, { ChangeEvent } from 'react';
import { Classes, RadioGroup } from '@blueprintjs/core';
import RadioItem from '../radio-item';
import { InfoPopover, Select, Switch } from 'components/basic';
import styles from './create-task-settings.module.scss';
import { Discipline, IDisciplineItem } from 'containers/create-new-task/logic/models';
import { ISelectProps } from 'components/basic/select/interface';

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
}

export const CreateTaskSettings = ({
	disciplineItems,
	onChangeDiscipline,
	chosenDiscipline,
	onSwitchClick,
	isSelectedSwitch,
	selectProps,
	taskName,
	setTaskName,
	rank,
	setRank,
	tags,
	setTags,
}: ICreateTaskSettingsProps) => {
	return (
		<div className={styles.createTaskSettings}>
			<h2 className="heading">Create a New Task</h2>
			<form className={styles.settingsTask}>
				<label htmlFor="task-name">Name</label>
				<input
					className={Classes.INPUT}
					id="task-name"
					placeholder="Enter Task Name"
					value={taskName}
					onChange={(newText: ChangeEvent<HTMLInputElement>) => setTaskName(newText.target.value)}
				/>

				<h4 className={styles.disciplinesHeading}>Disciplines</h4>
				<RadioGroup
					name="discipline"
					onChange={(event) => onChangeDiscipline(event.currentTarget.value as Discipline)}
					className={styles.radioList}
					selectedValue={chosenDiscipline}
				>
					{disciplineItems.map((item, index) => {
						return (
							<RadioItem
								value={item.value}
								icon={<item.iconFC width={25} height={25} />}
								text={item.label}
								key={item.value}
							/>
						);
					})}
				</RadioGroup>

				<label>
					Language version
					<InfoPopover>Choose the language version the task will work for.</InfoPopover>
				</label>
				<Select
					values={selectProps.values}
					activeValue={selectProps.activeValue}
					onChange={selectProps.onChange}
				/>
				<label htmlFor="estimated-rank">
					Estimated Rank
					<InfoPopover>Choose the rank you are expecting this task to be ranked as.</InfoPopover>
				</label>
				<input
					className={Classes.INPUT}
					id="estimated-rank"
					placeholder="Enter Estimated Rank"
					value={rank}
					onChange={(newRank: ChangeEvent<HTMLInputElement>) => setRank(newRank.target.value)}
				/>

				<label htmlFor="tags">Tags</label>
				<input
					className={Classes.INPUT}
					id="tags"
					placeholder="Enter Tags (separated by comma)"
					value={tags}
					onChange={(newRank: ChangeEvent<HTMLInputElement>) => setTags(newRank.target.value)}
				/>

				<Switch checked={isSelectedSwitch} onChange={() => onSwitchClick(!isSelectedSwitch)}>
					<label>
						Allow contributors?
						<InfoPopover>
							Check to allow contributors to make changes to this task while it&apos;s in beta. You will
							be notified of any edits made by other users.
						</InfoPopover>
					</label>
				</Switch>
			</form>
		</div>
	);
};
