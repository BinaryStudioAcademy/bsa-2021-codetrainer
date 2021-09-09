import React, { useEffect } from 'react';
import { LeaderBoardPage } from 'components';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';

const LeaderBoard: React.FC = () => {
	const dispatch = useDispatch();

	const { data: users, isLoading, count } = useSelector((state: IRootState) => state.leaderBoard);
	const { nameQuery, page, itemsPerPage } = useSelector((state: IRootState) => state.leaderBoard.options);

	useEffect(() => {
		return () => {
			dispatch(actions.clearAllLeadersData());
		};
	}, []);

	useEffect(() => {
		dispatch(actions.clearData());
		dispatch(actions.fetchUsers());
	}, [nameQuery]);

	useEffect(() => {
		if (page) {
			dispatch(actions.fetchUsers());
		}
	}, [page]);

	// useEffect(() => {
	// 	dispatch(actions.clearData());
	// 	dispatch(actions.fetchUsers());
	// }, [nameQuery, page, itemsPerPage]);

	const setNameQuery = (nameQuery: string) => {
		dispatch(actions.setNameQuery({ nameQuery }));
	};

	const setPage = (page: number) => {
		dispatch(actions.setPage({ page }));
	};

	return (
		<div>
			<LeaderBoardPage
				users={users}
				page={page}
				setPage={setPage}
				itemsPerPage={itemsPerPage}
				count={count}
				nameQuery={nameQuery}
				setNameQuery={setNameQuery}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default LeaderBoard;
