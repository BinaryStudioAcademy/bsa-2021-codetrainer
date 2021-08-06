import { ISelectValue } from 'components/basic/select/interface';
import { Discipline } from './models';
import { ReactComponent as RankUpIcon } from 'assets/icons/rank-up-icon.svg';

export interface ICreateTaskState {
	discipline: Discipline;
	isSelectedSwitch: boolean;
	languageVersion: ISelectValue;
}

export const initialState: ICreateTaskState = {
	discipline: Discipline.FUNDAMENTALS,
	isSelectedSwitch: false,
	languageVersion: {
		id: 1,
		title: '7.3',
		iconFC: RankUpIcon,
	},
};
