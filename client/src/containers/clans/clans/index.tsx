import React, { useEffect } from 'react';
import { ClansPage } from 'components';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import historyHelper from 'helpers/history.helper';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from '../../notification/logic/models';
import { ROUTES } from 'constants/routes';

const Clans: React.FC = () => {
	const dispatch = useDispatch();

	const clans = useSelector((state: IRootState) => state.clans.data);
	const currentSort = useSelector((state: IRootState) => state.clans.options.sortBy);
	const user = useSelector((state: IRootState) => state.auth.userData.user);

	useEffect(() => {
		dispatch(actions.clearClans());
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
	const handleGoToClan = () => {
		if (user?.clan !== null) {
			historyHelper.push(`${ROUTES.Clan}/${user?.clan?.id}`);
		} else {
			dispatch(
				setNotificationState({
					state: {
						notificationType: NotificationType.Error,
						message: 'You don`t have a clan',
					},
				}),
			);
		}
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
				handleGoToClan={handleGoToClan}
			/>
		</div>
	);
};

export default Clans;
