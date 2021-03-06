import { MemberRoles, MemberStatus } from 'common/enum/app/clans';
import { TaskStatus } from './common/task';
import { SolutionStatus } from './common/solution';
import { Discipline } from 'containers/create-new-task/data';

declare namespace WebApi.Entities {
	export interface IExample {
		id: string;
		name?: string;
		email?: string;
	}

	interface IBaseEntity {
		id: string;
		createdAt: Date;
		updatedAt?: Date;
	}

	export interface IClanProfile {
		id: string;
		role: string;
		status: string;
		user: IMember;
		joinedAt: Date;
	}

	export interface IUser extends IBaseEntity {
		username: string;
		name: string;
		surname: string;
		email: string;
		clan?: IClan | null;
		rank: number;
		honor: number;
		profileClan?: IClanProfile;
		githubId?: string;
		avatar?: string;
		position?: number;
		following: any[];
		followers: any[];
		imageSource: string;
	}

	export interface IMember extends IUser {
		profileClan: IClanProfile;
	}

	export interface ITag extends IBaseEntity {
		name: string;
	}

	export interface IChallenge {
		id: string;
		name: string;
		discipline: string;
		description: string;
		exampleTestCases: string;
		rank: number;
		tags: ITag[];
		status?: TaskStatus;
		user: IUser | null;
		createdAt: Date;
		initialSolution: string;
		completeSolution: string;
		contributors: IUser[];
		solutions: ISolution[];
		savedToFavorites: number;
		positiveFeedback: number;
	}

	export interface ISolution extends IBaseEntity {
		status: SolutionStatus;
		code: string;
		language: string;
		user: IUser;
		task: Partial<ITask>;
		testCases?: string;
	}

	export interface IClan extends IBaseEntity {
		name: string;
		description?: string;
		rank: number;
		avatar?: string;
		cover?: string;
		honor: number;
		isPublic: boolean;
		maxMembers: number;
		numberOfMembers: number;
		members: Array<IMember>;
	}

	export interface ICollection extends IBaseEntity {
		name: string;
		tasks: Partial<ITask>[];
		description?: string;
		avatar?: string;
		author: IUser;
		followers: IUser[];
	}

	export type TClans = Array<IClan>;

	export interface ISolution {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		status: SolutionStatus;
		code: string;
	}

	export interface ITask {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		name: string;
		discipline: Discipline;
		rank: number;
		allowContributors: boolean;
		description: string;
		completeSolution: string;
		initialSolution: string;
		testCases: string;
		exampleTestCases: string;
		status: TaskStatus;
		isPublished: boolean;
		solutions: ISolution[];
		tags: Array<ITag>;
		user: {
			name: string;
			surname: string;
			username: string;
		};
		validateSolution: boolean;
		comments: Array<ICommentTask>;
	}

	export interface ICommentTask {
		id: string;
		task: ITask;
		user: IUser;
		body: string;
		createdAt: Date;
		updatedAt: Date;
		isLike: boolean;
		user: IUser;
	}

	export interface IStats {
		totalSkips: number;
		usersTrained: number;
		totalUnlocked: number;
		usersCompleted: number;
	}
}

declare namespace WebApi.Types {
	type TPaginationResponse<T, N extends string> = {
		[_ in N]: T[];
	} & {
		total?: number;
		count?: { [key in SolutionStatus]?: string };
	};

	type TPaginationRequest = {
		skip: number;
		take: number;
		status?: SolutionStatus;
	};
}
