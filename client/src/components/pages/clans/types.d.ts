import { TClans } from 'containers/clans/logic/state';

type TSortCallback = () => void;

export interface IClansProps {
	clans: TClans;
	sortByRank: TSortCallback;
	sortByTime: TSortCallback;
	sortBySize: TSortCallback;
}
