import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../models';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
