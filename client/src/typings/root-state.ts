import { IExampleState } from 'containers/example/logic/state';
import { IAuthState } from 'containers/routing/logic/state';

export interface IRootState {
	example: IExampleState;
	auth: IAuthState;
}
