import { exampleReducer } from 'containers/example/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';
import { notificationReducer } from '../containers/notification/logic/reducer';

const rootReducer: Reducer<IRootState> = combineReducers({
	example: exampleReducer,
	notification: notificationReducer,
});

export default rootReducer;
