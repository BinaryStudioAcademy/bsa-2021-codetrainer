import clsx from 'clsx';
import { Avatar, Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import React from 'react';
import { useState } from 'react';
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
	const [invited, setInvited] = useState(false);
	return (
		<div className={styles.communityMember}>
			<Avatar size={20} avatar={avatar ? avatar : undefined} />
			<p>{name + ' ' + surname}</p>
			<p>{username ? username : 'No username'}</p>
			{!invited ? (
				<Button
					className={clsx(ButtonClasses.red, ButtonClasses.filled)}
					onClick={() => {
						handleInviteClick(fromUser, user);
						setInvited(true);
					}}
				>
					{' '}
					Invite{' '}
				</Button>
			) : (
				<Button className={clsx(ButtonClasses.red)} disabled>
					Invited
				</Button>
			)}
		</div>
	);
};
