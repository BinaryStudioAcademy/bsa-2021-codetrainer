import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { encrypt } from '../../helpers';

export class User1627481858813 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{
				name: 'Jake',
				surname: 'Blake',
				email: 'test@test.com',
				password: await encrypt('123456789'),
			},
			{
				name: 'Scott',
				surname: 'Kelly',
				email: 'timesofgrace@test.com',
				password: await encrypt('soulsat0'),
			},
			{
				name: 'Aaron',
				surname: 'Turner',
				email: 'panopticon@test.com',
				password: await encrypt('1000shards'),
			},
			{
				name: 'Giles',
				surname: 'Corey',
				email: 'haveanicelife@test.com',
				password: await encrypt('hfs40000'),
			},
			{
				name: 'Jane',
				surname: 'Doe',
				email: 'converge@test.com',
				password: await encrypt('01colon20'),
			},
			{
				name: 'John',
				surname: 'Doe',
				email: 'notconverge@test.com',
				password: await encrypt('12345qwert'),
			},
			{
				name: 'Thom',
				surname: 'Yorke',
				email: 'anima@test.com',
				password: await encrypt('how2disappear'),
			},
			{
				name: 'Steven',
				surname: 'Wilson',
				email: 'spikytree@test.com',
				password: await encrypt('fearof098'),
			},
			{
				name: 'Steve',
				surname: 'Albini',
				email: 'shellac@test.com',
				password: await encrypt('the1000hz'),
			},
			{
				name: 'Justin',
				surname: 'Broadrick',
				email: 'thejesu@test.com',
				password: await encrypt('1991street'),
			},
			{
				name: 'Maynard',
				surname: 'Keenan',
				email: 'perfectcircle@test.com',
				password: await encrypt('fortysixn2'),
			},
			{
				name: 'Glenn',
				surname: 'Branca',
				email: 'ascensionpt2@test.com',
				password: await encrypt('no1lesson'),
			},
			{
				name: 'David',
				surname: 'Yow',
				email: 'mouthbreather@test.com',
				password: await encrypt('goatof1991'),
			},
			{
				name: 'Michael',
				surname: 'Gira',
				email: 'pcisagoodidea@test.com',
				password: await encrypt('93aveblue'),
			},
			{
				name: 'Kim',
				surname: 'Gordon',
				email: 'evol@test.com',
				password: await encrypt('daydreamnation'),
			},
		];

		await getRepository('User').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
