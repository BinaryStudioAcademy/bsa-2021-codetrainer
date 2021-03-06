import clsx from 'clsx';
import { Avatar, Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import React from 'react';
import { useState } from 'react';
import { WebApi } from 'typings/webapi';
import styles from './community-member.module.scss';

interface ICommunityMemberProps {
	user: WebApi.Entities.IUser;
	fromUser: any;
	handleInviteClick: (userId: WebApi.Entities.IUser) => void;
}

export const CommunityMember = ({ user, handleInviteClick, fromUser }: ICommunityMemberProps) => {
	const { avatar, name, surname, username } = user;
	const [invited, setInvited] = useState(false);
	return (
		<div className={styles.communityMember}>
			<Avatar size={40} avatar={avatar} />
			<p>{name + ' ' + surname}</p>
			<p>{username ? username : 'No username'}</p>
			{!invited ? (
				<Button
					className={clsx(ButtonClasses.red, ButtonClasses.filled)}
					onClick={() => {
						handleInviteClick(user);
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
