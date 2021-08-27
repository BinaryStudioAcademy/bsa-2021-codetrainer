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
			.select([...this.userFields, 'clan', 'solution.id', 'profileClan', 'task.id'])
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
				'user.username',
				'user.name',
				'user.surname',
				'user.email',
				'user.githubId',
				'clan',
				'solution.id',
				'profileClan',
				'task.id',
			])
			.where('user.username = :username', { username })
			.getOne();
	}

	async getLeaders(query: { skip: number; take: number; nameQuery?: string }) {
		const { nameQuery = '', take, skip } = query;
		const searchQuery = this.createQueryBuilder('user')
			.leftJoinAndSelect('user.profileClan', 'profileClan')
			.leftJoinAndSelect('user.clan', 'clan')
			.leftJoinAndSelect('user.tasks', 'task')
			.leftJoinAndSelect('user.solutions', 'solution')
			// .addSelect('ROW_NUMBER () OVER (ORDER BY user.honor) as position')
			// .orderBy('user.honor', 'DESC')
			.where('user.name ILIKE :q', { q: `%${nameQuery.toLowerCase()}%` })
			.orWhere('user.surname ILIKE :q', { q: `%${nameQuery.toLowerCase()}%` });

		return {
			count: await searchQuery.getCount(),
			data: await searchQuery.skip(skip).take(take).getMany(),
			// .getRawMany(),
		};
	}
}
