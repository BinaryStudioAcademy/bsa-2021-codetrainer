import { createAction } from 'helpers/create-action.helper';
import * as actionTypes from './action-types';

export const setDiscipline = createAction<actionTypes.TSetDisciplineArgs>(actionTypes.SET_DISCIPLINE);

export const setSwitch = createAction<actionTypes.TSetSwitchArgs>(actionTypes.SET_SWITCH);
