import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';
import { Notification } from '../../components';
import * as actions from './logic/actions';

export const NotificationContainer = () => {
	const dispatch = useDispatch();
	const notification = useSelector((rootState: IRootState) => rootState.notification.state);

	const handleClose = () => {
		dispatch(actions.setNotificationState({ state: null }));
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
