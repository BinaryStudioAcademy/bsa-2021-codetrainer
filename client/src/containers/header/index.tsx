import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as notificationsActions from './notifications/logic/actions';
import { Header as HeaderComponent } from 'components';
import { useAppSelector, useHeaderSelector } from 'hooks/useAppSelector';
import { IHeaderProps } from 'components/common/header/index';
import { getListItems } from './items-dropdown';

const Header: React.FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(notificationsActions.fetchNotification());
	}, []);
	const { user } = useAppSelector((state) => state.auth.userData);
	const { notifications: unorderedNotifications } = useHeaderSelector();
	console.log(unorderedNotifications.values());

	const headerProps: IHeaderProps = {
		name: `${user?.name} ${user?.surname}`,
		rank: user?.rank || 0,
		notifications: Array.from(unorderedNotifications?.values()).sort((a, b) => +b.date - +a.date),
		honor: user?.honor || 0,
		listItems: getListItems(),
		onReadNotification: (id) => dispatch(notificationsActions.readNotification({ id })),
		avatar: user?.avatar,
	};
	return <HeaderComponent {...headerProps} />;
};

export default Header;
