import { UserRepository, ProfileClanRepository } from './user';
import { ClanRepository } from './clan';
import { FollowerRepository } from './follower';
import { ImagesRepository } from './images.repository';
import { TaskRepository } from './task/task-repository';
import { CommentTaskRepository } from './comment-task';

type TUserRepository = typeof UserRepository;
type TClanRepository = typeof ClanRepository;
type TProfileClanRepository = typeof ProfileClanRepository;
type TFollowerRepository = typeof FollowerRepository;

const imagesRepository = new ImagesRepository();
type TTaskRepository = typeof TaskRepository;
type TCommentTaskRepository = typeof CommentTaskRepository;

export { UserRepository, TUserRepository };
export { ClanRepository, TClanRepository };
export { ProfileClanRepository, TProfileClanRepository };
export { FollowerRepository, TFollowerRepository };
export { imagesRepository, ImagesRepository };
export { TaskRepository, TTaskRepository };
export { CommentTaskRepository, TCommentTaskRepository };
