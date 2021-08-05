import { UserRepository, ProfileClanRepository } from './user';
import { ClanRepository } from './clan';

type TUserRepository = typeof UserRepository;
type TClanRepository = typeof ClanRepository;
type TProfileClanRepository = typeof ProfileClanRepository;

export {
	UserRepository,
	TUserRepository,
	ClanRepository,
	TClanRepository,
	ProfileClanRepository,
	TProfileClanRepository,
};
