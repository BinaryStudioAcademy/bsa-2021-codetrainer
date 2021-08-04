import { Auth } from './auth';
import { UserRepository, ClanRepository, ProfileClanRepository } from '../data';
import { User } from './users';
import { Clan } from './clan';

const auth = new Auth({ user: UserRepository });
type TAuthService = InstanceType<typeof Auth>;

const users = new User({ user: UserRepository });
type TUsersService = InstanceType<typeof User>;

const clan = new Clan({ clan: ClanRepository, user: UserRepository, profileClan: ProfileClanRepository });
type TClanService = InstanceType<typeof Clan>;

export { auth, TAuthService, clan, TClanService, users, TUsersService };
