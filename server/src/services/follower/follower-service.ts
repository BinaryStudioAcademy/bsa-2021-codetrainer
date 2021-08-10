import { getCustomRepository } from 'typeorm';
import { TFollowerRepository } from '../../data';
import { IFollowerFields } from '../../types/follower';

export class Follower {
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

	async create(data: IFollowerFields) {
		const repository = getCustomRepository(this.followerRepository);

		return {
			follower: await repository.post(data),
		};
	}

	async delete(data: IFollowerFields) {
		const repository = getCustomRepository(this.followerRepository);
		const res = await repository.removeById(data);

		return {
			deleted: !!res.affected,
		};
	}
}
