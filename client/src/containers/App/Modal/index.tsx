import React, { useState } from 'react';
import { H3, Icon } from '@blueprintjs/core';
import ReactModal from 'react-modal';
import './modal.scss';

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
		<ReactModal shouldFocusAfterRender={true} isOpen={isOpen} style={styles}>
			<div className="modal-content">
				<div className="modal-header">
					<H3 className="title">{title}</H3>
					<Icon icon="cross" className="close-icon" size={25} onClick={() => setIsOpen(false)} />
				</div>
				<div className="modal-body">{body}</div>
				{footer ? <div className="modal-footer">{footer}</div> : null}
			</div>
		</ReactModal>
	);
};

export default Modal;

const styles = {
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
