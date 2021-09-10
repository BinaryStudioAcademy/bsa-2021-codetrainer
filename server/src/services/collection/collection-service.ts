import { getCustomRepository } from 'typeorm';
import { TCollectionRepository, TUserRepository, User } from '../../data';
import { ValidationError } from '../../helpers';
import { CODE_ERRORS } from '../../common';

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

	async getAuthoredCollections({ authorId, skip, take }: { authorId: string; skip: number; take: number }) {
		const repository = getCustomRepository(this.collectionRepository);
		const [collections, total] = await repository.findAndCount({
			relations: ['author', 'tasks'],
			where: {
				author: {
					id: authorId,
				},
			},
			order: {
				createdAt: 'DESC',
			},
			skip,
			take,
		});
		return {
			collections,
			total,
		};
	}

	async getFollowedCollections({ followerId, skip, take }: { followerId: string; skip: number; take: number }) {
		const repository = getCustomRepository(this.collectionRepository);
		const [collections, total] = await repository
			.createQueryBuilder('collection')
			.innerJoin('collection.followers', 'follower', 'follower.id = :followerId', { followerId })
			.leftJoinAndSelect('collection.author', 'author')
			.leftJoinAndSelect('collection.tasks', 'tasks')
			.orderBy('collection.createdAt', 'DESC')
			.skip(skip)
			.take(take)
			.getManyAndCount();
		return {
			collections,
			total,
		};
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

	async createEmptyCollection(user: User, collection: { name: string }) {
		const repository = getCustomRepository(this.collectionRepository);
		const newCollection = await repository.save({ ...collection, tasks: [], author: user });
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
		console.log(id, ' AND ', taskId);

		const collection = await this.getCollectionById(id);
		console.log(collection);

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
