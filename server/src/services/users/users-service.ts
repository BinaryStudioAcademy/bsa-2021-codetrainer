import Express from 'express';
import { getCustomRepository } from 'typeorm';
import { User as UserType } from '../../data/models';
import { ValidationError, cryptCompare, encrypt } from '../../helpers';
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
		const user = await repository.getById(id);

		if (user?.email !== body.email) {
			if (await repository.exists({ email: body.email })) {
				throw new ValidationError(CODE_ERRORS.EMAIL_ALREADY_EXIST);
			}
		}

		if (user?.username !== body.username) {
			if (await repository.exists({ username: body.username })) {
				throw new ValidationError(CODE_ERRORS.USERNAME_ALREADY_EXIST);
			}
		}
		await repository.updateById(id, body);
		return {
			user: await repository.getById(id),
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

	async updatePassword(id: string, body: UserType & { newPassword: string }) {
		const repository = getCustomRepository(this.userRepository);
		const user = await repository.getPasswordById(id);

		if (body.password && !(await cryptCompare(body.password, user?.password))) {
			throw new ValidationError(CODE_ERRORS.PASSWORD_NOT_MATCH);
		}

		await repository.updateById(id, {
			password: await encrypt(body.newPassword),
		});

		return {
			passwordChanged: true,
		};
	}

	async search(query: { username: string }) {
		const userRepository = getCustomRepository(this.userRepository);
		const user = await userRepository.search(query);
		if (!user) {
			throw new ValidationError(CODE_ERRORS.USERNAME_NOT_EXIST(query.username));
		}
		return { user };
	}

	async getLeaders(query: { take: number; skip: number; nameQuery: string }) {
		const userRepository = getCustomRepository(this.userRepository);
		const result = await userRepository.getLeaders(query);

		return result;
	}
}

export type TUsers = InstanceType<typeof User>;
