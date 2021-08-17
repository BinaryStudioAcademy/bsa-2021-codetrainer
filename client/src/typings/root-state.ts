import { IThemeState } from './../components/common/theme-switcher/logic/state';
import { ICreateTaskState } from 'containers/create-new-task/logic/state';
import { IExampleState } from 'containers/example/logic/state';
import { IClansState } from 'containers/clans/clans/logic/state';
import { IClanState } from 'containers/clans/clan/logic/state';
import { IAuthState } from 'containers/auth/logic/state';
import { IProfileState } from 'containers/profile/logic/state';
import { INotificationState } from '../containers/notification/logic/state';
import { ISearchState } from 'containers/search-page/logic/state';
import { ISettingsState } from '../containers/setting-page/logic/state';

export interface IRootState {
	notification: INotificationState;
	profile: IProfileState;
	clans: IClansState;
	clan: IClanState;
	createTask: ICreateTaskState;
	example: IExampleState;
	auth: IAuthState;
	search: ISearchState;
	settings: ISettingsState;
	theme: IThemeState;
}
