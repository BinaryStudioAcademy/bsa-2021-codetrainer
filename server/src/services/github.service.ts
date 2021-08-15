import { getCustomRepository } from 'typeorm';
import axios from 'axios';
import { User, UserRepository } from '../data';
import { AuthService } from './auth';

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

	async githubAccountExists(githubId: string): Promise<boolean> {
		try {
			await axios.get(`https://api.github.com/user/${githubId}`);
			return true;
		} catch {
			return false;
		}
	}

	async getUserByGithubId(githubId: string): Promise<User | undefined> {
		return this.usersRepository.getByGithubId(githubId);
	}

	async registerFromGithub({ githubId, email, username }: { githubId: string; email: string; username: string }) {
		const newUser: Omit<User, 'id'> = {
			githubId,
			email,
			username,
			name: username,
			surname: '',
		} as User;
		return this.authService.register(newUser);
	}

	async linkUserToGithub(userId: string, githubId?: string): Promise<void> {
		await this.usersRepository.update(userId, {
			githubId,
		});
	}
}
