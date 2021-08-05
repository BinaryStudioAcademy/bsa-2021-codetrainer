import { Discipline } from './models';

export const SET_DISCIPLINE = 'CREATE_TASK:SET_DISCIPLINE';
export const SET_SWITCH = 'CREATE_TASK:SET_SWITCH';

export type TSetDisciplineArgs = {
	discipline: Discipline;
};

export type TSetSwitchArgs = {
	isSelectedSwitch: boolean;
};
