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
		clan?: IClan | null;
		rank: number;
		honor: number;
		profileClan?: {
			id: string;
			role: string;
			status: string;
		};
		githubId?: string;
		profileUrl?: string;
		avatar?: string;

		position?: number;
		following: any[];
		followers: any[];
	}

	export interface ITag {
		id: string;
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
		savedToFavorites: number;
		positiveFeedback: number;
		user: IUser | null;
		createdAt: Date;
		published: Date;
		usersTrained: number;
		skips: number;
		initialSolution: string;
		codeSubmissions: number;
		timesCompleted: number;
		stars: number;
		verySatisfied: number;
		somewhatSatisfied: number;
		notSatisfied: number;
		contributors: IUser[];
		solutions: ISolution[];
	}

	export interface ISolution {
		id: string;
		status: SolutionStatus;
		code: string;
		language: string;
		user: IUser;
		task: Partial<ITask>;
		createdAt: Date;
		updatedAt?: Date;
		testCases?: string;
	}

	export interface IMember {
		id: string;
		username: string;
		rank: number;
		username: string;
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
		tasks: Partial<ITask>[];
		description?: string;
		avatar?: string;
		author: IUser;
		followers: IUser[];
		createdAt: Date;
		updatedAt?: Date;
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
		discipline: string;
		rank: number;
		allowContributors: boolean;
		description: string;
		completeSolution: string;
		initialSolution: string;
		testCases: string;
		exampleTestCases: string;
		status: TaskStatus;
		isPublished: boolean;
		solutions: WebApi.Entities.ISolution[];
		tags: Array<ITag>;
		user: {
			name: string;
			surname: string;
			username: string;
		};
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
