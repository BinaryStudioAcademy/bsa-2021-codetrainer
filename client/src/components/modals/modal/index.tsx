import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ReactModal from 'react-modal';
import { modalStyles } from './config';
import { IModalProps } from './types';
import styles from './modal.module.scss';

export const Modal: React.FC<IModalProps> = ({
	elements: { title, body, footer, showCloseButton },
	isOpen,
	modalProps,
	setIsOpen,
}) => {
	ReactModal.setAppElement('#root');

	return (
		<ReactModal shouldFocusAfterRender={true} isOpen={isOpen} style={modalStyles} {...modalProps}>
			<div className={styles.modalContent}>
				<div className={styles.header}>
					<h3 className={styles.title}>{title}</h3>
					{showCloseButton && (
						<CloseIcon className={styles.closeIcon} size={25} onClick={() => setIsOpen(false)} />
					)}
				</div>
				<div className={styles.body}>{body}</div>
				{footer && <div className={styles.footer}>{footer}</div>}
			</div>
		</ReactModal>
	);
};
