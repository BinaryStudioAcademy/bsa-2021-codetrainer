import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../typings/root-state';
import { useToasts } from 'react-toast-notifications';
import { NotificationType } from './logic/models';
import * as actions from './logic/actions';

export const NotificationContainer = () => {
	const dispatch = useDispatch();
	const notifications = useSelector((rootState: IRootState) => rootState.notification.notifications);
	const { addToast, toastStack } = useToasts();
	const notification = notifications[notifications.length - 1];
	const [length, setLength] = useState(0);

	useEffect(() => {
		if (notifications.length > length && notification) {
			addToast(notification.message, {
				appearance: notification.notificationType,
				autoDismiss: true,
				onDismiss: (id) => {
					// dispatch(actions.removeNotification({notifications: notifications
					// 		.filter((item) => item.id !== id)}));
					dispatch(
						actions.removeNotification({
							notifications: toastStack.map((toast) => {
								return {
									notificationType: toast.appearance as NotificationType,
									message: toast.content,
								};
							}),
						}),
					);
				},
			});
		}
		setLength(notifications.length);
	}, [notifications]);

	// const [isOpen, setIsOpen] = useState(!!notification);
	//
	// useEffect(() => {
	// 	setIsOpen(!!notification);
	// }, [notification]);
	//
	// const handleClose = (transitionDuration: number) => {
	// 	setIsOpen(false);
	// 	setTimeout(() => {
	// 		dispatch(actions.showNotification({ notification: null }));
	// 	}, transitionDuration);
	// };

	return null;
};
