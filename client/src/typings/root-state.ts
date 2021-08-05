import { IExampleState } from 'containers/example/logic/state';
import { IProfileState } from 'containers/profile/logic/state';
import { IAuthState } from 'containers/routing/logic/state';

export interface IRootState {
	profile: IProfileState;
	example: IExampleState;
	auth: IAuthState;
}
