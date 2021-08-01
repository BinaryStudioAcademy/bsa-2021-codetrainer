import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../models';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	getAll() {
		return this.createQueryBuilder('user')
			.select([
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
			])
			.getMany();
	}

	getByEmail(email: string) {
		return this.findOne({ email });
	}

	getById(id: string) {
		return this.createQueryBuilder('user')
			.select(['user.id', 'user.name', 'user.surname', 'user.email'])
			.where('user.id = :id', { id })
			.getOne();
	}
}
