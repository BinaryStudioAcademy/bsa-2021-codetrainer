import React, { useEffect } from 'react';
import { ClansPage } from 'components';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';

const Clans: React.FC = () => {
	const dispatch = useDispatch();

	const clans = useSelector((state: IRootState) => state.clans.items);

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

	return (
		<div>
			<ClansPage clans={clans} sortByRank={sortByRank} sortByTime={sortByTime} sortBySize={sortBySize} />
		</div>
	);
};

export default Clans;
