import { IModalProps } from './../modal/index';

export interface IConfirmModalProps extends IModalProps {
	confirm?: string;
	confirmClassName?: string;
	cancel?: string;
	cancelClassName?: string;
	onConfirm: (confirm: boolean) => void;
}
