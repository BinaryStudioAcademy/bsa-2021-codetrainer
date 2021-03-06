import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as notificationsActions from './notifications/logic/actions';
import { Header as HeaderComponent } from 'components';
import { useAppSelector, useHeaderSelector } from 'hooks/useAppSelector';
import { IHeaderProps } from 'components/common/header/index';
import { getListItems } from './items-dropdown';
import { collection, getFirestore, onSnapshot, query, where } from '@firebase/firestore';
import { app } from 'containers/app/app';

const Header: React.FC = () => {
	const dispatch = useDispatch();
	const { user } = useAppSelector((state) => state.auth.userData);

	const firestore = getFirestore(app);
	const q = query(collection(firestore, 'notifications'), where('userId', '==', user?.id ?? ''));
	const { notifications: unorderedNotifications } = useHeaderSelector();
	useEffect(() => {
		dispatch(notificationsActions.fetchNotification());
		onSnapshot(q, (querySnapshot) => {
			dispatch(notificationsActions.fetchNotification());
		});
	}, []);

	const headerProps: IHeaderProps = {
		name: `${user?.name} ${user?.surname}`,
		rank: user?.rank || 9,
		notifications: Array.from(unorderedNotifications?.values()).sort((a, b) => +b.date - +a.date),
		honor: user?.honor ?? 0,
		listItems: getListItems(),
		onReadNotification: (id) => dispatch(notificationsActions.readNotification({ id })),
		avatar: user?.avatar,
	};
	return <HeaderComponent {...headerProps} />;
};

export default Header;
