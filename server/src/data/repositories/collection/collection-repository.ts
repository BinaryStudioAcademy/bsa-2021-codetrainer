import { EntityRepository, Repository } from 'typeorm';
import { Collection } from '../../models';
import { AbstractRepository } from '../abstract';

@EntityRepository(Collection)
export class CollectionRepository extends AbstractRepository<Collection> {
	collectionFields = [
		'collection.id',
		'collection.name',
		'collection.author',
		'collection.followers',
		'collection.avatar',
	];

	getAll() {
		return this.createQueryBuilder('collection').getMany();
	}

	getById(id: string) {
		return this.createQueryBuilder('collection').where('collection.id = :id', { id }).getOne();
	}

	deleteById(id: string) {
		return this.createQueryBuilder().delete().where('id = :id', { id }).execute();
	}

	// updateById(id: string, data: Partial<Collection>) {
	// 	return this.update({ id }, data);
	// }

	removeTask(id: string, taskId: string) {
		return this.createQueryBuilder('collection').relation('tasks').of(id).remove(taskId);
	}

	addTask(id: string, taskId: string) {
		return this.createQueryBuilder('collection').relation('tasks').of(id).add(taskId);
	}
}
