import React from 'react';
import { IUser } from './components/community/interface';

export interface IHomeProps {
	activeUser: IUser | null;
	users: IUser[];
	isInClan: boolean;
	nextTaskContent: React.ReactNode;
	feedContent: React.ReactNode;
}
