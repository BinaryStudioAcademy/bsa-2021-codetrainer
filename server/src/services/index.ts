import { FollowersService } from './follower';
import {
	UserRepository,
	ClanRepository,
	ProfileClanRepository,
	imagesRepository,
	TaskRepository,
	FollowerRepository,
} from '../data';
import { AuthService } from './auth';
import { ClanService } from './clan';
import { TaskService } from './task/task-service';
import { ImagesService } from './images.service';
import { GithubService } from './github.service';

const authService = new AuthService({ user: UserRepository });

const clanService = new ClanService({ clan: ClanRepository, user: UserRepository, profileClan: ProfileClanRepository });

const follower = new FollowersService({ follower: FollowerRepository });
type TFollowerService = InstanceType<typeof FollowersService>;

const imagesService = new ImagesService(imagesRepository);
const githubService = new GithubService({ authService, userRepository: UserRepository });

const taskService = new TaskService({ task: TaskRepository, user: UserRepository });

export { authService, AuthService };
export { clanService, ClanService };
export { imagesService, ImagesService };
export { taskService, TaskService };
export { githubService, GithubService };
export { follower, TFollowerService };
