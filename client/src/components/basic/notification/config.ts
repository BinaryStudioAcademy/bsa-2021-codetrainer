import { SnackbarOrigin } from '@material-ui/core';

export const notificationConfig = {
	position: { vertical: 'top', horizontal: 'right' } as SnackbarOrigin,
	autoHideDuration: 5000,
	transitionDuration: 500,
};

export const alertStyles = {
	maxWidth: '400px',
	display: 'flex',
	alignItems: 'center',
};
