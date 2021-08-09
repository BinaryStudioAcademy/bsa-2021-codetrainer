import { getCustomRepository } from 'typeorm';
import { CODE_ERRORS } from '../../common';
import { TUserRepository } from '../../data';
import { encrypt, createToken, TokenTypes, verifyToken, ValidationError } from '../../helpers';
import { IUserFields } from '../../types';

export class Auth {
	protected userRepository: TUserRepository;

	constructor({ user }: { user: TUserRepository }) {
		this.userRepository = user;
	}

	async login({ id }: { id: string }) {
		const repository = getCustomRepository(this.userRepository);
		return {
			token: createToken({ id }, TokenTypes.ACCESS),
			refreshToken: createToken({ id }, TokenTypes.REFRESH),
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

	async refreshToken(token: string = '') {
		try {
			const { id } = verifyToken(token);
			const repository = getCustomRepository(this.userRepository);
			const user = await repository.getById(id);
			if (!user) {
				throw new ValidationError(CODE_ERRORS.TOKEN_VERIFY);
			}
			return {
				token: createToken({ id }, TokenTypes.ACCESS),
				refreshToken: createToken({ id }, TokenTypes.REFRESH),
				user,
			};
		} catch (error) {
			const { name } = error;
			if (name && name === 'TokenExpiredError') {
				throw new ValidationError(CODE_ERRORS.TOKEN_EXPIRED);
			} else if (name && name === 'JsonWebTokenError') {
				throw new ValidationError(CODE_ERRORS.TOKEN_INVALID);
			}
			throw new Error(error);
		}
	}
}
