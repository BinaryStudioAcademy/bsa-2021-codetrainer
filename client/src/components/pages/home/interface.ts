import React from 'react';
import { IUser } from './components/community/interfce';
import { IMessage } from './components/feed/interface';

export interface IHomeProps {
	activeUser: IUser;
	users: IUser[];
	messages: IMessage[];
	selectedFeedCategory: string;
	onSelectFeedCategory: (category: string) => void;
	isLastPage: boolean;
	nextTaskContent: React.ReactNode;
}
