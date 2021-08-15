import { WebApi } from 'typings/webapi';

export interface IClansListProps {
	clans: WebApi.Entities.TClans;
	userId: string;
	joinClan: (clanId: string) => void;
	leaveClan: (clanId: string) => void;
}
