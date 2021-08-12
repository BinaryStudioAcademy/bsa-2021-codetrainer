import { TClans } from 'containers/clans/types';

export interface IClansListProps {
	clans: TClans;
	userId: string;
	joinClan: (clanId: string) => void;
	leaveClan: (clanId: string) => void;
}
