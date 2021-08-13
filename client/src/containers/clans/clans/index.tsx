import React, { useEffect } from 'react';
import { ClansPage } from 'components';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';

const Clans: React.FC = () => {
	const dispatch = useDispatch();

	const clans = useSelector((state: IRootState) => state.clans.data);
	const currentSort = useSelector((state: IRootState) => state.clans.options.sortBy);
	const user = useSelector((state: IRootState) => state.auth.userData.user);

	useEffect(() => {
		dispatch(actions.fetchClans());
	}, []);

	const sortByRank = () => {
		dispatch(actions.sortClansByRank());
	};

	const sortByTime = () => {
		dispatch(actions.sortClansByTime());
	};

	const sortBySize = () => {
		dispatch(actions.sortClansBySize());
	};

	const joinClan = (id: string) => {
		dispatch(actions.joinClan({ id }));
	};

	const leaveClan = (id: string) => {
		dispatch(actions.leaveClan({ id }));
	};

	return (
		<div>
			<ClansPage
				clans={clans}
				user={user}
				sortByRank={sortByRank}
				sortByTime={sortByTime}
				sortBySize={sortBySize}
				currentSort={currentSort}
				joinClan={joinClan}
				leaveClan={leaveClan}
			/>
		</div>
	);
};

export default Clans;
