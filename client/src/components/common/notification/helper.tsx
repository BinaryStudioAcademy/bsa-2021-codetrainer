import React from 'react';
import { ROUTES } from 'constants/routes';
import { NotificationTypes, TNotification } from 'typings/common/INotification';
import { Avatar, Rank } from 'components/basic';
import { INotificationProps } from './';

export function mapNotificationToProps(notification: TNotification): INotificationProps {
	const { date, read } = notification;

	switch (notification.type) {
		case NotificationTypes.RankUp: {
			const { rank } = notification.body;
			return {
				children: `You ranked up!`,
				icon: <Rank rank={rank} />,
				date,
				read,
			};
		}
		case NotificationTypes.HonorUnlocks: {
			const { honor, unlocks } = notification.body;
			return {
				children: `${honor}+ honor: ${unlocks}`,
				icon: <Rank honor={honor} />,
				date,
				read,
			};
		}
		case NotificationTypes.JoinClan: {
			const { id, name, avatar } = notification.body.clan;
			return {
				children: `You joined to ${name}!`,
				icon: <img src={avatar} width={50} height={50} />,
				link: ROUTES.Clan + `/${id}`,
				date,
				read,
			};
		}
		case NotificationTypes.Follower: {
			const { username, avatar } = notification.body.follower;
			return {
				children: `${username} follows you!`,
				icon: <Avatar avatar={avatar} size={50} />,
				link: ROUTES.Users + `/${username}`,
				date,
				read,
			};
		}
		default: {
			return {
				children: notification.body.message,
				date,
				read,
			};
		}
	}
}
