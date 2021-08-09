import { UserRepository, ClanRepository, ProfileClanRepository, imagesRepository, TaskRepository } from '../data';
import { AuthService } from './auth';
import { ClanService } from './clan';
import { TaskService } from './task/task-service';
import { ImagesService } from './images.service';
import { GithubService } from './github.service';

const authService = new AuthService({ user: UserRepository });

const clanService = new ClanService({ clan: ClanRepository, user: UserRepository, profileClan: ProfileClanRepository });

const imagesService = new ImagesService(imagesRepository);
const githubService = new GithubService({ authService: auth, userRepository: UserRepository });

const taskService = new TaskService({ task: TaskRepository, user: UserRepository });

export { authService, AuthService };
export { clanService, ClanService };
export { imagesService, ImagesService };
export { taskService, TaskService };
export { githubService, GithubService };
