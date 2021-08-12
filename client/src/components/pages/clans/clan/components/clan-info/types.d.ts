import { IClan } from 'containers/clans/types';

export interface IClanInfoProps {
	leaveClan: () => void;
	clan: IClan;
}
