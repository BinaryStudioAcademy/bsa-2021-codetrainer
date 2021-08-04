import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { alertStyles, notificationConfig } from './config';

export type TAlertTypes = 'error' | 'info' | 'success' | 'warning';

export interface INotificationProps {
	handleClose: () => void;
	severity?: TAlertTypes;
	text?: string | React.ReactNode;
	title?: string;
	id?: number;
}

export const Notification: React.FC<INotificationProps> = (props) => {
	const { handleClose, severity, id, text, title } = props;
	const { transitionDuration, autoHideDuration, position } = notificationConfig;

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (id) {
			setIsOpen(true);
			const timeoutId = setTimeout(() => {
				setIsOpen(false);
			}, autoHideDuration);
			const removeFromStoreTimeout = setTimeout(() => {
				handleClose();
			}, autoHideDuration + transitionDuration);
			return () => {
				clearTimeout(timeoutId);
				clearTimeout(removeFromStoreTimeout);
			};
		}
	}, [id]);

	return (
		<div>
			<Snackbar
				open={Boolean(text && isOpen)}
				transitionDuration={transitionDuration}
				// autoHideDuration
				anchorOrigin={position}
				onClose={(ev, reason) => {
					if (reason !== 'clickaway') {
						setIsOpen(false);
					}
				}}
			>
				<Alert
					style={alertStyles}
					severity={severity}
					onClose={() => {
						setIsOpen(false);
						// handleClose();
					}}
				>
					{title && <AlertTitle>{title}</AlertTitle>}
					{text}
				</Alert>
			</Snackbar>
		</div>
	);
};
