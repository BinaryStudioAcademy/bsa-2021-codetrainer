import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { notificationConfig } from './config';

export type TAlertTypes = 'error' | 'info' | 'success' | 'warning';

export interface INotificationProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	severity: TAlertTypes;
	text: string | React.ReactNode;
	title?: string;
}

export const Notification: React.FC<INotificationProps> = (props) => {
	const { isOpen, setIsOpen, severity, text, title } = props;
	const { autoHideDuration, position } = notificationConfig;

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<Snackbar open={isOpen} anchorOrigin={position} autoHideDuration={autoHideDuration} onClose={handleClose}>
				<Alert severity={severity} onClose={handleClose}>
					{title && <AlertTitle>{title}</AlertTitle>}
					{text}
				</Alert>
			</Snackbar>
		</div>
	);
};
