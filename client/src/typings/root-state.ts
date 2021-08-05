import { IProfileState } from './../containers/profile/logic/state';
import { IExampleState } from 'containers/example/logic/state';
import { IClansState } from 'containers/clans/logic/state';

export interface IRootState {
	example: IExampleState;
	profile: IProfileState;
	clans: IClansState;
}
