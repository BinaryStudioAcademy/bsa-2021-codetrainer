import { IUser } from './components/community/interfce';
import { IMessage } from './components/feed/interface';

export interface IHomeProps {
	activeUser: IUser;
	users: IUser[];
	messages: IMessage[];
}
