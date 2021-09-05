import React from 'react';
import { IUser } from './components/community/interface';
import { IClanForm } from 'components/modals/clan-modal/types';

export interface IHomeProps {
	activeUser: IUser | null;
	users: IUser[];
	onCreateClan: (form: IClanForm) => void;
	isCreateLoading: boolean;
	isInClan: boolean;
	nextTaskContent: React.ReactNode;
	feedContent: React.ReactNode;
}
