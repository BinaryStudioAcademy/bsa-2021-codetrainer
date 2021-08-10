export interface IModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	elements: {
		title: string;
		showCloseButton?: boolean;
		body: string | React.ReactNode;
		footer?: React.ReactNode;
	};
	modalProps?: Partial<ReactModal.Props>;
}
