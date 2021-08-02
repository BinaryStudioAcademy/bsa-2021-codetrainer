import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../models';
import { IUserFields } from '../../../types';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
	];

	getAll() {
		return this.createQueryBuilder('user').select(this.userFields).getMany();
	}

	getByEmail(email: string) {
		return this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
	}

	getById(id: string) {
		return this.createQueryBuilder('user')
			.leftJoinAndSelect('user.profileClan', 'profileClan')
			.leftJoinAndSelect('user.clan', 'clan')
			.select(this.userFields)
			.where('user.id = :id', { id })
			.getOne();
	}

	updateById(id: string, body: IUserFields) {
		this.update(id, {
			...body,
		});

		return this.getById(id);
	}

	removeById(id: string) {
		return this.delete({ id });
	}
}
