import { SortOptions } from 'containers/clans/clan/logic/state';

export interface IMembersSortProps {
	sortByTime: TSortCallback;
	sortByRank: TSortCallback;
	currentSort: SortOptions;
}
