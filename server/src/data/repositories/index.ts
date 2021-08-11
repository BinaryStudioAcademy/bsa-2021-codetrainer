import { UserRepository, ProfileClanRepository } from './user';
import { ClanRepository } from './clan';
import { ImagesRepository } from './images.repository';
import { TaskRepository } from './task/task-repository';
import { TagRepository } from './tag';

type TUserRepository = typeof UserRepository;
type TClanRepository = typeof ClanRepository;
type TProfileClanRepository = typeof ProfileClanRepository;
const imagesRepository = new ImagesRepository();
type TTaskRepository = typeof TaskRepository;
type TTagRepository = typeof TagRepository;

export { UserRepository, TUserRepository };
export { ClanRepository, TClanRepository };
export { ProfileClanRepository, TProfileClanRepository };
export { imagesRepository, ImagesRepository };
export { TaskRepository, TTaskRepository };
export { TagRepository, TTagRepository };
export { TaskSorts } from './task/task-repository';
