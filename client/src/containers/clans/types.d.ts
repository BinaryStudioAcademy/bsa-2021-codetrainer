import { MemberRoles } from 'common/enum/app/clans';

export interface IMember {
	id: string;
	rank: number;
	avatar: string;
	name: string;
	surname: string;
	honour: number;
	profileClan: {
		role: MemberRoles;
		status: MemberStatusl;
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
