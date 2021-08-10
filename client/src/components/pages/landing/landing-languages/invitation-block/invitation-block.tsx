import { Button } from 'components/basic';
import React from 'react';
import styles from './invitation-block.module.scss';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import historyHelper from 'helpers/history.helper';
import { ROUTES } from 'constants/routes';

interface ILandingLanguagesProps {}
export const InvitationBlock = (props: ILandingLanguagesProps) => {
	return (
		<div className={styles.invitationBlock}>
			<h1>Achieve mastery through challenge</h1>
			<h4>Improve your skills by training with others on real code challenges</h4>
			<Button
				className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.button)}
				onClick={() => {
					historyHelper.push(ROUTES.SignUp);
				}}
			>
				Sign up
			</Button>
		</div>
	);
};
