import { getCustomRepository } from 'typeorm';
import { TUserRepository } from '../../data';
import { encrypt, createToken } from '../../helpers';
import { IUserFields } from '../../types';

export class Auth {
	protected userRepository: TUserRepository;

	constructor({ user }: { user: TUserRepository }) {
		this.userRepository = user;
	}

	async login({ id }: { id: string }) {
		const repository = getCustomRepository(this.userRepository);
		return {
			token: createToken({ id }),
			user: await repository.getById(id),
		};
	}

	async register({ password, ...userData }: Omit<IUserFields, 'id'>) {
		const repository = getCustomRepository(this.userRepository);
		const newUser = await repository.save({
			...userData,
			password: await encrypt(password),
		});

		return this.login(newUser);
	}
}
