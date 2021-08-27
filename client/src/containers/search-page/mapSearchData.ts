import { ISearchPageProps } from 'components/pages/search-page';
import { ISearchState } from './logic/state';
import { ROUTES } from 'constants/routes';

export const mapSearchData = (data: ISearchState['search']): ISearchPageProps['data'] => {
	return {
		count: Number(data?.count || '0'),
		tags: data?.tags || [],
		ranks: (data?.ranks || []).map(({ rank }) => rank).sort((a, b) => a - b),
		challenges: (data?.tasks || []).map((task) => ({
			id: task.id,
			title: task.name,
			rank: task.rank,
			tags: task.tags.map((tag) => tag.name),
			linkToTask: `${ROUTES.TaskInfo}/${task.id}`,
			author: {
				firstName: task?.user?.name || '',
				lastName: task?.user?.surname || '',
				link: ROUTES.Users + '/' + task?.user?.username || ROUTES.NotFound,
			},
			stats: {
				favoriteSaves: 0,
				positiveFeedback: 0,
			},
		})),
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
		...(Boolean(filter.tags.size) ? { tags: Array.from(filter.tags).join(',') } : {}),
	};
};
