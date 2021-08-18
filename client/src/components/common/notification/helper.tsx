import React from 'react';
import { ROUTES } from 'constants/routes';
import { NotificationTypes, TNotification } from 'typings/common/INotification';
import { Rank } from 'components/basic';
import { INotificationProps } from './';

export function mapNotificationToProps(notification: TNotification): INotificationProps {
	const userLink = ROUTES.UserProfile + '/id';
	const { date, read } = notification;

	switch (notification.type) {
		case NotificationTypes.RankUp: {
			const { rank } = notification.body;
			return {
				children: `You ranked up!`,
				icon: <Rank rank={rank} />,
				link: userLink,
				date,
				read,
			};
		}
		case NotificationTypes.HonorUnlocks: {
			const { honor, unlocks } = notification.body;
			return {
				children: `${honor}+ honor: ${unlocks}`,
				icon: <Rank honor={honor} />,
				link: userLink,
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
			const { id, username, profileUrl } = notification.body.follower;
			return {
				children: `${username} follows you!`,
				icon: <img src={profileUrl} width={50} height={50} />,
				link: ROUTES.UserProfile + `/${id}`,
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
