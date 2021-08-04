import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { alertStyles, notificationConfig } from './config';

export type TAlertTypes = 'error' | 'info' | 'success' | 'warning';

export interface INotificationProps {
	isOpen: boolean;
	handleClose: (transitionDuration: number) => void;
	severity?: TAlertTypes;
	text?: string | React.ReactNode;
	title?: string;
}

export const Notification: React.FC<INotificationProps> = (props) => {
	const { isOpen, handleClose, severity, text, title } = props;
	const { autoHideDuration, position, transitionDuration } = notificationConfig;

	const onClose = () => {
		handleClose(transitionDuration);
	};

	return (
		<div>
			<Snackbar
				transitionDuration={transitionDuration}
				open={isOpen}
				anchorOrigin={position}
				autoHideDuration={autoHideDuration}
				onClose={onClose}
			>
				<Alert style={alertStyles} severity={severity} onClose={onClose}>
					{title && <AlertTitle>{title}</AlertTitle>}
					{text}
				</Alert>
			</Snackbar>
		</div>
	);
};
