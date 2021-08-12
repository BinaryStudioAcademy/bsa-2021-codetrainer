import React from 'react';
import { useDispatch } from 'react-redux';
import { Notification } from '../../components';
import * as actions from './logic/actions';
import { useAppSelector } from 'hooks/useAppSelector';

export const NotificationContainer = () => {
	const dispatch = useDispatch();
	const notification = useAppSelector((rootState) => rootState.notification.state);

	const handleClose = () => {
		dispatch(actions.setNotificationState(null));
	};

	return (
		<Notification
			handleClose={handleClose}
			severity={notification?.notificationType}
			text={notification?.message}
			title={notification?.title}
			id={notification?.id}
		/>
	);
};
