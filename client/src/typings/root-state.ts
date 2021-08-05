import { IProfileState } from './../containers/profile/logic/state';
import { IExampleState } from 'containers/example/logic/state';
import { IAuthState } from './auth';

export interface IRootState {
	auth: IAuthState;
	example: IExampleState;
	profile: IProfileState;
}
