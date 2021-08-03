import { Auth, TAuth } from './auth';
import { UserRepository, ImagesRepository, imagesRepository } from '../data';
import { ImagesService } from './images.service';

const auth = new Auth({ user: UserRepository });
const imagesService = new ImagesService(imagesRepository);

export { auth, TAuth };
export { imagesService, ImagesService };
