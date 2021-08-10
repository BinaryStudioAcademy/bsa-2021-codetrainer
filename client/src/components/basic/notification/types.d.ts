import { ReactNode } from 'react';

export type TAlertTypes = 'error' | 'info' | 'success' | 'warning';

export interface INotificationProps {
	onClose?: () => void;
	severity?: TAlertTypes;
	text: string | ReactNode;
	title?: string;
	id?: string;
}

export enum ECloseReasons {
	TIMEOUT = 'timeout',
	CLICKAWAY = 'clickaway',
}
