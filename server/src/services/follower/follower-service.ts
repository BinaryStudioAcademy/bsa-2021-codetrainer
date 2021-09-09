import { getCustomRepository } from 'typeorm';
import { TFollowerRepository, TUserRepository, Follower, User } from '../../data';
import { ValidationError } from '../../helpers';
import { CODE_ERRORS } from '../../common';

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

	async follow(follower: User, followingId: string) {
		const repository = getCustomRepository(this.followerRepository);
		const userRepository = getCustomRepository(this.userRepository);

		const existingFollowing = await userRepository.getById(followingId);

		if (!existingFollowing) {
			throw new ValidationError(CODE_ERRORS.USER_NOT_EXIST);
		}

		const followers = (await repository.getFollowers(followingId)).map((person) => person.follower);
		const exisitingFollower = followers.find((person) => person.id === follower.id);

		if (exisitingFollower) {
			throw new ValidationError(CODE_ERRORS.ALREADY_FOLLOWING);
		}

		const newFollower = {
			following: existingFollowing,
			follower,
		};

		await repository.post(newFollower);

		return { followers: await repository.getFollowers(followingId) };
	}

	async unfollow(follower: User, followingId: string) {
		const repository = getCustomRepository(this.followerRepository);
		const userRepository = getCustomRepository(this.userRepository);

		const existingFollowing = await userRepository.getById(followingId);

		if (!existingFollowing) {
			throw new ValidationError(CODE_ERRORS.USER_NOT_EXIST);
		}

		const followers = (await repository.getFollowers(followingId)).map((person) => person.follower);
		const exisitingFollower = followers.find((person) => person.id === follower.id);

		if (!exisitingFollower) {
			throw new ValidationError(CODE_ERRORS.NOT_FOLLOWING);
		}

		await repository.delete({ follower: { id: follower.id }, following: { id: followingId } });

		return { followers: await repository.getFollowers(followingId) };
	}

	async delete(data: { id: string }) {
		const repository = getCustomRepository(this.followerRepository);
		const res = await repository.removeById(data.id);

		return {
			deleted: !!res.affected,
		};
	}
}
