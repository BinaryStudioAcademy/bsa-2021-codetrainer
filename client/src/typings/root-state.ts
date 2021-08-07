import { IProfileState } from './../containers/profile/logic/state';
import { IExampleState } from 'containers/example/logic/state';
import { IClansState } from 'containers/clans/clans/logic/state';
import { IClanState } from 'containers/clans/clan/logic/state';

export interface IRootState {
	example: IExampleState;
	profile: IProfileState;
	clans: IClansState;
	clan: IClanState;
}
