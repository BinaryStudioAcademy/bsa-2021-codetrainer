import { UserRepository, ProfileClanRepository } from './user';
import { ClanRepository } from './clan';
import { FollowerRepository } from './follower';
import { ImagesRepository } from './images.repository';
import { TaskRepository } from './task/task-repository';
import { TagRepository } from './tag';
import { SolutionRepository } from './solution';

type TUserRepository = typeof UserRepository;
type TClanRepository = typeof ClanRepository;
type TProfileClanRepository = typeof ProfileClanRepository;
type TFollowerRepository = typeof FollowerRepository;

const imagesRepository = new ImagesRepository();
type TTaskRepository = typeof TaskRepository;
type TTagRepository = typeof TagRepository;
type TSolutionRepository = typeof SolutionRepository;

export { UserRepository, TUserRepository };
export { ClanRepository, TClanRepository };
export { ProfileClanRepository, TProfileClanRepository };
export { FollowerRepository, TFollowerRepository };
export { imagesRepository, ImagesRepository };
export { TaskRepository, TTaskRepository };
export { TagRepository, TTagRepository };
export { SolutionRepository, TSolutionRepository };
