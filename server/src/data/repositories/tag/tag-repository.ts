import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../../models';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
	getAll() {
		return this.createQueryBuilder('tag')
			.leftJoinAndSelect('tag.tasks', 'tasks')
			.select(['tag'])
			.addSelect('Count(tasks)', 'taskCount')
			.groupBy('tag.id')
			.getRawMany();
	}

	getById(id: string) {
		return this.createQueryBuilder('tag').where('tag.id = :id', { id }).getOne();
	}
}
