import { IHeaderProps } from 'components/common/header/index';
import menuProfile from 'assets/icons/header/menu/avatar.svg';
import menuSettings from 'assets/icons/header/menu/settings.svg';
import menuChallenge from 'assets/icons/header/menu/goal.svg';
import menuSignout from 'assets/icons/header/menu/logout.svg';

export const headerProps: IHeaderProps = {
	name: 'Paul',
	rank: 7,
	notificationCounter: 4,
	mark: 400,
	listItems: [
		{
			id: '1',
			image: menuProfile,
			text: 'View Profile',
		},
		{
			id: '2',
			image: menuSettings,
			text: 'Account Settings',
		},
		{
			id: '3',
			image: menuChallenge,
			text: 'New Challenge',
		},
		{
			id: '4',
			image: menuSignout,
			text: 'Sign out',
		},
	],
};
