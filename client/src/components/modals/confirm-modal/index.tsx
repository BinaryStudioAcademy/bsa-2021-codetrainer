import clsx from 'clsx';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import React, { FC } from 'react';
import { Modal } from '../modal';
import { IConfirmModalProps } from './types';
import styles from './confirm-modal.module.scss';

export const ConfirmModal: FC<IConfirmModalProps> = ({
	isOpen,
	setIsOpen,
	confirm = 'Confirm',
	confirmClassName = clsx(ButtonClasses.filled, ButtonClasses.red),
	cancel = 'Cancel',
	cancelClassName = clsx(ButtonClasses.red),
	onConfirm,
	elements,
}) => (
	<Modal
		isOpen={isOpen}
		setIsOpen={setIsOpen}
		elements={{
			...elements,
			footer: (
				<div className={styles.buttons}>
					<Button onClick={() => onConfirm(true)} className={confirmClassName}>{confirm}</Button>
					<Button onClick={() => onConfirm(false)}  className={cancelClassName}>{cancel}</Button>
				</div>
			),
			showCloseButton: false,
		}}
	/>
)

export default ConfirmModal;
