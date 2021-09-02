import moment from 'moment';
import { TNotification, NotificationTypes } from 'typings/common/INotification';
import { WebApi } from 'typings/webapi';

export const notificationMocks: TNotification[] = [
	{
		id: '1',
		date: moment().subtract(2, 'hours').subtract(26, 'seconds').toDate(),
		body: {
			message: 'Notification example...',
		},
		read: true,
	},
	{
		id: '2',
		date: moment().subtract(8, 'minutes').subtract(12, 'seconds').toDate(),
		type: NotificationTypes.RankUp,
		body: {
			rank: 4,
		},
		read: true,
	},
	{
		id: '3',
		date: moment().subtract(6, 'minutes').subtract(46, 'seconds').toDate(),
		type: NotificationTypes.HonorUnlocks,
		body: {
			honor: 50,
			unlocks: 'You unlock clans! Create or join to one!',
		},
		read: true,
	},
	{
		id: '4',
		date: moment().subtract(3, 'minutes').subtract(36, 'seconds').toDate(),
		type: NotificationTypes.JoinClan,
		body: {
			clan: {
				id: '1',
				name: 'Religion of wall-nut',
				avatar: 'https://i.pinimg.com/originals/86/4e/fd/864efdc14f6aecbc01b4c98928fcc629.png',
			} as WebApi.Entities.IClan,
		},
		read: false,
	},
	{
		id: '5',
		date: moment().subtract(13, 'seconds').toDate(),
		type: NotificationTypes.RankUp,
		body: {
			rank: 3,
		},
		read: false,
	},
	{
		id: '6',
		date: new Date(),
		type: NotificationTypes.Follower,
		body: {
			follower: {
				id: '1',
				username: 'Creeper',
				avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Userbox_creeper.svg',
			} as WebApi.Entities.IUser,
		},
		read: false,
	},
];
