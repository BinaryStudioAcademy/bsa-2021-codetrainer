import { getCustomRepository, getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { SOLUTION_STATUS } from '../../common/constants';
import { Solution } from '../models';
import { UserRepository, TaskRepository } from '../repositories';

export class Solutions1630081543408 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const usersRepository = getCustomRepository(UserRepository);
		const tasksRepository = getCustomRepository(TaskRepository);

		const solutionsSeeds: Partial<Solution>[] = await Promise.all(
			[
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Sum All Numbers in a Range',
					code: `function sumAll([a, b]) {\n  return (a + b) * (Math.abs(b - a) + 1) / 2;\n}`,
					user: 'JohnDoe',
				},
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Diff Two Arrays',
					code: `function diff(a, b) {\n  return [\n  ...a.filter(item => !b.includes(item))\n  ...b.filter(item => !a.includes(item))\n  ];\n}`,
					user: 'JohnDoe',
				},
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Seek and Destroy',
					code: `function seekAndDestroy(arr, ...blacklist) {\n  return arr.filter(item => !blacklist.includes(item))\n}`,
					user: 'JohnDoe',
				},
				{
					status: SOLUTION_STATUS.NOT_COMPLETED,
					task: 'Wherefore art thou',
					code: `function find(arr, where) {\n  const filters = Array.from(Object.entries(where));\n  return arr.filter(item => filters.every(([key, value]) => item[key] == value));\n}`,
					user: 'JaneDoe',
				},
			].map(async ({ task, user, ...solution }) => ({
				...solution,
				task: await tasksRepository.findOne({ name: task }),
				user: await usersRepository.getByUsername(user),
			})),
		);

		getRepository(Solution).save(solutionsSeeds);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
