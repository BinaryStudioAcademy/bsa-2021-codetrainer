import { getCustomRepository } from 'typeorm';
import { CODE_ERRORS } from '../../common';
import { TUserRepository, User } from '../../data';
import { encrypt, createToken, TokenTypes, verifyToken, ValidationError, createLinkResetPassword } from '../../helpers';
import { mailer } from '../../helpers/mailer';

export class AuthService {
	protected userRepository: TUserRepository;

	constructor({ user }: { user: TUserRepository }) {
		this.userRepository = user;
	}

	async isEmailAvaliable(email: string): Promise<boolean> {
		const repository = getCustomRepository(this.userRepository);
		return !(await repository.exists({ email }));
	}

	async isUsernameAvaliable(username: string): Promise<boolean> {
		const repository = getCustomRepository(this.userRepository);
		return !(await repository.exists({ username }));
	}

	async login({ id }: { id: string }) {
		const repository = getCustomRepository(this.userRepository);
		await repository.updateById(id, { lastVisit: new Date() });
		return {
			token: createToken({ id }, TokenTypes.ACCESS),
			refreshToken: createToken({ id }, TokenTypes.REFRESH),
			user: await repository.getById(id),
		};
	}

	async register({ password, ...userData }: Omit<User, 'id'>) {
		const repository = getCustomRepository(this.userRepository);
		const newUser = await repository.save({
			...userData,
			password: await encrypt(password),
		});
		await mailer.signUp(newUser);
		return this.login(newUser);
	}

	async refreshToken(token: string = '') {
		try {
			const { id } = verifyToken(token, TokenTypes.REFRESH);
			const repository = getCustomRepository(this.userRepository);
			const user = await repository.getById(id);
			if (!user) {
				throw new ValidationError(CODE_ERRORS.TOKEN_VERIFY);
			}
			await repository.updateById(id, { lastVisit: new Date() });
			return {
				token: createToken({ id }, TokenTypes.ACCESS),
				refreshToken: createToken({ id }, TokenTypes.REFRESH),
				user: await repository.getById(id),
			};
		} catch (error) {
			const { name } = error as Error;
			if (name && name === 'TokenExpiredError') {
				throw new ValidationError(CODE_ERRORS.TOKEN_EXPIRED);
			} else if (name && name === 'JsonWebTokenError') {
				throw new ValidationError(CODE_ERRORS.TOKEN_INVALID);
			}
			throw new Error((error as Error)?.message);
		}
	}

	async forgotPassword({ email }: { email: string }) {
		const repository = getCustomRepository(this.userRepository);
		const user = await repository.getByEmail(email);
		if (!user) {
			throw new ValidationError(CODE_ERRORS.EMAIL_NOT_EXIST(email));
		}
		const resetToken = createToken({ id: user.id }, TokenTypes.RESET);
		await repository.updateById(user.id, { resetToken });
		await mailer.forgotPassword(user.email, {
			name: user?.name ?? 'user',
			link: createLinkResetPassword(resetToken),
		});
		return { message: 'success' };
	}

	async resetPassword({ token, password }: { token: string; password: string }) {
		const { id } = verifyToken(token, TokenTypes.RESET);
		const repository = getCustomRepository(this.userRepository);
		const user = await repository.getByToken(token);
		if (!user || user.id !== id) {
			throw new ValidationError(CODE_ERRORS.USER_NOT_EXIST);
		}
		await repository.updateById(user.id, { password: await encrypt(password), resetToken: undefined });
		return { message: 'success' };
	}
}
