import { Clan, Task, User, Solution } from '../data';

declare module 'express-serve-static-core' {
	interface Request {
		task: Task;
		clan: Clan;
		user: User;
		solution: Solution;
		validData: any;
	}
}
