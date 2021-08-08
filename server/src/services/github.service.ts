import { getCustomRepository } from 'typeorm';
import { generate, GenerateOptions } from 'generate-password';
import { User } from '../data/models';
import { UserRepository } from '../data';
import { Auth as AuthService } from './auth';
import { IUserFields } from '../types';
import { IGithubProfile, mapGithubProfileToUserFields } from '../helpers';

const passwordGeneratorOptions: GenerateOptions = {
	length: 16,
	numbers: true,
	lowercase: true,
	uppercase: true,
	strict: true,
};

export class GithubService {
	protected authService: AuthService;

	protected usersRepositoryType: typeof UserRepository;

	protected get usersRepository(): UserRepository {
		return getCustomRepository(this.usersRepositoryType);
	}

	constructor({ authService, userRepository }: { authService: AuthService; userRepository: typeof UserRepository }) {
		this.authService = authService;
		this.usersRepositoryType = userRepository;
	}

	async getUserByGithubId(githubId: string): Promise<User | undefined> {
		return this.usersRepository.getByGithubId(githubId);
	}

	async registerUserFromGithubProfile(profile: IGithubProfile) {
		// user don't know password, but it's possible to sign in by github or recover password
		const newUser: Omit<IUserFields, 'id'> = {
			password: generate(passwordGeneratorOptions),
			...mapGithubProfileToUserFields(profile),
		};
		return this.authService.register(newUser);
	}

	async linkUserToGithub(userId: string, githubId?: string): Promise<void> {
		await this.usersRepository.update(userId, {
			githubId,
		});
	}
}
