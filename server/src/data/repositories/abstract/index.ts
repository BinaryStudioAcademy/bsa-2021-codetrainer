import { Repository } from 'typeorm';

export class AbstractRepository<T> extends Repository<T> {
	deleteById(id: string) {
		return this.createQueryBuilder().delete().where('id = :id', { id }).execute();
	}
}
