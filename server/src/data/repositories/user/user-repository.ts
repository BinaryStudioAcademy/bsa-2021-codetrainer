import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../abstract/index';
import { User } from '../../models';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
	userFields = [
		'user.id',
		'user.name',
		'user.surname',
		'user.nickname',
		'user.avatar',
		'user.createdAt',
		'user.lastVisit',
		'user.skills',
		'user.devLevel',
		'user.social',
		'user.email',
		'user.githubId',
	];

	getAll() {
		return this.createQueryBuilder('user').select(this.userFields).getMany();
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
			.select([
				'user.id',
				'user.username',
				'user.name',
				'user.surname',
				'user.email',
				'user.githubId',
				'user.devLevel',
				'user.social',
				'user.skills',
				'clan',
				'solution.id',
				'profileClan',
				'task.id',
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
}
