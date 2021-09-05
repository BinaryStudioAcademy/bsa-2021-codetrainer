import { WebApi } from 'typings/webapi';

export enum MembersSortStrategy {
	HONOR = 'honor',
	NAME = 'name',
	JOINED_AT = 'joined_at',
}

export enum ClanPageStatus {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface IMemberWithPosition extends WebApi.Entities.IMember {
	position: number;
}

export interface IMembersFilter {
	name?: string;
}
