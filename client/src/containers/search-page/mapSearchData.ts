import { ISearchPageProps } from 'components/pages/search-page';
import { ISearchState } from './logic/state';
import { mapDataToChallenges } from 'helpers/maps';

export const mapSearchData = (data: ISearchState['search']): ISearchPageProps['data'] => {
	return {
		count: Number(data?.count || '0'),
		tags: data?.tags || [],
		ranks: (data?.ranks || []).map(({ rank }) => rank).sort((a, b) => a - b),
		challenges: (data?.tasks || []).map(mapDataToChallenges),
	};
};

export const mapFilterToSearch = (filter: ISearchState['filter']): Record<string, any> => {
	const filterMod = Object.fromEntries(
		Object.entries(filter).filter(([_key, value]) => {
			return typeof value === 'string' ? Boolean(value.length) : value !== null;
		}),
	);
	return {
		...filterMod,
		...(Boolean(filter.tags.size) ? { tags: Array.from(filter.tags).map((tag) => ({ name: tag })) } : {}),
	};
};
