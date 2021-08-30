import { getCustomRepository } from 'typeorm';
import Express from 'express';
import { TFollowerRepository, TUserRepository, Follower, User } from '../../data';

export class FollowersService {
	protected followerRepository: TFollowerRepository;

	protected userRepository: TUserRepository;

	constructor({ follower, user }: { follower: TFollowerRepository; user: TUserRepository }) {
		this.followerRepository = follower;
		this.userRepository = user;
	}

	async getFollowers(id: string) {
		const repository = getCustomRepository(this.followerRepository);
		const followers = await repository.getFollowers(id);
		const response = followers.map((follower: Follower) => {
			return {
				id: follower.id,
				user: follower.follower,
			};
		});
		return {
			followers: response,
		};
	}

	async getFollowing(id: string) {
		const repository = getCustomRepository(this.followerRepository);

		return {
			followings: await repository.getFollowing(id),
		};
	}

	async getCommunity(id: string) {
		const repository = getCustomRepository(this.followerRepository);

		const following = await repository.getFollowing(id);
		const followers = await repository.getFollowers(id);

		const community: User[] = [];

		followers.forEach((followerUser) => {
			following.forEach((followingUser) => {
				if (followerUser.follower.id === followingUser.following.id) {
					community.push(followingUser.following);
				}
			});
		});

		return {
			community,
		};
	}

	async create(data: { following: string; follower: string }, res: Express.Response) {
		const repository = getCustomRepository(this.followerRepository);
		const userRepository = getCustomRepository(this.userRepository);

		const following = await userRepository.getById(data.following);
		const follower = await userRepository.getById(data.follower);

		if (!following || !follower) {
			res.status(404);

			return { message: 'User not found' };
		}

		const newFollower = {
			following,
			follower,
		};

		return {
			follower: await repository.post(newFollower),
		};
	}

	async delete(data: { id: string }) {
		const repository = getCustomRepository(this.followerRepository);
		const res = await repository.removeById(data.id);

		return {
			deleted: !!res.affected,
		};
	}
}
