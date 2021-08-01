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

		return repository.getById(id);
	}

	async update(id: string, body: IUserFields) {
		console.log(body);
	}
	// async login({ id }: { id: string }) {
	// 	const repository = getCustomRepository(this.userRepository);
	// 	return {
	// 		token: createToken({ id }),
	// 		user: await repository.getById(id),
	// 	};
	// }

	// async register({ password, ...userData }: Omit<IUserFields, 'id'>) {
	// 	const repository = getCustomRepository(this.userRepository);
	// 	const newUser = await repository.save({
	// 		...userData,
	// 		password: await encrypt(password),
	// 	});

	// 	return this.login(newUser);
	// }
}

export type TUsers = InstanceType<typeof User>;
