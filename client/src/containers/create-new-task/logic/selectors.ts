import { IRootState } from 'typings/root-state';

export const getTask = (state: IRootState) => state.createTask;

export type TypeGetTask = ReturnType<typeof getTask>;
