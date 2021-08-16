import { combineReducers, Reducer } from 'redux';
import { ISettingsState } from './state';
import { socialSettingsReducer } from './../social/logic/reducer';

export const settingsReducer: Reducer<ISettingsState> = combineReducers({
	social: socialSettingsReducer,
});
