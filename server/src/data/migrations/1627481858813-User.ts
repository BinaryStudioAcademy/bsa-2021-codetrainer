import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { encrypt } from '../../helpers';

export class User1627481858813 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{
				username: 'JakeBlake',
				name: 'Jake',
				surname: 'Blake',
				email: 'test@test.com',
				password: await encrypt('123456789'),
			},
			{
				username: 'ScottKelly',
				name: 'Scott',
				surname: 'Kelly',
				email: 'timesofgrace@test.com',
				password: await encrypt('soulsat0'),
			},
			{
				username: 'AaronTurner',
				name: 'Aaron',
				surname: 'Turner',
				email: 'panopticon@test.com',
				password: await encrypt('1000shards'),
			},
			{
				username: 'GilesCorey',
				name: 'Giles',
				surname: 'Corey',
				email: 'haveanicelife@test.com',
				password: await encrypt('hfs40000'),
			},
			{
				username: 'JaneDoe',
				name: 'Jane',
				surname: 'Doe',
				email: 'converge@test.com',
				password: await encrypt('01colon20'),
			},
			{
				username: 'JohnDoe',
				name: 'John',
				surname: 'Doe',
				email: 'notconverge@test.com',
				password: await encrypt('12345qwert'),
			},
			{
				username: 'ThomYorke',
				name: 'Thom',
				surname: 'Yorke',
				email: 'anima@test.com',
				password: await encrypt('how2disappear'),
			},
			{
				username: 'StevenWilson',
				name: 'Steven',
				surname: 'Wilson',
				email: 'spikytree@test.com',
				password: await encrypt('fearof098'),
			},
			{
				username: 'SteveAlbini',
				name: 'Steve',
				surname: 'Albini',
				email: 'shellac@test.com',
				password: await encrypt('the1000hz'),
			},
			{
				username: 'JustinBroadrick',
				name: 'Justin',
				surname: 'Broadrick',
				email: 'thejesu@test.com',
				password: await encrypt('1991street'),
			},
			{
				username: 'MaynardKeenan',
				name: 'Maynard',
				surname: 'Keenan',
				email: 'perfectcircle@test.com',
				password: await encrypt('fortysixn2'),
			},
			{
				username: 'GlennBranca',
				name: 'Glenn',
				surname: 'Branca',
				email: 'ascensionpt2@test.com',
				password: await encrypt('no1lesson'),
			},
			{
				username: 'DavidYow',
				name: 'David',
				surname: 'Yow',
				email: 'mouthbreather@test.com',
				password: await encrypt('goatof1991'),
			},
			{
				username: 'MichaelGira',
				name: 'Michael',
				surname: 'Gira',
				email: 'pcisagoodidea@test.com',
				password: await encrypt('93aveblue'),
			},
			{
				username: 'KimGordon',
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
