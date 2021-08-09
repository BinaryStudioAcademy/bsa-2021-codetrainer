import { ISelectValue } from 'components/basic/select/interface';
import { Discipline } from './models';

export const SET_DISCIPLINE = 'CREATE_TASK:SET_DISCIPLINE';
export const SET_SWITCH = 'CREATE_TASK:SET_SWITCH';
export const SET_LANGUAGE_VERSION = 'CREATE_TASK:SET_LANGUAGE_VERSION';

export type TSetDisciplineArgs = {
	discipline: Discipline;
};

export type TSetSwitchArgs = {
	isSelectedSwitch: boolean;
};

export type TSetLanguageVersionArgs = {
	languageVersion: ISelectValue;
};
