import { Discipline } from './models';

export interface ICreateTaskState {
	discipline: Discipline;
	isSelectedSwitch: boolean;
}

export const initialState: ICreateTaskState = {
	discipline: Discipline.FUNDAMENTALS,
	isSelectedSwitch: false,
};
