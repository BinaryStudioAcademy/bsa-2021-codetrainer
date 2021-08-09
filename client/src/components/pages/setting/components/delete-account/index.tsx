import React from 'react';
import clsx from 'clsx';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import styles from './delete-account.module.scss';

const DeleteAccount: React.FC = () => {
	return (
		<div className={styles.deleteContainer}>
			<h4 className={styles.header}>Delete Account</h4>
			<p>
				If you wish you can delete your account. Your authored task, solutions and comments will remain but will
				insted be attached to a generic profile that is not associated with any of your personal information.
				After deleting your account you are free to sign up againg using same email address.
			</p>
			<div className={styles.buttonWrapper}>
				<Button className={clsx(ButtonClasses.red, styles.submitBtn)}>Delete Account</Button>
			</div>
		</div>
	);
};

export default DeleteAccount;
