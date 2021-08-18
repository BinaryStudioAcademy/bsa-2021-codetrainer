import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Header as HeaderComponent } from 'components';
import * as actions from '../user/logic/actions';
import * as notificationActions from './notifications/logic/actions';
import { useHeaderSelector, useUserSelector } from 'hooks/useAppSelector';
import { IHeaderProps } from 'components/common/header/index';
import menuProfile from 'assets/icons/header/menu/avatar.svg';
import menuSettings from 'assets/icons/header/menu/settings.svg';
import menuChallenge from 'assets/icons/header/menu/goal.svg';
import menuSignout from 'assets/icons/header/menu/logout.svg';
import { ROUTES } from 'constants/routes';
import { useHistory } from 'react-router-dom';

const Header = () => {
	const history = useHistory();
	const user = useUserSelector();
	const dispatch = useDispatch();
	const handleLogout = useCallback(() => {
		dispatch(actions.logoutUser());
	}, [user]);
	const { notifications: unorderedNotifications } = useHeaderSelector();

	const headerProps: IHeaderProps = useMemo(
		() => ({
			name: `${user?.name} ${user?.surname}`,
			rank: 7,
			mark: 400,
			listItems: [
				{
					id: '1',
					image: menuProfile,
					text: 'View Profile',
					onClick: () => history.push(ROUTES.UserProfile),
				},
				{
					id: '2',
					image: menuSettings,
					text: 'Account Settings',
					onClick: () => history.push(ROUTES.Setting),
				},
				{
					id: '3',
					image: menuChallenge,
					text: 'New Challenge',
					onClick: () => history.push(ROUTES.createTask),
				},
				{
					id: '4',
					image: menuSignout,
					text: 'Sign out',
					onClick: handleLogout,
				},
			],
			notifications: Array.from(unorderedNotifications.values()).sort((a, b) => +b.date - +a.date),
			onReadNotification(id: string) {
				dispatch(notificationActions.readNotification({ id }));
			},
		}),
		[history, handleLogout, unorderedNotifications],
	);

	return <HeaderComponent {...headerProps} />;
};

export default Header;
