import { Repository, FindConditions } from 'typeorm';

export class AbstractRepository<T> extends Repository<T> {
	deleteById(id: string) {
		return this.createQueryBuilder().delete().where('id = :id', { id }).execute();
	}

	async exists(where: FindConditions<T>): Promise<boolean> {
		return (await this.count({ where })) !== 0;
	}
}
