import clsx from 'clsx';
import { Avatar, Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import React from 'react';
import styles from './community-member.module.scss';

interface ICommunityMemberProps {
	user: {
		avatar: string;
		name: string;
		surname: string;
		username: string;
	};
	fromUser: any;
	handleInviteClick: (fromUser: any, toUser: any) => void;
}

export const CommunityMember = ({ user, handleInviteClick, fromUser }: ICommunityMemberProps) => {
	const { avatar, name, surname, username } = user;
	return (
		<div className={styles.communityMember}>
			<Avatar size={20} avatar={avatar ? avatar : undefined} />
			<p>{name + ' ' + surname}</p>
			<p>{username}</p>
			<Button
				className={clsx(ButtonClasses.red, ButtonClasses.filled)}
				onClick={() => {
					handleInviteClick(fromUser, user);
				}}
			>
				{' '}
				Invite{' '}
			</Button>
		</div>
	);
};
