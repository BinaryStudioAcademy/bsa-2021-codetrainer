import { Auth } from './auth';
import { UserRepository, ClanRepository, ProfileClanRepository, imagesRepository } from '../data';
import { Clan } from './clan';
import { ImagesService } from './images.service';

const auth = new Auth({ user: UserRepository });
type TAuthService = InstanceType<typeof Auth>;

const clan = new Clan({ clan: ClanRepository, user: UserRepository, profileClan: ProfileClanRepository });
type TClanService = InstanceType<typeof Clan>;

const imagesService = new ImagesService(imagesRepository);

export { auth, TAuthService, clan, TClanService };
export { imagesService, ImagesService };
