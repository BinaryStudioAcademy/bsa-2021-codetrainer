import Express from 'express';
import { getCustomRepository } from 'typeorm';
import { TUserRepository } from '../../data';
import { User as UserType } from '../../data/models';
import { ValidationError, cryptCompare, encrypt } from '../../helpers';
import { CODE_ERRORS } from '../../common';

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

	async update(id: string, body: UserType) {
		const repository = getCustomRepository(this.userRepository);
		const user = await repository.getById(id);

		if (user?.email !== body.email) {
			if (await repository.exists({ email: body.email })) {
				throw new ValidationError(CODE_ERRORS.EMAIL_ALREDY_EXIST);
			}
		}

		if(user?.username !== body.username) {
			if(await repository.exists({ username: body.username })) {
				throw new ValidationError(CODE_ERRORS.USERNAME_ALREDY_EXIST);
			}
		}

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

	async updatePassword(id: string, body: UserType & {newPassword: string}) {
		const repository = getCustomRepository(this.userRepository);
		const user = await repository.getPasswordById(id);

		if(body.password && !(await cryptCompare(body.password, user?.password))) {
			throw new ValidationError(CODE_ERRORS.PASSWORD_NOT_MATCH);
		}

		await repository.updateById(id, {
			password: await encrypt(body.newPassword)
		});

		return {
			passwordChanged: true
		};
	}
}

export type TUsers = InstanceType<typeof User>;
