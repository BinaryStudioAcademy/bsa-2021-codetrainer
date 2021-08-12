import React, { useState } from 'react';
import { CreateTaskSettings } from 'components/pages';
import { DISCIPLINE_ITEMS, SELECT_PROPS } from '../mock';
import { Discipline, IDisciplineItem } from '../logic/models';
import { ISelectValue } from 'components/basic/select/interface';

export const CreateSettings = () => {
	const [chosenDiscipline, setDiscipline] = useState<IDisciplineItem>(DISCIPLINE_ITEMS[0]);
	const onChangeDiscipline = (newDiscipline: Discipline) => {
		const foundDisciplineItem: IDisciplineItem = findDisciplineItem(newDiscipline);
		setDiscipline(foundDisciplineItem);
	};
	const [isSelectedSwitch, setSelectedSwitch] = useState(false);
	const onSwitchClick = (newSwitchState: boolean) => {
		setSelectedSwitch(newSwitchState);
	};

	const [language, setLanguage] = useState(SELECT_PROPS.values[0]);
	return (
		<div>
			<CreateTaskSettings
				disciplineItems={DISCIPLINE_ITEMS}
				chosenDiscipline={chosenDiscipline.value}
				onChangeDiscipline={onChangeDiscipline}
				isSelectedSwitch={isSelectedSwitch}
				onSwitchClick={onSwitchClick}
				selectProps={{
					...SELECT_PROPS,
					activeValue: language,
					onChange: (value: ISelectValue) => {
						setLanguage(value);
					},
				}}
			/>
		</div>
	);
};

const findDisciplineItem = (newDiscipline: Discipline) => {
	const result = DISCIPLINE_ITEMS.find((item) => item.value === newDiscipline);
	if (result) {
		return result;
	}
	return DISCIPLINE_ITEMS[0];
};
