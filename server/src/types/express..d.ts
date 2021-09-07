import { Server } from 'socket.io';
import { Clan, Task, User, Solution, Collection, CommentSolution, CommentTask } from '../data';

declare module 'express-serve-static-core' {
	interface Request {
		task: Task;
		clan: Clan;
		user: User;
		solution: Solution;
		collection: Collection;
		commentSolution: CommentSolution;
		validData: any;
		io: Server;
		commentTask: CommentTask;
	}
}
