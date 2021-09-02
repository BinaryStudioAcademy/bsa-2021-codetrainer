import { getCustomRepository } from 'typeorm';
import { TProfileClanRepository, TUserRepository } from '../../data';

export class ProfileClanService {
	protected userRepository: TUserRepository;

	protected profileClanRepository: TProfileClanRepository;

	constructor({ user, profileClan }: { user: TUserRepository; profileClan: TProfileClanRepository }) {
		this.userRepository = user;
		this.profileClanRepository = profileClan;
	}

	async getById(id: string) {
		const repository = getCustomRepository(this.profileClanRepository);
		const result = await repository.getById(id);
		return {
			...result,
		};
	}

    async updateRole(id:string ,role:string){
		const repository = getCustomRepository(this.profileClanRepository);
		const result = await repository.updateById(id,role);
        return {
            ...result
        }
    }
}
