import { EntityRepository, Repository } from 'typeorm';
import { Follower } from '../../models/follower';

@EntityRepository(Follower)
export class FollowerRepository extends Repository<Follower> {
	getFollowers(id: string) {
		return this.createQueryBuilder('follower')
			.select(['follower.id', 'follower.follower'])
			.where('follower.user = :id', { id })
			.getMany();
	}

	getFollowing(id: string) {
		return this.createQueryBuilder('follower')
			.select(['follower.id', 'follower.user'])
			.where('follower.follower = :id', { id })
			.getMany();
	}

	post(data: Partial<Follower>) {
		return this.save(data);
	}

	removeById(data: Partial<Follower>) {
		return this.delete(data);
	}
}
