import { initialState, ICreateTaskState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const createTaskReducer = createReducer<ICreateTaskState>(initialState, {});
