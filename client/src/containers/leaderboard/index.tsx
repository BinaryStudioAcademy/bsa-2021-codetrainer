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
		dispatch(actions.clearData());
		dispatch(actions.fetchUsers());
	}, [nameQuery, page, itemsPerPage]);

	const setNameQuery = (nameQuery: string) => {
		dispatch(actions.setNameQuery({ nameQuery }));
	};

	const setPage = (page: number) => {
		dispatch(actions.setPage({ page }));
	};

	const setItemsPerPage = (itemsPerPage: number) => {
		dispatch(actions.setItemsPerPage({ itemsPerPage }));
	};


	return (
		<div>
			<LeaderBoardPage
				users={users}
				page={page}
				setPage={setPage}
				itemsPerPage={itemsPerPage}
				setItemsPerPage={setItemsPerPage}
				count={count}
				nameQuery={nameQuery}
				setNameQuery={setNameQuery}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default LeaderBoard;
