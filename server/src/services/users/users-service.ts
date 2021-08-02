import { getCustomRepository } from 'typeorm';
import { TUserRepository } from '../../data';
import { encrypt, createToken } from '../../helpers';
import { IUserFields } from '../../types/user/user-fields';

export class User {
	protected userRepository: TUserRepository;

	constructor({ user }: { user: TUserRepository }) {
		this.userRepository = user;
	}

	async getAllUsers() {
		const repository = getCustomRepository(this.userRepository);

		return {
			users: await repository.getAll(),
		};
	}

	async getOne(id: string) {
		const repository = getCustomRepository(this.userRepository);

		return {
			user: await repository.getById(id),
		};
	}

	async update(id: string, body: IUserFields) {
		const repository = getCustomRepository(this.userRepository);

		return {
			user: await repository.updateById(id, body),
		};
	}

	async delete(id: string) {
		const repository = getCustomRepository(this.userRepository);

		return {
			delete: await repository.removeById(id).then((data) => (data.affected ? true : 'User not found')),
		};
	}
}

export type TUsers = InstanceType<typeof User>;
