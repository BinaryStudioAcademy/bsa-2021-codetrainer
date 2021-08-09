import React, { useEffect } from 'react';
import { ClanPage } from 'components';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';

const Clan: React.FC = () => {
	const dispatch = useDispatch();

	const clan = useSelector((state: IRootState) => state.clan.item);

	useEffect(() => {
		dispatch(actions.fetchClan({ id: '5d2f8bb5-0ca5-49d5-b74b-82de834eb016' }));
	}, []);

	const sortByRank = () => {
		dispatch(actions.sortClanMemberByRank());
	};

	const sortByTime = () => {
		dispatch(actions.sortClanMemberByTime());
	};

	return (
		<div>
			<ClanPage clan={clan} sortByRank={sortByRank} sortByTime={sortByTime} />
		</div>
	);
};

export default Clan;
