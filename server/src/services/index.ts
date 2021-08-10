import { Auth } from './auth';
import { UserRepository, ClanRepository, ProfileClanRepository, FollowerRepository, imagesRepository } from '../data';
import { Clan } from './clan';
import { Follower } from './follower';
import { ImagesService } from './images.service';

const auth = new Auth({ user: UserRepository });
type TAuthService = InstanceType<typeof Auth>;

const clan = new Clan({ clan: ClanRepository, user: UserRepository, profileClan: ProfileClanRepository });
type TClanService = InstanceType<typeof Clan>;

const follower = new Follower({ follower: FollowerRepository });
type TFollowerService = InstanceType<typeof Follower>;

const imagesService = new ImagesService(imagesRepository);

export { auth, TAuthService, clan, TClanService, follower, TFollowerService, imagesService, ImagesService };
