import { EntityRepository, Repository } from 'typeorm';
import { Follower } from '../../models';

@EntityRepository(Follower)
export class FollowerRepository extends Repository<Follower> {
	getFollowers(id: string) {
		return this.createQueryBuilder('follower')
			.leftJoinAndSelect('follower.following', 'following')
			.leftJoinAndSelect('follower.follower', 'follower_user')
			.select(['follower.id', 'follower_user'])
			.where('following.id = :id', { id })
			.getMany();
	}

	getFollowing(id: string) {
		return this.createQueryBuilder('follower')
			.leftJoinAndSelect('follower.following', 'following')
			.leftJoinAndSelect('follower.follower', 'follower_user')
			.select(['follower.id', 'following'])
			.where('follower_user.id = :id', { id })
			.getMany();
	}

	post(data: Partial<Follower>) {
		return this.save(data);
	}

	removeById(id: string) {
		return this.delete(id);
	}
}
