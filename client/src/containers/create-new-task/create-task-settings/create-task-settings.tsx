import React from 'react';
import { CreateTaskSettings } from 'components/pages';
import { DISCIPLINE_ITEMS, SELECT_PROPS } from '../mock';
import { Discipline, IDisciplineItem } from '../logic/models';
import { ISelectProps, ISelectValue } from 'components/basic/select/interface';

interface ICreateSettingsProps {
	chosenDiscipline: IDisciplineItem;
	onChangeDiscipline: (newDiscipline: Discipline) => void;
	isSelectedSwitch: boolean;
	onSwitchClick: (newSwitchState: boolean) => void;
	language: ISelectValue;
	setLanguage: (value: ISelectValue) => void;
	taskName: string;
	setTaskName: (value: string) => void;
	rank: ISelectValue;
	setRank: (value: ISelectValue) => void;
	tags: string;
	setTags: (value: string) => void;
	rankSelectProps: ISelectProps;
}

export const CreateSettings = ({
	chosenDiscipline,
	onChangeDiscipline,
	isSelectedSwitch,
	onSwitchClick,
	language,
	setLanguage,
	taskName,
	setTaskName,
	rank,
	setRank,
	tags,
	setTags,
	rankSelectProps,
}: ICreateSettingsProps) => {
	return (
		<CreateTaskSettings
			taskName={taskName}
			setTaskName={setTaskName}
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
			rank={rank}
			setRank={setRank}
			tags={tags}
			setTags={setTags}
			rankSelectProps={rankSelectProps}
		/>
	);
};

export const findDisciplineItem = (newDiscipline: Discipline) => {
	const result = DISCIPLINE_ITEMS.find((item) => item.value === newDiscipline);
	if (result) {
		return result;
	}
	return DISCIPLINE_ITEMS[0];
};
