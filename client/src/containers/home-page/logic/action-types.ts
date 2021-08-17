export const GET_TASKS = 'HOME:GET_TASKS';
export const SET_TASK = 'HOME:SET_TASK';

export type TGetTask = {
	discipline: string;
	currentTask?: string;
}

export type TSetTask = {
	task: {
		id: string
		name: string;
		description: string;
		rank: number;
		tags: string[];
	};
}
