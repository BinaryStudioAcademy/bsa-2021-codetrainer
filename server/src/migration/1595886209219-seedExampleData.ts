import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class seedExampleData1595886209219 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{ name: 'first', text: 'first text' },
			{ name: 'second', text: 'second text' },
		];
		await getRepository('Example').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
