import React, { useState } from 'react';
import { H3, Icon } from '@blueprintjs/core';
import ReactModal from 'react-modal';
import styles from './modal.module.scss';

interface ModalProps {
	isOpen: boolean;
	elements: {
		title: string;
		body: string | React.ReactNode;
		footer: React.ReactNode | null;
	};
}

const Modal: React.FC<ModalProps> = (props) => {
	const { title, body, footer } = props.elements;
	const [isOpen, setIsOpen] = useState(props.isOpen);

	ReactModal.setAppElement('#root');

	return (
		<ReactModal shouldFocusAfterRender={true} isOpen={isOpen} style={modalStyles}>
			<div className={styles.modalContent}>
				<div className={styles.header}>
					<H3 className={styles.title}>{title}</H3>
					<Icon icon="cross" className={styles.closeIcon} size={25} onClick={() => setIsOpen(false)} />
				</div>
				<div className={styles.body}>{body}</div>
				{footer ? <div className={styles.footer}>{footer}</div> : null}
			</div>
		</ReactModal>
	);
};

export default Modal;

const modalStyles = {
	content: {
		maxWidth: '30%',
		maxHeight: '50%',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: '0',
		contentBoxSize: true,
	},
};
