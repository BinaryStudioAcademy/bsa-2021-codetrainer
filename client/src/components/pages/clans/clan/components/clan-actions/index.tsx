import React, { FC } from 'react';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { IClanActionsProps } from './types';
import styles from './clan-actions.module.scss';
import clsx from 'clsx';

const ClanActions: FC<IClanActionsProps> = ({
	visitor,
	handleJoin,
	handleLeave,
	handleInvitation,
	handleEdit,
	handleDelete,
}) => (
	<div className={styles.clanActions}>
		{visitor.isMember ? (
			<Button className={clsx(ButtonClasses.blue, ButtonClasses.filled)} onClick={handleInvitation}>
				Invite a friend
			</Button>
		) : (
			<Button className={ButtonClasses.blue} onClick={handleJoin}>
				Join
			</Button>
		)}
		{visitor.isAdmin && (
			<>
				<Button className={clsx(ButtonClasses.red, ButtonClasses.filled)} onClick={handleEdit}>
					Edit
				</Button>
				<Button className={clsx(ButtonClasses.red, ButtonClasses.filled)} onClick={handleDelete}>
					Delete
				</Button>
			</>
		)}
		{visitor.isMember && (
			<Button className={clsx(ButtonClasses.red, styles.leave)} onClick={handleLeave}>
				Leave
			</Button>
		)}
	</div>
);

export default ClanActions;
