import { createReducer } from 'helpers/create-reducer.helper';
import * as types from './action-types';
import { ISocialSettingsState, initialState } from './state';

export const socialSettingsReducer = createReducer<ISocialSettingsState>(initialState, {
	[types.SocialSettingsActions.GITHUB_ERROR](state, action: types.TGithubErrorArgs) {
		return {
			...state,
			github: {
				...state.github,
				error: action.error,
			},
		};
	},
});
