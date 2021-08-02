import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { notificationConfig } from './config';

export type TAlertTypes = 'error' | 'info' | 'success' | 'warning';

export interface INotificationProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	severity: TAlertTypes;
	title?: string;
}

export const Notification: React.FC<INotificationProps> = (props) => {
	const { isOpen, setIsOpen, severity, title } = props;
	const { autoHideDuration, position } = notificationConfig;

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<Snackbar open={isOpen} anchorOrigin={position} autoHideDuration={autoHideDuration} onClose={handleClose}>
				<Alert severity={severity} onClose={handleClose}>
					{title && <AlertTitle>{title}</AlertTitle>}
					This is a success message!
				</Alert>
			</Snackbar>
		</div>
	);
};
