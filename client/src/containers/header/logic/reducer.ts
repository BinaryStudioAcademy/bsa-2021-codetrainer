import { notificationsReducer } from '../notifications/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IHeaderState } from './state';

export const headerReducer: Reducer<IHeaderState> = combineReducers({
	notifications: notificationsReducer,
});
