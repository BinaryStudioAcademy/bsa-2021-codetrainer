import { Auth } from './auth';
import { UserRepository, ClanRepository, ProfileClanRepository } from '../data';
import { Clan } from './clan';

const auth = new Auth({ user: UserRepository });
type TAuthService = InstanceType<typeof Auth>;

const clan = new Clan({ clan: ClanRepository, user: UserRepository, profileClan: ProfileClanRepository });
type TClanService = InstanceType<typeof Clan>;

export { auth, TAuthService, clan, TClanService };
