import { MemberRoles, MemberStatus } from 'common/enum/app/clans';

declare namespace WebApi.Entities {
	export interface IExample {
		id: string;
		name?: string;
		email?: string;
	}

	export interface IUser {
		id: string;
		username: string;
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
	interface ITask {
		id: string | null;
		name?: string;
		description?: string;
		// tags?: string[],
		rank?: number;
	}

	interface ITasks {
		tasks: ITask[];
	}

	export interface IMember {
		id: string;
		rank: number;
		avatar: string;
		name: string;
		surname: string;
		honor: number;
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
		honor: number;
		isPublic: boolean;
		maxMembers: number;
		numberOfMembers: number;
		createdAt: Date;
		members: Array<IMember>;
	}

	export type TClans = Array<IClan>;

	export interface ITask {
		id: string | null;
	}
}
