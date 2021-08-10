import React from 'react';
import { SearchPage as SearchPageComponent } from 'components';
import { ISearchPageProps } from 'components/pages/search-page';

export const SearchPage = () => {
	return (
		<>
			<SearchPageComponent {...searchPageProps} />
		</>
	);
};

const searchPageProps: ISearchPageProps = {
	ranks: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	tags: [
		{
			tagName: 'Fundamentals',
			numberOfTasks: 350,
		},
		{
			tagName: 'Rank Up',
			numberOfTasks: 45,
		},
		{
			tagName: 'Practice and Repeat',
			numberOfTasks: 68,
		},
		{
			tagName: 'Beta',
			numberOfTasks: 108,
		},
		{
			tagName: 'Random',
			numberOfTasks: 52,
		},
		{
			tagName: 'Fundamentals',
			numberOfTasks: 350,
		},
		{
			tagName: 'Rank Up',
			numberOfTasks: 45,
		},
		{
			tagName: 'Practice and Repeat',
			numberOfTasks: 68,
		},
		{
			tagName: 'Beta',
			numberOfTasks: 108,
		},
		{
			tagName: 'Random',
			numberOfTasks: 52,
		},
	],
	challenges: [{
		id: '1',
		linkToAuthor: '/',
		author: {
			firstName: 'A',
			lastName: 'B',
			link: '/',
		},
		stats: {
			favoriteSaves: 12,
			positiveFeedback: 12,
		},
		title: 'Title',
		rank: 2,
		tags: ['Tag 1', 'Tag 2'],
	}],
};
