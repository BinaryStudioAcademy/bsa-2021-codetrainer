import { IRootState } from 'typings/root-state';

export const getTask = (state: IRootState) => state.task;

export type TypeGetTask = ReturnType<typeof getTask>;
