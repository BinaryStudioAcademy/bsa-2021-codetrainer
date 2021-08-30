import { WebApi } from 'typings/webapi';


export interface ILeaderBoardProps {
	isLoading: boolean;
	users: WebApi.Entities.IUser[]
	setNameQuery: (nameQuery: string) => void;
	nameQuery: string;
	page: number;
	itemsPerPage: number;
	count: number;
	setPage: (page: number) => void;
	setItemsPerPage: (itemsPerPage: number) => void;
}
