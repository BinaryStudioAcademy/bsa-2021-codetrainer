import React, { useEffect } from 'react';
import { ClansPage } from 'components';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import historyHelper from 'helpers/history.helper';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from '../../notification/logic/models';
import { ROUTES } from 'constants/routes';
import { ClansOrderByOptions } from './logic/state';
import { Order } from 'helpers/table-helper';

const Clans: React.FC = () => {
	const dispatch = useDispatch();

	const clans = useSelector((state: IRootState) => state.clans.data);
	const { orderBy, order, nameQuery } = useSelector((state: IRootState) => state.clans.options);
	const user = useSelector((state: IRootState) => state.auth.userData.user);

	useEffect(() => {
		dispatch(actions.clearClans());
		dispatch(actions.fetchClans());
	}, []);

	useEffect(() => {
		dispatch(actions.fetchClans());
	}, [orderBy, order, nameQuery]);

	const setOrderBy = (orderBy: ClansOrderByOptions) => {
		dispatch(actions.setOrderBy({ orderBy }));
	};

	const setOrder = (order: Order) => {
		dispatch(actions.setOrder({ order }));
	};

	const setNameQuery = (nameQuery: string) => {
		dispatch(actions.setNameQuery({ nameQuery }));
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
				setOrderBy={setOrderBy}
				setOrder={setOrder}
				setNameQuery={setNameQuery}
				currentSort={order}
				joinClan={joinClan}
				leaveClan={leaveClan}
				handleGoToClan={handleGoToClan}
			/>
		</div>
	);
};

export default Clans;
