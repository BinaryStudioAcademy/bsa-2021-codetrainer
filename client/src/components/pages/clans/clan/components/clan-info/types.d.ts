import { WebApi } from 'typings/webapi';

export interface IClanInfoProps {
	leaveClan: () => void;
	clan: WebApi.Entities.IClan;
}
