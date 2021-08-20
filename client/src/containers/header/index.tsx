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

	// const headerProps: IHeaderProps = useMemo(
	// 	() => ({
	// 		name: `${user?.name} ${user?.surname}`,
	// 		rank: 7,
	// 		notificationCounter: 4,
	// 		mark: 400,
	// 		listItems: [
	// 			{
	// 				id: '1',
	// 				image: menuProfile,
	// 				text: 'View Profile',
	// 				onClick: () => history.push(`/users/${user?.username}`),
	// 			},
	// 			{
	// 				id: '2',
	// 				image: menuSettings,
	// 				text: 'Account Settings',
	// 				onClick: () => history.push(ROUTES.Setting),
	// 			},
	// 			{
	// 				id: '3',
	// 				image: menuChallenge,
	// 				text: 'New Challenge',
	// 				onClick: () => history.push(ROUTES.createTask),
	// 			},
	// 			{
	// 				id: '4',
	// 				image: menuSignout,
	// 				text: 'Sign out',
	// 				onClick: handleLogout,
	// 			},
	// 		],
	// 		avatar: user?.avatar,
	// 	}),
	// 	[history, handleLogout],
	// );
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
