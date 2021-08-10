import { UserRepository, ProfileClanRepository } from './user';
import { ClanRepository } from './clan';
import { FollowerRepository } from './follower/follower-repository';

type TUserRepository = typeof UserRepository;
type TClanRepository = typeof ClanRepository;
type TProfileClanRepository = typeof ProfileClanRepository;
type TFollowerRepository = typeof FollowerRepository;

export {
	UserRepository,
	TUserRepository,
	ClanRepository,
	TClanRepository,
	ProfileClanRepository,
	TProfileClanRepository,
	FollowerRepository,
	TFollowerRepository,
};
