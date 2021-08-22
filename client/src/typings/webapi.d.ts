import { MemberRoles, MemberStatus } from 'common/enum/app/clans';
import { TaskStatus } from './common/task';
import { SolutionStatus } from './common/solution';

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

	export interface ITask {
		id: string | null;
		name?: string;
		description?: string;
		// tags?: string[],
		rank?: number;
		status?: TaskStatus;
	}

	export interface ISolution {
		id: string;
		status: SolutionStatus;
		code: string;
		language: string;
		user: IUser;
		task: ITask;
		createdAt: Date;
		updatedAt?: Date;
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

	export interface ICollection {
		id: string;
		name: string;
		tasks: ITask[];
		description?: string;
		avatar?: string;
		author: IUser;
		followers: IUser[];
		createdAt: Date;
		updatedAt?: Date;
	}

	export type TClans = Array<IClan>;
}

declare namespace WebApi.Types {
	interface IPaginationResponse<T> {
		items: T[];
		full: number;
		hasMore: boolean;
	}

	interface IPaginationRequest {
		skip: number;
		limit: number;
	}
}
