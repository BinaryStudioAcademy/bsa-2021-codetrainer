import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../abstract/index';
import { User } from '../../models';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
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
			.select([
				'user.id',
				'user.username',
				'user.name',
				'user.surname',
				'user.email',
				'user.githubId',
				'clan',
				'profileClan',
				'task.id',
			])
			.where('user.id = :id', { id })
			.getOne();
	}

	getByGithubId(githubId: string): Promise<User | undefined> {
		return this.findOne({ githubId });
	}

	updateById(id: string, data: Partial<User>) {
		return this.createQueryBuilder().update().set(data).where('id = :id', { id }).execute();
	}
}
