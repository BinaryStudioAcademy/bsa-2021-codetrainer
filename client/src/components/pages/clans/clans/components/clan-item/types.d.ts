import { WebApi } from 'typings/webapi';

export interface IClanItemProps {
	joinClan: (clanId: string) => void;
	leaveClan: (clanId: string) => void;
	clan: WebApi.Entities.IClan;
	userId: string;
}
