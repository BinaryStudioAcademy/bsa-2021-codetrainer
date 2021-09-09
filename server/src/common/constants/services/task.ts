import { TASK_DISCIPLINE } from '..';

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

export enum SEARCH_FOCUS_KEYS {
	FUNDAMENTALS = 'fundamentals',
	ALGORITHMS = 'algorithms',
	BUG_FIXES = 'bugfixes',
	RANK_UP = 'rankUp',
	RANDOM = 'random',
}

export const FocusRankUp = 3;

export const TASK_QUERY_SEPARATOR = ',';
