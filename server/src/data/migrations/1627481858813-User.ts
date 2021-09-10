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
				avatar: 'https://codetrainer-images.s3.amazonaws.com/95a327b2-678e-46b3-85b0-8c4245b53223.png',
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
			{
				username: 'taras-dubyk',
				name: 'Taras',
				surname: 'Dubyk',
				email: 'taras@test.com',
				password: await encrypt('12345678'),
				avatar: 'https://codetrainer-images.s3.amazonaws.com/d99013c8-720c-470b-a9c6-7f95806b1e7e.jpg',
			},
			{
				username: 'kyrylo-burmelov',
				name: 'Kyrylo',
				surname: 'Burmelov',
				email: 'kyrylo@test.com',
				password: await encrypt('12345678'),
				avatar: 'https://codetrainer-images.s3.amazonaws.com/217621a1-8020-4998-8f66-298d0143eaa1.jpeg',
			},
			{
				username: 'myroslav',
				name: 'Myroslav',
				surname: 'Druchkiv',
				email: 'myroslav@test.com',
				password: await encrypt('12345678'),
				avatar: 'https://codetrainer-images.s3.amazonaws.com/4c48d8e8-8406-4ab2-ba81-5a902547cc60.png',
			},
		];

		await getRepository('User').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
