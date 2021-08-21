import React from 'react';
import { useDispatch } from 'react-redux';
import * as notificationsActions from './notifications/logic/actions';
import { Header as HeaderComponent } from 'components';
import { useAppSelector, useHeaderSelector } from 'hooks/useAppSelector';
import { IHeaderProps } from 'components/common/header/index';
import { getListItems } from './items-dropdown';

const Header: React.FC = () => {
	const dispatch = useDispatch();
	const { user } = useAppSelector((state) => state.auth.userData);
	const { notifications: unorderedNotifications } = useHeaderSelector();

	const headerProps: IHeaderProps = {
		name: `${user?.name} ${user?.surname}`,
		rank: 7,
		notifications: Array.from(unorderedNotifications.values()).sort((a, b) => +b.date - +a.date),
		mark: 400,
		listItems: getListItems(),
		onReadNotification: (id) => dispatch(notificationsActions.readNotification({ id })),
	};

	return <HeaderComponent {...headerProps} />;
};

export default Header;
