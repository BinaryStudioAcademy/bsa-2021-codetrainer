import { WebApi } from 'typings/webapi';
import { IClanForm } from 'components/modals/clan-modal/types';
import IClan = WebApi.Entities.IClan;

export interface IUser {
	id: string;
	username: string;
	rank: number;
	avatar?: string;
	name: string;
	surname?: string;
	clan?: IClan | null;
	honor: number;
}

export interface ICommunityProps {
	isInClan: boolean;
	users: IUser[];
	onCreateClan: (form: IClanForm) => void;
	isCreateLoading: boolean;
}
