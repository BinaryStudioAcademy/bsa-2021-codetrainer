import { TClans, IClan } from 'containers/clans/clans/logic/state';

type TSortCallback = () => void;

export interface IClansProps {
	clans: TClans;
	sortByRank: TSortCallback;
	sortByTime: TSortCallback;
	sortBySize: TSortCallback;
}

export interface IClanProps {
	clan: IClan;
	sortByRank: TSortCallback;
	sortByTime: TSortCallback;
}
