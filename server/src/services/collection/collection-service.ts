import { getCustomRepository } from 'typeorm';
import { TCollectionRepository, Collection } from '../../data';

export class CollectionService {
	protected collectionRepository: TCollectionRepository;

	constructor({ collection }: { collection: TCollectionRepository }) {
		this.collectionRepository = collection;
	}

	async getCollectionById(id: string) {
		const repository = getCustomRepository(this.collectionRepository);

		const collection = await repository.getById(id);
		return collection;
	}

	async getCollectionByName(name: string) {
		const repository = getCustomRepository(this.collectionRepository);

		const collection = await repository.getByName(name);
		return collection;
	}

	async updateCollectionById(id: string, data: Partial<Collection>) {
		const repository = getCustomRepository(this.collectionRepository);

		const collection = await repository.updateById(id, data);
		return collection;
	}

	async createCollection(data: Partial<Collection>) {
		const repository = getCustomRepository(this.collectionRepository);

		const collection = await repository.createItem(data);
		return collection;
	}

	async deleteCollection(id: string) {
		const repository = getCustomRepository(this.collectionRepository);

		const collection = await repository.deleteById(id);
		return collection;
	}
}
