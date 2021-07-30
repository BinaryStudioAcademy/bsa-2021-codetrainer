import React, { useState } from 'react';
import { Classes, H2, H4, Label, Switch } from '@blueprintjs/core';
import { ReactComponent as Fundamentals } from '../../assets/books-icon.svg';
import { ReactComponent as Rankup } from '../../assets/rank-up-icon.svg';
import { ReactComponent as Practice } from '../../assets/practice-icon.svg';
import { ReactComponent as Beta } from '../../assets/beta-icon.svg';
import { ReactComponent as Random } from '../../assets/shuffle-icon.svg';
import RadioItem from './RadioItem';
import InfoPopover from 'components/InfoPopover';
import '../../styles/index.scss';
import styles from './create-task-settings.module.scss';
interface ICreateTaskSettingsProps {}
interface IRadioItem {
	element: React.ReactElement;
	text: string;
	elementClass: string;
}
const CreateTaskSettings: React.FC<ICreateTaskSettingsProps> = () => {
	const [checkedState, setChecked] = useState('fundamentals');
	let i = 0;
	const [switchCheck, setSwitchCheck] = useState(true);
	const RADIO_ITEMS: IRadioItem[] = [
		{
			element: <Fundamentals key={i++} />,
			elementClass: 'fundamentals',
			text: 'Fundamentals',
		},
		{
			element: <Rankup key={i++} />,
			elementClass: 'rankup',
			text: 'Rank Up',
		},
		{
			element: <Practice key={i++} />,
			elementClass: 'practice',
			text: 'Practice',
		},
		{
			element: <Beta key={i++} />,
			elementClass: 'beta',
			text: 'Beta',
		},
		{
			element: <Random key={i++} />,
			elementClass: 'random',
			text: 'Random',
		},
	];
	return (
		<div className={styles.createTaskSettings}>
			<H2 className="heading">Create a New Task</H2>
			<form>
				<Label htmlFor="task-name">Name</Label>
				<input className={Classes.INPUT} id="task-name" placeholder="Enter Task Name" />
				<H4 className={styles.disciplinesHeading}>Disciplines</H4>
				<div className={styles.radioList}>
					{RADIO_ITEMS.map((item, index) => {
						return (
							<RadioItem
								component={item.element}
								checkedState={checkedState}
								setChecked={setChecked}
								classNameComp={item.elementClass}
								text={item.text}
								key={index}
							/>
						);
					})}
				</div>

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
                    */}
				{/* <Select values={focusValues} activeValue={activeFocusValue} onChange={setActiveFocusValue} /> */}

				<Label htmlFor="estimated-rank">
					Estimated Rank
					<InfoPopover>Choose the rank you are expecting this task to be ranked as.</InfoPopover>
				</Label>
				<input className={Classes.INPUT} id="estimated-rank" placeholder="Enter Estimated Rank" />

				<Label htmlFor="tags">Tags</Label>
				<input className={Classes.INPUT} id="tags" placeholder="Enter Tags (separated by comma)" />

				<div>
					<Switch
						id="allow-contributors"
						inline
						checked={switchCheck}
						onChange={() => {
							setSwitchCheck(!switchCheck);
						}}
						labelElement={
							<span>
								Allow contributors?
								<InfoPopover>
									Check to allow contributors to make changes to this task while it&apos;s in beta.
									You will be notified of any edits made by other users.
								</InfoPopover>
							</span>
						}
					/>
				</div>
			</form>
		</div>
	);
};

export default CreateTaskSettings;
