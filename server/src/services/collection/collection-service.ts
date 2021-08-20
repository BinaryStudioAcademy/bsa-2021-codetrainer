import { getCustomRepository } from 'typeorm';
import { TCollectionRepository, Collection, TUserRepository, User } from '../../data';

export class CollectionService {
	protected collectionRepository: TCollectionRepository;

	protected userRepository: TUserRepository;

	constructor({ collection, user }: { collection: TCollectionRepository; user: TUserRepository }) {
		this.userRepository = user;
		this.collectionRepository = collection;
	}

	async getCollections() {
		const repository = getCustomRepository(this.collectionRepository);
		const collection = await repository.getAll();
		return collection;
	}

	async getCollectionById(id: string) {
		const repository = getCustomRepository(this.collectionRepository);
		const collection = await repository.getById(id);
		return collection;
	}

	// async updateCollectionById(id: string, data: Partial<Collection>) {
	// 	const repository = getCustomRepository(this.collectionRepository);
	// 	const collection = await repository.updateById(id, data);
	// 	return collection;
	// }

	async addTaskToCollection() {}

	async removeTaskFromCollection() {}

	async createEmptyCollection(user: User, name: { name: string }) {
		const repository = getCustomRepository(this.collectionRepository);
		const newCollection = await repository.save({ ...name, tasks: [], author: user });
		return newCollection;
	}

	async deleteCollection(id: string) {
		const repository = getCustomRepository(this.collectionRepository);
		const collection = await repository.deleteById(id);
		return collection;
	}
}
