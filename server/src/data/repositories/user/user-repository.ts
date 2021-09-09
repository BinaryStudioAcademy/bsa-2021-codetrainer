import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../abstract';
import { User } from '../../models';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
	userFields = [
		'user.id',
		'user.rank',
		'user.honor',
		'user.name',
		'user.surname',
		'user.username',
		'user.avatar',
		'user.rank',
		'user.honor',
		'user.createdAt',
		'user.lastVisit',
		'user.skills',
		'user.devLevel',
		'user.social',
		'user.email',
		'user.githubId',
	];

	getAll() {
		return this.createQueryBuilder('user')
			.leftJoinAndSelect('user.followers', 'followers')
			.leftJoinAndSelect('user.following', 'following')
			.select([...this.userFields, 'followers', 'following'])
			.getMany();
	}

	getByEmail(email: string) {
		return this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
	}

	getByUsername(username: string) {
		return this.createQueryBuilder('user').where('user.username = :username', { username }).getOne();
	}

	getById(id: string) {
		return this.createQueryBuilder('user')
			.leftJoinAndSelect('user.profileClan', 'profileClan')
			.leftJoinAndSelect('user.clan', 'clan')
			.leftJoinAndSelect('user.tasks', 'task')
			.leftJoinAndSelect('user.solutions', 'solution')
			.leftJoinAndSelect('user.commentSolutions', 'commentSolution')
			.leftJoinAndSelect('user.followers', 'followers')
			.leftJoinAndSelect('user.following', 'following')
			.leftJoinAndSelect('following.following', 'following_user')
			.leftJoinAndSelect('followers.follower', 'follower_user')
			.select([
				...this.userFields,
				'clan',
				'solution.id',
				'solution.status',
				'profileClan',
				'task.id',
				'commentSolution.id',
				'followers.id',
				'following.id',
				'follower_user',
				'following_user',
			])
			.where('user.id = :id', { id })
			.getOne();
	}

	removeById(id: string) {
		return this.delete({ id });
	}

	getByGithubId(githubId: string): Promise<User | undefined> {
		return this.findOne({ githubId });
	}

	getByToken(token: string) {
		return this.createQueryBuilder('user').where('user.resetToken = :token', { token }).getOne();
	}

	updateById(id: string, data: Partial<User>) {
		return this.createQueryBuilder().update().set(data).where('id = :id', { id }).execute();
	}

	getPasswordById(id: string) {
		return this.createQueryBuilder('user').select(['user.password']).where('user.id = :id', { id }).getOne();
	}

	search(query: { username: string }) {
		const { username } = query;
		return this.createQueryBuilder('user')
			.leftJoinAndSelect('user.profileClan', 'profileClan')
			.leftJoinAndSelect('user.clan', 'clan')
			.leftJoinAndSelect('user.tasks', 'task')
			.leftJoinAndSelect('user.solutions', 'solution')
			.select([
				'user.id',
				'user.createdAt',
				'user.lastVisit',
				'user.avatar',
				'user.username',
				'user.name',
				'user.surname',
				'user.email',
				'user.githubId',
				'clan',
				'solution.id',
				'profileClan',
				'task.id',
				'user.rank',
				'user.honor',
			])
			.where('user.username = :username', { username })
			.getOne();
	}

	async getLeaders(query: { skip: number; take: number; nameQuery?: string }) {
		const { nameQuery = '', take, skip } = query;
		const [data, count] = await this.createQueryBuilder('user')
			.leftJoinAndSelect('user.profileClan', 'profileClan')
			.leftJoinAndSelect('user.clan', 'clan')
			.leftJoinAndSelect('user.tasks', 'task')
			.leftJoinAndSelect('user.solutions', 'solution')
			.select([
				'user.id',
				'user.rank',
				'user.honor',
				'user.username',
				'user.avatar',
				'user.name',
				'user.surname',
				'user.email',
				'user.githubId',
				'clan',
				'solution.id',
				'profileClan',
				'task.id',
			])
			.orderBy('user.honor', 'DESC')
			.where('user.name ILIKE :q', { q: `%${nameQuery.toLowerCase()}%` })
			.orWhere('user.surname ILIKE :q', { q: `%${nameQuery.toLowerCase()}%` })
			.skip(skip)
			.take(take)
			.getManyAndCount();

		return {
			count,
			data,
		};
	}
}
