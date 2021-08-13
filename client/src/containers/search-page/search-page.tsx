import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FullscreenLoader, SearchPage as SearchPageComponent } from 'components';
import { ISearchPageProps } from 'components/pages/search-page';
import { useAppSelector } from 'hooks/useAppSelector';
import * as actions from './logic/actions';
import { mapFilterToSearch, mapSearchData } from './mapSearchData';

export const SearchPage: React.FC = () => {
	const { isLoading, search, filter, onSubmit } = useAppSelector((state) => state.search);
	const [searchData, setSearchData] = useState<ISearchPageProps['data']>(mapSearchData(search));
	const dispatch = useDispatch();

	useEffect(() => {
		setSearchData(mapSearchData(search));
	}, [search]);

	useEffect(() => {
		if (!onSubmit) {
			return;
		}
		dispatch(
			actions.searchFetchData({
				partialFilter: mapFilterToSearch(filter),
			}),
		);
	}, [onSubmit]);

	const handleChange = (partialFilter: Record<string, any>) => {
		dispatch(actions.searchChangeFilter({ partialFilter }));
	};

	const handleSubmit = () => {
		dispatch(actions.searchSetSubmit({ payload: true }));
	};

	if (isLoading) {
		return <FullscreenLoader />;
	}
	return (
		<>
			<SearchPageComponent data={searchData} filter={filter} onChange={handleChange} onSubmit={handleSubmit} />
		</>
	);
};
