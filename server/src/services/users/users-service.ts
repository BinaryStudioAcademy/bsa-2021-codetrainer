import Express from 'express';
import { getCustomRepository } from 'typeorm';
import { ValidationError } from '../../helpers';
import { CODE_ERRORS } from '../../common';
import { TUserRepository, User as UserEntity } from '../../data';

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

	async update(id: string, body: UserEntity) {
		const repository = getCustomRepository(this.userRepository);

		return {
			user: await repository.updateById(id, body),
		};
	}

	async delete(id: string, res: Express.Response) {
		const repository = getCustomRepository(this.userRepository);
		const isDeleted = await repository.removeById(id).then((data) => !!data.affected);

		if (!isDeleted) {
			res.status(404);

			return { message: 'User not found' };
		}

		return { delete: isDeleted };
	}

	async search(query: { username: string }) {
		const userRepository = getCustomRepository(this.userRepository);
		const user = await userRepository.search(query);
		if (!user) {
			throw new ValidationError(CODE_ERRORS.USERNAME_NOT_EXIST(query.username));
		}
		return { user };
	}
}

export type TUsers = InstanceType<typeof User>;
