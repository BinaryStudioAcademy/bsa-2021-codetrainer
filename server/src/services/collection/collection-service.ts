import { getCustomRepository } from 'typeorm';
import { TCollectionRepository, Collection, TUserRepository, User, Task } from '../../data';
import { ValidationError } from '../../helpers';
import { CLAN_IS_PUBLIC, CLAN_MAX_MEMBERS, CLAN_MEMBER_ROLE, CLAN_MEMBER_STATUS, CODE_ERRORS } from '../../common';

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

	async addTaskToCollection(id: string, taskId: string) {
		const repository = getCustomRepository(this.collectionRepository);
		const collection = await repository.addTask(id, taskId);
		return collection;
	}

	async removeTaskFromCollection(id: string, taskId: string) {
		const repository = getCustomRepository(this.collectionRepository);
		const collection = await repository.removeTask(id, taskId);
		return collection;
	}

	async manageTaskInsideCollection(id: string, taskId: string) {
		const collection = await this.getCollectionById(id);

		if (!collection) {
			throw new ValidationError(CODE_ERRORS.CLAN_NOT_EXIST(id));
		}

		const existingTask = collection.tasks.find((task) => task.id === taskId);

		if (existingTask) {
			await this.removeTaskFromCollection(id, taskId);
		} else {
			await this.addTaskToCollection(id, taskId);
		}
	}
}
