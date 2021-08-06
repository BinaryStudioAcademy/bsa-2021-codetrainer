import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../models';
import { IUserFields } from '../../../types';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	getByEmail(email: string) {
		return this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
	}

	getById(id: string) {
		return this.createQueryBuilder('user')
			.leftJoinAndSelect('user.profileClan', 'profileClan')
			.leftJoinAndSelect('user.clan', 'clan')
			.leftJoinAndSelect('user.tasks', 'task')
			.select(['user.id', 'user.name', 'user.surname', 'user.email', 'clan', 'profileClan', 'task.id'])
			.where('user.id = :id', { id })
			.getOne();
	}

	updateById(id: string, data: Partial<IUserFields>) {
		return this.save({ id, ...data });
	}
}
