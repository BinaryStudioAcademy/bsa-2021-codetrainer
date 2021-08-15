import { MemberRoles, MemberStatus } from 'common/enum/app/clans';

declare namespace WebApi.Entities {
	export interface IExample {
		id: string;
		name?: string;
		email?: string;
	}

	export interface IUser {
		id: string;
		name: string;
		surname: string;
		email: string;
		clan?: IClan;
		rank: number;
		honor: number;
		profileClan?: string;
		githubId?: string;
		profileUrl?: string;
	}

	export interface IMember {
		id: string;
		rank: number;
		avatar: string;
		name: string;
		surname: string;
		honour: number;
		profileClan: {
			role: MemberRoles;
			status: MemberStatus;
		};
		createdAt: Date;
	}

	export interface IClan {
		id: string;
		name: string;
		rank: number;
		avatar: string;
		honour: number;
		isPublic: boolean;
		maxMembers: number;
		numberOfMembers: number;
		createdAt: Date;
		members: Array<IMember>;
	}

	export type TClans = Array<IClan>;
}
