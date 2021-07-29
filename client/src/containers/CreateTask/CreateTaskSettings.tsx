import React, { useState } from 'react';
import { Classes, H2, H4, Label, Switch } from '@blueprintjs/core';
import { ReactComponent as Fundamentals } from '../../assets/books-icon.svg';
import { ReactComponent as Rankup } from '../../assets/rank-up-icon.svg';
import { ReactComponent as Practice } from '../../assets/practice-icon.svg';
import { ReactComponent as Beta } from '../../assets/beta-icon.svg';
import { ReactComponent as Random } from '../../assets/shuffle-icon.svg';
import RadioItem from './RadioItem';
import InfoPopover from 'components/InfoPopover';
import './create-task-settings.scss';

interface Props {}

const CreateTaskSettings: React.FC<Props> = () => {
	const [checkedState, setChecked] = useState('fundamentals');
	const CLASSES = ['fundamentals', 'rankup', 'practice', 'beta', 'random'];
	const TEXTS = ['Fundamentals', 'Rank Up', 'Practice', 'Beta', 'Random'];
	let i = 0;
	const ELEMENTS = [
		<Fundamentals key={i++} />,
		<Rankup key={i++} />,
		<Practice key={i++} />,
		<Beta key={i++} />,
		<Random key={i++} />,
	];
	const [switchCheck, setSwitchCheck] = useState(true);
	return (
		<div className="create-task-settings">
			<H2 className="heading">Create a New Task</H2>
			<form>
				<Label htmlFor="task-name">Name</Label>
				<input className={Classes.INPUT} id="task-name" placeholder="Enter Task Name" />
				<H4 className="disciplines-heading">Disciplines</H4>
				<div className="radio-list">
					{CLASSES.map((item, index) => {
						return (
							<RadioItem
								component={ELEMENTS[index]}
								checkedState={checkedState}
								setChecked={setChecked}
								classNameComp={item}
								text={TEXTS[index]}
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
