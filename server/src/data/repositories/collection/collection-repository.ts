import { EntityRepository, Repository } from 'typeorm';
import { Collection } from '../../models';
import { AbstractRepository } from '../abstract';

@EntityRepository(Collection)
export class CollectionRepository extends AbstractRepository<Collection> {
	getByName(name: string) {
		return this.findOne({ name });
	}

	getById(id: string) {
		return this.createQueryBuilder('collection')
			.leftJoinAndSelect('collection.tasks', 'task')
			.where('collection.id = :id', { id })
			.getOne();
	}

	createItem(data: Partial<Collection>) {
		return this.save(data);
	}

	updateById(id: string, data: Partial<Collection>) {
		return this.update({ id }, data);
	}

	deleteTask(id: string, taskId: string) {
		return this.createQueryBuilder('collection').relation('tasks').of(id).remove(taskId);
	}

	addTask(id: string, taskId: string) {
		return this.createQueryBuilder('collection').relation('tasks').of(id).add(taskId);
	}

	deleteById(id: string) {
		return this.createQueryBuilder().delete().where('id = :id', { id }).execute();
	}
}
