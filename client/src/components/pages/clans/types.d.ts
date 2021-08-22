import { SortOptions as ClansSortOptions } from 'containers/clans/clans/logic/state';
import { SortOptions as ClanSortOptions } from 'containers/clans/clan/logic/state';
import { TClans, IClan, IUser } from 'containers/clans/types';
import { IUser as IUserStore } from 'typings/common/IUser';

type TSortCallback = () => void;

export interface IClansProps {
	user: IUser;
	clans: TClans;
	sortByRank: TSortCallback;
	sortByTime: TSortCallback;
	sortBySize: TSortCallback;
	joinClan: (id: string) => void;
	leaveClan: (id: string) => void;
	currentSort: ClansSortOptions;
	handleGoToClan: () => void;
}

export interface IClanProps {
	leaveClan: () => void;
	clan: IClan;
	sortByRank: TSortCallback;
	sortByTime: TSortCallback;
	currentSort: ClanSortOptions;
	user: IUserStore | null;
	handleDeleteClan: () => void;
	modalShown: boolean;
	setModalShown: (value: boolean) => void;
}
