import { WebApi } from 'typings/webapi';

export enum NotificationTypes {
	Common = 'COMMON',
	RankUp = 'RANK_UP',
	JoinClan = 'JOIN_CLAN',
	HonorUnlocks = 'HONOR_UNLOCKS',
	Follower = 'FOLLOWER',
}

type TCommonNotificationBody = {
	message: string;
};

type TRankUpNotificationBody = {
	rank: number;
};

type THonorUnlocksBody = {
	honor: number;
	unlocks: string;
};

type TJoinClanNotificationBody = {
	clan: WebApi.Entities.IClan;
};

type TFollowerBody = {
	follower: WebApi.Entities.IUser;
};

export type TNotification = { id: string; date: Date; read: boolean } & (
	| {
			type?: NotificationTypes.Common;
			body: TCommonNotificationBody;
	  }
	| {
			type: NotificationTypes.RankUp;
			body: TRankUpNotificationBody;
	  }
	| {
			type: NotificationTypes.JoinClan;
			body: TJoinClanNotificationBody;
	  }
	| {
			type: NotificationTypes.HonorUnlocks;
			body: THonorUnlocksBody;
	  }
	| {
			type: NotificationTypes.Follower;
			body: TFollowerBody;
	  }
);
