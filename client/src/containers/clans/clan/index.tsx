import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { ClanPage } from 'components';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import { ROUTES } from 'constants/routes';

const Clan: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const currentSort = useSelector((state: IRootState) => state.clan.options.sortBY);
	const user = useSelector((state: IRootState) => state.auth.userData.user);
	const clan = useSelector((state: IRootState) => state.clan.data);

	useEffect(() => {
		const clanId = user?.clan?.id;

		if (clanId) {
			dispatch(actions.clearClan());
			dispatch(actions.fetchClan({ id: clanId }));
		} else {
			history.push(ROUTES.Clans);
		}
	}, []);

	const sortByRank = () => {
		dispatch(actions.sortClanMemberByRank());
	};

	const sortByTime = () => {
		dispatch(actions.sortClanMemberByTime());
	};

	const leaveClan = () => {
		dispatch(actions.leaveClan());
		history.push(ROUTES.Clans);
	};

	return (
		clan && (
			<ClanPage
				clan={clan}
				sortByRank={sortByRank}
				sortByTime={sortByTime}
				leaveClan={leaveClan}
				currentSort={currentSort}
			/>
		)
	);
};

export default Clan;
