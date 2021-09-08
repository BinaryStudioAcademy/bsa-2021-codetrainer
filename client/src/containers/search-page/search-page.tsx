import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FullscreenLoader, SearchPage as SearchPageComponent } from 'components';
import { ISearchPageProps } from 'components/pages/search-page';
import { useAppSelector } from 'hooks/useAppSelector';
import * as actions from './logic/actions';
import { mapFilterToSearch, mapSearchData } from './mapSearchData';

export const SearchPage: React.FC = () => {
	const { isLoading, search, filter, onSubmit, changePage } = useAppSelector((state) => state.search);
	const [searchData, setSearchData] = useState<ISearchPageProps['data']>(mapSearchData(search));
	const [filterForChangePage, setFilterForChangePage] = useState<ISearchPageProps['filter']>(filter);
	const dispatch = useDispatch();

	useEffect(() => {
		setFilterForChangePage(filter);
		dispatch(
			actions.searchFetchData({
				partialFilter: mapFilterToSearch(filter),
			}),
		);
	}, []);

	useEffect(() => {
		setSearchData(mapSearchData(search));
	}, [search]);

	useEffect(() => {
		if (!onSubmit) {
			return;
		}
		setFilterForChangePage(filter);
		dispatch(
			actions.searchFetchData({
				partialFilter: mapFilterToSearch(filter),
			}),
		);
	}, [onSubmit]);

	useEffect(() => {
		if (!changePage) {
			return;
		}
		dispatch(
			actions.searchFetchNextPage({
				partialFilter: mapFilterToSearch({ ...filterForChangePage, page: filter.page }),
			}),
		);
	}, [changePage]);

	const handleChange = (partialFilter: Record<string, any>) => {
		dispatch(actions.searchChangeFilter({ partialFilter }));
	};

	const handleChangePage = (isChange: boolean) => {
		if (!isChange) {
			return;
		}
		dispatch(actions.searchChangePage());
	};

	const handleSubmit = () => {
		dispatch(actions.searchOnSubmit());
	};

	if (isLoading) {
		return <FullscreenLoader />;
	}

	const handleUpdateTaskFavoriteStatus = (id: string) => {
		console.log('TASK to update:', id);
	};
	return (
		<>
			<SearchPageComponent
				data={searchData}
				filter={filter}
				onChange={handleChange}
				onSubmit={handleSubmit}
				onChangePage={handleChangePage}
				updateTaskFavoriteStatus={handleUpdateTaskFavoriteStatus}
			/>
		</>
	);
};
