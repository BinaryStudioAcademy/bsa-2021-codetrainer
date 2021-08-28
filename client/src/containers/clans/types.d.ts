import { MemberRoles } from 'common/enum/app/clans';
import { WebApi } from 'typings/webapi';

export interface IMember {
	id: string;
	rank: number;
	avatar: string;
	name: string;
	surname: string;
	honor: number;
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
	honor: number;
	isPublic: boolean;
	maxMembers: number;
	numberOfMembers: number;
	createdAt: Date;
	members: WebApi.Entities.IMember[];
}

export type TClans = Array<IClan>;
