import { WebApi } from 'typings/webapi';

export enum NotificationTypes {
	Common = 'COMMON',
	RankUp = 'RANK_UP',
	JoinClan = 'JOIN_CLAN',
	HonorUnlocks = 'HONOR_UNLOCKS',
	Follower = 'FOLLOWER',
	InviteToClan = 'INVITE_CLAN',
	LeaveClan = 'LEAVE_CLAN',
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

type TInviteToClanBody = {
	clan: WebApi.Entities.IClan;
	inviter: WebApi.Entities.IUser;
};

type TLeaveClanBody = {
	clan: WebApi.Entities.IClan;
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
	| {
			type: NotificationTypes.InviteToClan;
			body: TInviteToClanBody;
	  }
	| {
			type: NotificationTypes.LeaveClan;
			body: TLeaveClanBody;
	  }
);
