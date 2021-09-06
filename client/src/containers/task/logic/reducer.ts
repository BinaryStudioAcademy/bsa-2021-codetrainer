import { initialState, ITaskInfoState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';
import * as actionTypes from './action-types';

export const taskInfoReducer = createReducer<ITaskInfoState>(initialState, {
	[actionTypes.SET_TASK](state, action: actionTypes.TSetTask) {
		return {
			...state,
			task: action.task,
			nextTaskId: null,
		};
	},
	[actionTypes.SET_NOT_FOUND](state, action: actionTypes.TSetNotFound) {
		return {
			...state,
			notFound: action.notFound,
		};
	},
	[actionTypes.SET_TASKS](state, action: actionTypes.TSetTasks) {
		return {
			...state,
			similarTasks: action.similarTasks,
		};
	},
	[actionTypes.SET_NEXT_TASK](state, action: actionTypes.TSetNextTask) {
		return {
			...state,
			nextTaskId: action.nextTaskId,
		};
	},
	[actionTypes.SET_FOLLOWING](state, action: actionTypes.TSetFollowing) {
		return {
			...state,
			following: action.following,
		};
	},
	[actionTypes.SET_COMMENTS](state, { comments }: actionTypes.TSetComments) {
		return {
			...state,
			comments: {
				...state.comments,
				items: comments,
			},
		};
	},
	[actionTypes.ADD_COMMENTS](state, { comments, before, unique }: actionTypes.TAddComments) {
		const items = unique
			? comments.filter(
					(comment) =>
						!Boolean(state.comments.items?.find((existingComment) => comment.id === existingComment.id)),
			  )
			: comments;

		return {
			...state,
			comments: {
				...state.comments,
				items: before
					? [...items, ...(state.comments.items || [])]
					: [...(state.comments.items || []), ...items],
			},
		};
	},
	[actionTypes.INCREMENT_COMMENTS_PAGE](state, action) {
		return {
			...state,
			comments: {
				...state.comments,
				options: {
					...state.comments.options,
					page: state.comments.options.page + 1,
				},
			},
		};
	},
	[actionTypes.SET_COMMENTS_PAGE](state, { page }: actionTypes.TSetCommentsPage) {
		return {
			...state,
			comments: {
				...state.comments,
				options: {
					...state.comments.options,
					page,
				},
			},
		};
	},
	[actionTypes.SET_NUMBER_OF_COMMENTS](state, { numberOfComments }: actionTypes.TSetNumberOfComments) {
		return {
			...state,
			comments: {
				...state.comments,
				numberOfComments,
			},
		};
	},
	[actionTypes.UPDATE_PAGINATION](state, action) {
		return {
			...state,
			comments: {
				...state.comments,
				options: {
					...state.comments.options,
					hasNextPage: state.comments.numberOfComments > Number(state.comments.items?.length),
				},
			},
		};
	},
});
