import { User } from './users';
import { FollowersService } from './follower';
import {
	UserRepository,
	ClanRepository,
	ProfileClanRepository,
	imagesRepository,
	TaskRepository,
	TagRepository,
	SolutionRepository,
	FollowerRepository,
	CollectionRepository,
	CommentTaskRepository,
} from '../data';
import { AuthService } from './auth';
import { ClanService } from './clan';
import { TaskService } from './task/task-service';
import { ImagesService } from './images.service';
import { GithubService } from './github.service';
import { CommentTaskService } from './comment-task';
import { TagService } from './tag/tag-service';
import { SolutionService } from './solution/solution-service';
import { CollectionService } from './collection/collection-service';
import { ProfileClanService } from './profile-clan';

const authService = new AuthService({ user: UserRepository });

const users = new User({ user: UserRepository });
type TUsersService = InstanceType<typeof User>;

export { users, TUsersService };
const clanService = new ClanService({ clan: ClanRepository, user: UserRepository, profileClan: ProfileClanRepository });

const followersService = new FollowersService({ follower: FollowerRepository, user: UserRepository });
const imagesService = new ImagesService(imagesRepository);
const githubService = new GithubService({ authService, userRepository: UserRepository });

const commentTaskService = new CommentTaskService({ commentTask: CommentTaskRepository });
const taskService = new TaskService({ task: TaskRepository, user: UserRepository, tag: TagRepository });
const tagService = new TagService({ tag: TagRepository, task: TaskRepository });
const solutionService = new SolutionService({
	user: UserRepository,
	task: TaskRepository,
	solution: SolutionRepository,
});
const collectionService = new CollectionService({ collection: CollectionRepository, user: UserRepository });

const profileClanService = new ProfileClanService({ user: UserRepository, profileClan: ProfileClanRepository });

export { authService, AuthService };
export { clanService, ClanService };
export { imagesService, ImagesService };
export { taskService, TaskService };
export { githubService, GithubService };
export { followersService, FollowersService };
export { commentTaskService, CommentTaskService };
export { tagService, TagService };
export { solutionService, SolutionService };
export { collectionService, CollectionService };
export { profileClanService, ProfileClanService };
