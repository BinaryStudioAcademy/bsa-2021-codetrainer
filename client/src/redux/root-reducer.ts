import { exampleReducer } from 'containers/example/logic/reducer';
import { profileReducer } from 'containers/profile/logic/reducer';
import { createTaskReducer } from 'containers/create-new-task/logic/reducer';
import { authReducer } from 'containers/auth/logic/reducer';
import { routingReducer } from 'containers/routing/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';
import { notificationReducer } from '../containers/notification/logic/reducer';

const rootReducer: Reducer<IRootState> = combineReducers({
	profile: profileReducer,
	example: exampleReducer,
	routing: routingReducer,
	auth: authReducer,
	createTask: createTaskReducer,
	notification: notificationReducer,
});

export default rootReducer;
