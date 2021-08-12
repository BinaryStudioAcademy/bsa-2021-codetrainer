import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../models';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
				'clan',
				'solution.id',
				'profileClan',
				'task.id',
			])
			.where('user.id = :id', { id })
			.getOne();
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
