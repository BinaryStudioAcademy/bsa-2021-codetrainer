import { IThemeState } from 'containers/theme-switcher/logic/state';
import { ICreateTaskState } from 'containers/create-new-task/logic/state';
import { IExampleState } from 'containers/example/logic/state';
import { IClansState } from 'containers/clans/clans/logic/state';
import { IClanState } from 'containers/clans/clan/logic/state';
import { IAuthState } from 'containers/auth/logic/state';
import { IProfileState } from 'containers/profile/logic/state';
import { INotificationState } from '../containers/notification/logic/state';
import { IHomeState } from 'containers/home-page/logic/state';
import { ISearchState } from 'containers/search-page/logic/state';
import { ISettingsState } from '../containers/setting-page/logic/state';
import { ITaskState } from '../containers/task-train/logic/state';
import { IHeaderState } from 'containers/header/logic/state';
import { ITaskInfoState } from 'containers/task/logic/state';
import { ILeaderBoardState } from 'containers/leaderboard/logic/state';

export interface IRootState {
	notification: INotificationState;
	profile: IProfileState;
	clans: IClansState;
	clan: IClanState;
	leaderBoard: ILeaderBoardState;
	createTask: ICreateTaskState;
	example: IExampleState;
	auth: IAuthState;
	home: IHomeState;
	search: ISearchState;
	settings: ISettingsState;
	task: ITaskState;
	header: IHeaderState;
	theme: IThemeState;
	taskInfo: ITaskInfoState;
}
