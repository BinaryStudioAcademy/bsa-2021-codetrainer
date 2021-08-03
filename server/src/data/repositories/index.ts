import { ImagesRepository } from './images.repository';
import { UserRepository } from './user';

type TUserRepository = typeof UserRepository;
const imagesRepository = new ImagesRepository();

export { UserRepository, TUserRepository };
export { imagesRepository, ImagesRepository };
