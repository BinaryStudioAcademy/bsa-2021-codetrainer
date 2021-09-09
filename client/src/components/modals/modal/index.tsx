import React from 'react';
import ReactModal from 'react-modal';
import { modalStyles } from './config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import styles from './modal.module.scss';

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

export const Modal: React.FC<IModalProps> = (props) => {
	const { title, body, footer, showCloseButton } = props.elements;

	ReactModal.setAppElement('#root');

	return (
		<ReactModal
			shouldFocusAfterRender={true}
			overlayClassName={styles.overlay}
			isOpen={props.isOpen}
			style={modalStyles}
			{...props.modalProps}
		>
			<div className={styles.modalContent}>
				<div className={styles.header}>
					<h3 className={styles.title}>{title}</h3>
					{showCloseButton && (
						<FontAwesomeIcon
							className={styles.closeIcon}
							onClick={() => props.setIsOpen(false)}
							icon={faTimesCircle}
							size="sm"
						/>
					)}
				</div>
				<div className={styles.body}>{body}</div>
				{footer && <div className={styles.footer}>{footer}</div>}
			</div>
		</ReactModal>
	);
};
