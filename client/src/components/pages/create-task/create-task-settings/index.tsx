import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { InfoPopover, Select } from 'components/basic';
import { Discipline, IDisciplineItem } from 'containers/create-new-task/data';
import { ISelectValue } from 'components/basic/select/interface';
import DisciplineElement from '../discipline-element';

import './create-task-settings.scss';
import styles from './create-task-settings.module.scss';

interface ICreateTaskSettingsProps {
	disciplineItems: IDisciplineItem[];
	discipline?: Discipline;
	tags?: string[];
	name?: string;
	rank: ISelectValue;
	ranks: ISelectValue[];
	onChange: (type: string, value: string | { name: string }[] | boolean) => void;
}

export const CreateTaskSettings: React.FC<ICreateTaskSettingsProps> = ({
	disciplineItems,
	discipline,
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
									icon={item.icon}
									text={item.label}
									key={item.value}
								/>
							);
						})}
					</div>
				</div>
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
			</form>
		</div>
	);
};
