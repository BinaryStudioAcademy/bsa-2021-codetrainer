import { Server } from 'socket.io';
import { Clan, Task, User, Solution, Collection } from '../data';

declare module 'express-serve-static-core' {
	interface Request {
		task: Task;
		clan: Clan;
		user: User;
		solution: Solution;
		collection: Collection;
		validData: any;
		io: Server;
	}
}
