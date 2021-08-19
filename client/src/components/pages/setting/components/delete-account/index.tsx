import React, { useState } from 'react';
import clsx from 'clsx';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import styles from './delete-account.module.scss';
import { IDeleteAccountProps } from './interfaces';

const DeleteAccount: React.FC<IDeleteAccountProps> = (props) => {
	const [isHideConfirm, setHideConfirm] = useState(true);

	const showModal = () => {
		setHideConfirm(false);
	};

	const hideModal = () => {
		setHideConfirm(true);
	};

	return (
		<div className={styles.deleteContainer}>
			<h4 className={styles.header}>Delete Account</h4>
			<p>
				If you wish you can delete your account. Your authored task, solutions and comments will remain but will
				insted be attached to a generic profile that is not associated with any of your personal information.
				After deleting your account you are free to sign up againg using same email address.
			</p>
			{isHideConfirm ? (
				<div className={styles.buttonWrapper}>
					<Button className={clsx(ButtonClasses.red, styles.submitBtn)} onClick={showModal}>
						Delete Account
					</Button>
				</div>
			) : (
				<div className={styles.confirmWrapper}>
					<span>Are you sure?</span>
					<div className={styles.confirmButtonWrapper}>
						<Button
							className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.submitBtn)}
							onClick={props.onDelete}
						>
							Yes, delete my account
						</Button>
						<Button className={clsx(ButtonClasses.red, styles.submitBtn)} onClick={hideModal}>
							No, I`m kidding
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DeleteAccount;
