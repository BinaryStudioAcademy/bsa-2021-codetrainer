import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';
import { Notification } from '../../components';
import * as actions from './logic/actions';

export const NotificationContainer = () => {
	const dispatch = useDispatch();
	const { showNotification, notificationType, message, title } = useSelector(
		(rootState: IRootState) => rootState.notification,
	);
	const setIsOpen = (isOpen: boolean) => dispatch(actions.showNotification({ showNotification: isOpen }));

	return (
		<Notification
			isOpen={showNotification}
			setIsOpen={setIsOpen}
			severity={notificationType}
			text={message}
			title={title}
		/>
	);
};
