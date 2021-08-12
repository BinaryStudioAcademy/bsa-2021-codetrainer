import { getCustomRepository } from 'typeorm';
import { TFollowerRepository } from '../../data';
import { Follower } from '../../data/models/follower';

export class FollowersService {
	protected followerRepository: TFollowerRepository;

	constructor({ follower }: { follower: TFollowerRepository }) {
		this.followerRepository = follower;
	}

	async getFollowers(id: string) {
		const repository = getCustomRepository(this.followerRepository);

		return {
			followers: await repository.getFollowers(id),
		};
	}

	async getFollowing(id: string) {
		const repository = getCustomRepository(this.followerRepository);

		return {
			following: await repository.getFollowing(id),
		};
	}

	async create(data: Follower) {
		const repository = getCustomRepository(this.followerRepository);

		return {
			follower: await repository.post(data),
		};
	}

	async delete(data: Partial<Follower>) {
		const repository = getCustomRepository(this.followerRepository);
		const res = await repository.removeById(data);

		return {
			deleted: !!res.affected,
		};
	}
}
