import * as types from './action-types';
import { createAction } from 'helpers/create-action.helper';

export const linkToGithub = createAction<types.TLinkToGithubArgs>(types.SocialSettingsActions.LINK_TO_GITHUB);
export const unlinkFromGithub = createAction(types.SocialSettingsActions.UNLINK_FROM_GITHUB);
export const githubError = createAction<types.TGithubErrorArgs>(types.SocialSettingsActions.GITHUB_ERROR);
