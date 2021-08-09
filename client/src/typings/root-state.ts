import { IExampleState } from 'containers/example/logic/state';
import { IClansState } from 'containers/clans/clans/logic/state';
import { IClanState } from 'containers/clans/clan/logic/state';
import { IAuthState } from './auth';
import { IAuthState as IRoutingState } from 'containers/routing/logic/state';
import { IProfileState } from 'containers/profile/logic/state';
import { INotificationState } from '../containers/notification/logic/state';

export interface IRootState {
	notification: INotificationState;
	profile: IProfileState;
	clans: IClansState;
	clan: IClanState;
	example: IExampleState;
	auth: IAuthState;
	routing: IRoutingState;
}
