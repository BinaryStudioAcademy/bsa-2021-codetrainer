import { IProfileState } from './../containers/profile/logic/state';
import { IExampleState } from 'containers/example/logic/state';

export interface IRootState {
	example: IExampleState;
	profile: IProfileState;
}
