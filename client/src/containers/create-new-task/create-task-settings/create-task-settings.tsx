import React from 'react';
import { CreateTaskSettings } from 'components/pages';
import { DISCIPLINE_ITEMS } from '../mock';
import { useDispatch, useSelector } from 'react-redux';
import { Discipline } from '../logic/models';
import { IRootState } from 'typings/root-state';
import * as actions from '../logic/actions';
import { useCallback } from 'react';

export const CreateSettings = () => {
	const dispatch = useDispatch();
	const chosenDiscipline = useSelector((state: IRootState) => state.createTask.discipline);
	const onChangeDiscipline = useCallback(
		(newDiscipline: Discipline) => {
			dispatch(actions.setDiscipline({ discipline: newDiscipline }));
		},
		[dispatch],
	);
	const isSelectedSwitch = useSelector((state: IRootState) => state.createTask.isSelectedSwitch);
	const onSwitchClick = (newSwitchState: boolean) => {
		dispatch(actions.setSwitch({ isSelectedSwitch: newSwitchState }));
	};

	return (
		// header and sidebar etc here
		<div>
			<CreateTaskSettings
				disciplineItems={DISCIPLINE_ITEMS}
				chosenDiscipline={chosenDiscipline}
				onChangeDiscipline={onChangeDiscipline}
				isSelectedSwitch={isSelectedSwitch}
				onSwitchClick={onSwitchClick}
				selectValues={[]}
			/>
		</div>
	);
};
