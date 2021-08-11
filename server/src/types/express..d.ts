import { Clan, Task, User } from '../data';

declare module 'express-serve-static-core' {
	interface Request {
		task: Task;
		clan: Clan;
		user: User;
	}
}
