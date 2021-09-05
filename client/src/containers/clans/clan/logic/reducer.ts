import * as actionTypes from './action-types';
import { IClanState, initialState } from './state';
import { createReducer } from 'helpers/create-reducer.helper';

export const clanReducer = createReducer<IClanState>(initialState, {
	[actionTypes.SET_STATUS](state, { status }: actionTypes.ISetStatusArgs) {
		return {
			...state,
			status,
		};
	},
	[actionTypes.SET_EDIT_STATUS](state, { status }: actionTypes.ISetStatusArgs) {
		return {
			...state,
			editStatus: status,
		};
	},
	[actionTypes.SET_INVITATION_STATUS](state, { status }: actionTypes.ISetStatusArgs) {
		return {
			...state,
			invitationStatus: status,
		};
	},
	[actionTypes.SET_CLAN](state, { clan }: actionTypes.ISetClansArgs) {
		return {
			...state,
			data: clan,
		};
	},
	[actionTypes.SET_COMMUNITY](state, { community }: actionTypes.ISetCommunityArgs) {
		return {
			...state,
			community,
		};
	},
	[actionTypes.SET_ERROR](state, { error }: actionTypes.ISetErrorArgs) {
		return {
			...state,
			error,
		};
	},
	[actionTypes.SET_MEMBERS_SORT](state, { sort: membersSort }: actionTypes.ISetMembersSortArgs) {
		return {
			...state,
			membersSort,
		};
	},
	[actionTypes.SET_MEMBERS_FILTER](state, { filter }: actionTypes.ISetMembersFilterArgs) {
		return {
			...state,
			membersFilter: { ...state.membersFilter, ...filter },
		}
	}
});
