import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { alertStyles, notificationConfig } from './config';

export type TAlertTypes = 'error' | 'info' | 'success' | 'warning';

export interface INotificationProps {
	handleClose: () => void;
	severity?: TAlertTypes;
	text?: string | React.ReactNode;
	title?: string;
	id?: string;
}

export const Notification = ({ handleClose, severity, text, title, id }: INotificationProps) => {
	const { autoHideDuration, position, transitionDuration } = notificationConfig;

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (id) {
			setIsOpen(true);

			const closeTimeoutId = setTimeout(() => {
				setIsOpen(false);
			}, autoHideDuration);

			const removeFromStoreTimeoutId = setTimeout(() => {
				handleClose();
			}, autoHideDuration + transitionDuration);

			return () => {
				clearTimeout(closeTimeoutId);
				clearTimeout(removeFromStoreTimeoutId);
			};
		}
	}, [id]);

	const onClose = (event: SyntheticEvent, reason: string) => {
		if (reason !== 'clickaway') {
			setIsOpen(false);
		}
	};

	return (
		<div>
			<Snackbar
				transitionDuration={transitionDuration}
				open={!!(text && isOpen)}
				anchorOrigin={position}
				autoHideDuration={autoHideDuration}
				onClose={onClose}
			>
				<Alert style={alertStyles} severity={severity} onClose={() => setIsOpen(false)}>
					{title && <AlertTitle>{title}</AlertTitle>}
					{text}
				</Alert>
			</Snackbar>
		</div>
	);
};
