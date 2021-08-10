import { EntityRepository, Repository } from 'typeorm';
import { Follower } from '../../models/follower';
import { IFollowerFields } from '../../../types/follower';

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

	post(data: Partial<IFollowerFields>) {
		return this.save(data);
	}

	removeById(data: Partial<IFollowerFields>) {
		return this.delete(data);
	}
}
