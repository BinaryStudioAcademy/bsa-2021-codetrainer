import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ClanPage } from 'components';
import * as actions from './logic/actions';
import * as userActions from '../../user/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import { ROUTES } from 'constants/routes';
import { deleteClan } from 'services/clans.service';
import { useUserSelector } from 'hooks/useAppSelector';
import { IUser } from 'typings/common/IUser';

const Clan: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const currentSort = useSelector((state: IRootState) => state.clan.options.sortBY);
	const user: IUser | null = useUserSelector();
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
	};
	const handleDeleteClan = async () => {
		await deleteClan();
		dispatch(actions.clearClan());
		dispatch(userActions.setUserClan({ clan: null }));
		history.push(ROUTES.Clans);
	};
	const [modalShown, setModalShown] = useState(false);
	return (
		clan && (
			<ClanPage
				clan={clan}
				sortByRank={sortByRank}
				sortByTime={sortByTime}
				leaveClan={leaveClan}
				currentSort={currentSort}
				user={user}
				handleDeleteClan={handleDeleteClan}
				modalShown={modalShown}
				setModalShown={setModalShown}
			/>
		)
	);
};

export default Clan;
