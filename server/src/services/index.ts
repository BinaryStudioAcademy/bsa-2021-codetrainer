import {
	UserRepository,
	ClanRepository,
	ProfileClanRepository,
	imagesRepository,
	TaskRepository,
	TagRepository,
	SolutionRepository,
} from '../data';
import { AuthService } from './auth';
import { ClanService } from './clan';
import { TaskService } from './task/task-service';
import { ImagesService } from './images.service';
import { GithubService } from './github.service';
import { TagService } from './tag/tag-service';
import { SolutionService } from './solution/solution-service';

const authService = new AuthService({ user: UserRepository });
const clanService = new ClanService({ clan: ClanRepository, user: UserRepository, profileClan: ProfileClanRepository });
const imagesService = new ImagesService(imagesRepository);
const githubService = new GithubService({ authService, userRepository: UserRepository });
const taskService = new TaskService({ task: TaskRepository, user: UserRepository, tag: TagRepository });
const tagService = new TagService({ tag: TagRepository, task: TaskRepository });
const solutionService = new SolutionService({
	user: UserRepository,
	task: TaskRepository,
	solution: SolutionRepository,
});

export { authService, AuthService };
export { clanService, ClanService };
export { imagesService, ImagesService };
export { taskService, TaskService };
export { githubService, GithubService };
export { tagService, TagService };
export { solutionService, SolutionService };
