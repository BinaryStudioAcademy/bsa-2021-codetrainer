export const TASKS_ON_PAGE = 10;

export enum TASK_ORDER_BY {
	NEWEST = 'newest',
	OLDEST = 'oldest',
	HARDEST = 'hardest',
	EASIEST = 'easiest',
	NAME = 'name',
}

export enum SEARCH_PROGRESS {
	COMPLETED = 'completed',
	NOT_COMPLETED = 'notCompleted',
	ALL = 'all',
}

export enum SEARCH_KEYS {
	PROGRESS = 'progress',
	Query = 'query',
	RANK = 'rank',
	TAGS = 'tags',
}

export const TASK_QUERY_SEPARATOR = ',';
