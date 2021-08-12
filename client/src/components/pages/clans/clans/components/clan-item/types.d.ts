import { IClan } from 'containers/clans/types';

export interface IClanItemProps {
	joinClan: (clanId: string) => void;
	leaveClan: (clanId: string) => void;
	clan: IClan;
	userId: string;
}
