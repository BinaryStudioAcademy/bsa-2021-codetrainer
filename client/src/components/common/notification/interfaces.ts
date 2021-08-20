import { ReactNode } from 'react';

export interface INotificationProps {
	children: ReactNode;
	icon?: ReactNode;
	link?: string;
	date: Date;
	read: boolean;
	onRead?: () => void;
}
