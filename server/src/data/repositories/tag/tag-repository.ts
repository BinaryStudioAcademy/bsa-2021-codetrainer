import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../../models';
import { AbstractRepository } from '../abstract';

@EntityRepository(Tag)
export class TagRepository extends AbstractRepository<Tag> {
	getAll() {
		return this.createQueryBuilder('tag')
			.leftJoinAndSelect('tag.tasks', 'tasks')
			.select(['tag.name AS name'])
			.addSelect('Count(tasks)', 'numberOfTasks')
			.orderBy('name', 'ASC')
			.groupBy('tag.id')
			.getRawMany();
	}

	getByKey(value: string, key: string) {
		return this.createQueryBuilder('tag').where(`tag.${key} = :value`, { value }).getOne();
	}
}
