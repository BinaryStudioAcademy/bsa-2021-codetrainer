import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { ECloseReasons, INotificationProps } from './types.d';
import { notificationConfig } from './config';
import styles from './notification.module.scss';

export const Notification: React.FC<INotificationProps> = ({ onClose, severity, text, title, id }) => {
	const { autoHideDuration, position, transitionDuration } = notificationConfig;
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (id) {
			setIsActive(true);

			const closeTimeoutId = setTimeout(() => {
				setIsActive(false);
			}, autoHideDuration);

			const removeFromStoreTimeoutId = setTimeout(() => {
				if (onClose) {
					onClose();
				}
			}, autoHideDuration + transitionDuration);

			return () => {
				clearTimeout(closeTimeoutId);
				clearTimeout(removeFromStoreTimeoutId);
			};
		}
	}, [id]);

	const closeHanlder = (event: SyntheticEvent, reason: string) => {
		if (reason !== ECloseReasons.CLICKAWAY) {
			setIsActive(false);
		}
	};

	return (
		<Snackbar
			transitionDuration={transitionDuration}
			open={Boolean(text && isActive)}
			anchorOrigin={position}
			autoHideDuration={autoHideDuration}
			onClose={closeHanlder}
		>
			<Alert className={styles.alert} severity={severity} onClose={() => setIsActive(false)}>
				{title && <AlertTitle>{title}</AlertTitle>}
				{text}
			</Alert>
		</Snackbar>
	);
};
