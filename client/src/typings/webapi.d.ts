import { MemberRoles, MemberStatus } from 'common/enum/app/clans';
import SolutionStatus from 'common/enum/app/solutions/solution-status';
import TaskStatus from 'common/enum/app/tasks/task-status';

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

	export interface ISolution {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		status: SolutionStatus;
		code: string;
	}

	export interface ITag {
		id: string;
		name: string;
	}

	export interface ITask {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		name: string;
		discipline: string;
		rank: number;
		allowContributors: boolean;
		description: string;
		completeSolution: string;
		initialSolution: string;
		preloaded: string;
		testCases: string;
		exampleTestCases: string;
		status: TaskStatus;
		isPublished: boolean;
		solutions: Array<{ id: string }>;
		tags: Array<ITag>;
		user: {
			name: string;
			surname: string;
		};
	}
}
