import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';
import { Notification } from '../../components';
import * as actions from './logic/actions';

export const NotificationContainer = () => {
	const dispatch = useDispatch();
	const notification = useSelector((rootState: IRootState) => rootState.notification.notification);

	const [isOpen, setIsOpen] = useState(!!notification);

	useEffect(() => {
		setIsOpen(!!notification);
	}, [notification]);

	const handleClose = (transitionDuration: number) => {
		setIsOpen(false);
		setTimeout(() => {
			dispatch(actions.showNotification({ notification: null }));
		}, transitionDuration);
	};

	return (
		<Notification
			isOpen={isOpen}
			handleClose={handleClose}
			severity={notification?.notificationType}
			text={notification?.message}
			title={notification?.title}
		/>
	);
};
