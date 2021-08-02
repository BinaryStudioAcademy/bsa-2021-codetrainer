import React from 'react';
import { H3, Icon } from '@blueprintjs/core';
import ReactModal from 'react-modal';
import styles from './modal.module.scss';
import { modalStyles } from './config';

interface IModalProps {
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
		<ReactModal shouldFocusAfterRender={true} isOpen={props.isOpen} style={modalStyles} {...props.modalProps}>
			<div className={styles.modalContent}>
				<div className={styles.header}>
					<H3 className={styles.title}>{title}</H3>
					{showCloseButton && (
						<Icon
							icon="cross"
							className={styles.closeIcon}
							size={25}
							onClick={() => props.setIsOpen(false)}
						/>
					)}
				</div>
				<div className={styles.body}>{body}</div>
				{footer && <div className={styles.footer}>{footer}</div>}
			</div>
		</ReactModal>
	);
};
