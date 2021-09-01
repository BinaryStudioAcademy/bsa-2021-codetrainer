import React from 'react';
import { Modal, Button } from 'components';
import { ButtonClasses } from 'components/basic/button';

import styles from './styles.module.scss';

interface IResetModal {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onClick: (click: boolean) => void;
}

export const ResetModal: React.FC<IResetModal> = ({ isOpen, setIsOpen, onClick }) => {
	const handleClick = (reset: boolean) => {
		setIsOpen(false);
		onClick(reset);
	};

	const footer = (
		<div className={styles.modalResetButtons}>
			<Button className={ButtonClasses.blue} onClick={() => handleClick(false)}>
				No
			</Button>
			<Button className={ButtonClasses.blue} onClick={() => handleClick(true)}>
				Yes
			</Button>
		</div>
	);
	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			elements={{
				title: 'Reset solution data!',
				body: 'This will replace your solution and example test cases with the default setup. Are you sure?',
				showCloseButton: true,
				footer,
			}}
		/>
	);
};
