import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { encrypt } from '../../helpers';

export class User1627481858813 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [{ name: 'Super User', email: 'test@test.com', password: await encrypt('123') }];
		await getRepository('User').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
