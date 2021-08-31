import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';
import { exampleReducer } from 'containers/example/logic/reducer';
import { profileReducer } from 'containers/profile/logic/reducer';
import { clansReducer } from 'containers/clans/clans/logic/reducer';
import { clanReducer } from 'containers/clans/clan/logic/reducer';
import { createTaskReducer } from 'containers/create-new-task/logic/reducer';
import { authReducer } from 'containers/auth/logic/reducer';
import { notificationReducer } from '../containers/notification/logic/reducer';
import { homeReducer } from 'containers/home-page/logic/reducer';
import { searchReducer } from 'containers/search-page/logic/reducer';
import { settingsReducer } from './../containers/setting-page/logic/reducer';
import { taskReducer } from './../containers/task-train/logic/reducer';
import { headerReducer } from 'containers/header/logic/reducer';
import { themeReducer } from 'containers/theme-switcher/logic/reducer';
import { taskInfoReducer } from 'containers/task/logic/reducer';
import { leaderBoardReducer } from 'containers/leaderboard/logic/reducer';
import { sidebarReducer } from 'containers/private-route/logic/reducer';

const rootReducer: Reducer<IRootState> = combineReducers({
	profile: profileReducer,
	clans: clansReducer,
	clan: clanReducer,
	leaderBoard: leaderBoardReducer,
	example: exampleReducer,
	auth: authReducer,
	createTask: createTaskReducer,
	notification: notificationReducer,
	home: homeReducer,
	search: searchReducer,
	settings: settingsReducer,
	task: taskReducer,
	header: headerReducer,
	theme: themeReducer,
	taskInfo: taskInfoReducer,
	sidebar: sidebarReducer,
});

export default rootReducer;
