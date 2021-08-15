import { exampleReducer } from 'containers/example/logic/reducer';
import { profileReducer } from 'containers/profile/logic/reducer';
import { clansReducer } from 'containers/clans/clans/logic/reducer';
import { clanReducer } from 'containers/clans/clan/logic/reducer';
import { createTaskReducer } from 'containers/create-new-task/logic/reducer';
import { authReducer } from 'containers/auth/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';
import { notificationReducer } from '../containers/notification/logic/reducer';
import { searchReducer } from 'containers/search-page/logic/reducer';
import { settingsReducer } from './../containers/setting-page/logic/reducer';

const rootReducer: Reducer<IRootState> = combineReducers({
	profile: profileReducer,
	clans: clansReducer,
	clan: clanReducer,
	example: exampleReducer,
	auth: authReducer,
	createTask: createTaskReducer,
	notification: notificationReducer,
	search: searchReducer,
	settings: settingsReducer,
});

export default rootReducer;
