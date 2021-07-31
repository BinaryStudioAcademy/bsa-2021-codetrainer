import React, { FC, SVGProps, useState } from 'react';
import { Classes, H2, H4, Label, RadioGroup } from '@blueprintjs/core';
import RadioItem from '../radio-item';
import { Disciplines } from 'constants/disciplines';
import { InfoPopover, Switch } from 'components/basic';
import styles from './create-task-settings.module.scss';
import { ReactComponent as FundamentalsIcon } from 'assets/icons/books-icon.svg';
import { ReactComponent as RankUpIcon } from 'assets/icons/rank-up-icon.svg';
import { ReactComponent as PracticeIcon } from 'assets/icons/practice-icon.svg';
import { ReactComponent as BetaIcon } from 'assets/icons/beta-icon.svg';
import { ReactComponent as RandomIcon } from 'assets/icons/shuffle-icon.svg';

type TSvgFC = FC<SVGProps<SVGSVGElement>>;

interface IDisciplineItem {
	value: Disciplines;
	iconFC: TSvgFC;
	label: string;
}

const DISCIPLINE_ITEMS: IDisciplineItem[] = [
	{
		value: Disciplines.FUNDAMENTALS,
		iconFC: FundamentalsIcon,
		label: 'Fundamentals',
	},
	{
		value: Disciplines.RANK_UP,
		iconFC: RankUpIcon,
		label: 'Rank Up',
	},
	{
		value: Disciplines.PRACTICE,
		iconFC: PracticeIcon,
		label: 'Practice',
	},
	{
		value: Disciplines.BETA,
		iconFC: BetaIcon,
		label: 'Beta',
	},
	{
		value: Disciplines.RANDOM,
		iconFC: RandomIcon,
		label: 'Random',
	},
];

interface ICreateTaskSettingsProps {}

const CreateTaskSettings: FC<ICreateTaskSettingsProps> = () => {
	const [discipline, setDiscipline] = useState<Disciplines>(Disciplines.FUNDAMENTALS);
	const [allowContributors, setAllowContributors] = useState(true);

	return (
		<div className={styles.createTaskSettings}>
			<H2 className="heading">Create a New Task</H2>
			<form>
				<Label htmlFor="task-name">Name</Label>
				<input className={Classes.INPUT} id="task-name" placeholder="Enter Task Name" />

				<H4 className={styles.disciplinesHeading}>Disciplines</H4>
				<RadioGroup
					name="discipline"
					onChange={(event) => setDiscipline(event.currentTarget.value as Disciplines)}
					className={styles.radioList}
					selectedValue={discipline}
				>
					{DISCIPLINE_ITEMS.map((item, index) => {
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

				{/* 
					value interface: {
						title: string,
						icon: string
					}
					Select interface: {
						values: value[],
						activeValueL: value,
						onChange: React.Dispatch<React.SetStateAction<ISelectValue>>
					}
					<Select values={focusValues} activeValue={activeFocusValue} onChange={setActiveFocusValue} /> 
				*/}

				<Label htmlFor="estimated-rank">
					Estimated Rank
					<InfoPopover>Choose the rank you are expecting this task to be ranked as.</InfoPopover>
				</Label>
				<input className={Classes.INPUT} id="estimated-rank" placeholder="Enter Estimated Rank" />

				<Label htmlFor="tags">Tags</Label>
				<input className={Classes.INPUT} id="tags" placeholder="Enter Tags (separated by comma)" />

				<Switch
					inline
					id="allow-contributors"
					checked={allowContributors}
					onChange={() => setAllowContributors(!allowContributors)}
					labelElement={
						<span>
							Allow contributors?
							<InfoPopover>
								Check to allow contributors to make changes to this task while it&apos;s in beta. You
								will be notified of any edits made by other users.
							</InfoPopover>
						</span>
					}
				/>
			</form>
		</div>
	);
};

export default CreateTaskSettings;
