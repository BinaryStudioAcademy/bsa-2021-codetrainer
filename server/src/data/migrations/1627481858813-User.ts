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
				rank: 5,
				honor: 1027,
			},
			{
				username: 'ScottKelly',
				name: 'Scott',
				surname: 'Kelly',
				email: 'timesofgrace@test.com',
				password: await encrypt('soulsat0'),
				rank: 2,
				honor: 23738,
				skills: ['Networking and wireless', 'Cloud computing', 'Java', 'Kotlin', 'JavaScript'],
				devLevel: 'middle',
				avatar: 'https://robohash.org/honey?set=set1',
			},
			{
				username: 'AaronTurner',
				name: 'Aaron',
				surname: 'Turner',
				email: 'panopticon@test.com',
				password: await encrypt('1000shards'),
				rank: 3,
				honor: 7442,
				skills: ['IT service management', 'Cybersecurity', 'Scala', 'Swift'],
				devLevel: 'senior',
				avatar: 'https://robohash.org/honey?set=set2',
			},
			{
				username: 'GilesCorey',
				name: 'Giles',
				surname: 'Corey',
				email: 'haveanicelife@test.com',
				password: await encrypt('hfs40000'),
				rank: 7,
				honor: 136,
				skills: ['Programming', 'C#', 'Ruby'],
				devLevel: 'junior',
				avatar: 'https://robohash.org/honey?set=set3',
			},
			{
				username: 'JaneDoe',
				name: 'Jane',
				surname: 'Doe',
				email: 'converge@test.com',
				password: await encrypt('01colon20'),
				honor: 37462,
				rank: 1,
				skills: ['Game development', 'Virtualization', 'C#', 'C++', 'Kotlin', 'Objective-C', 'TypeScript'],
				devLevel: 'middle',
				avatar: 'https://robohash.org/honey?set=set4',
			},
			{
				username: 'JohnDoe',
				name: 'John',
				surname: 'Doe',
				email: 'notconverge@test.com',
				password: await encrypt('12345qwert'),
				honor: 38405,
				rank: 1,
				skills: ['Mobile development', 'Kotlin', 'Swift', 'JavaScript'],
				devLevel: 'senior',
				avatar: 'https://robohash.org/honey?set=set5',
			},
			{
				username: 'ThomYorke',
				name: 'Thom',
				surname: 'Yorke',
				email: 'anima@test.com',
				password: await encrypt('how2disappear'),
				rank: 4,
				honor: 2873,
				skills: ['Programming', 'Cloud computing', 'PHP', 'C', 'Java', 'Kotlin', 'SQL'],
				devLevel: 'junior',
				avatar: 'https://robohash.org/honey?set=set6',
			},
			{
				username: 'StevenWilson',
				name: 'Steven',
				surname: 'Wilson',
				email: 'spikytree@test.com',
				password: await encrypt('fearof098'),
				rank: 6,
				honor: 458,
				skills: ['Programming', 'SQL', 'PHP', 'Scala'],
				devLevel: 'junior',
				avatar: 'https://robohash.org/honey?set=set2',
			},
			{
				username: 'SteveAlbini',
				name: 'Steve',
				surname: 'Albini',
				email: 'shellac@test.com',
				password: await encrypt('the1000hz'),
				rank: 8,
				honor: 56,
				skills: ['Programming', 'JavaScrip'],
				devLevel: 'trainee',
				avatar: 'https://robohash.org/honey?set=set3',
			},
			{
				username: 'JustinBroadrick',
				name: 'Justin',
				surname: 'Broadrick',
				email: 'thejesu@test.com',
				password: await encrypt('1991street'),
				rank: 9,
				honor: 4,
				devLevel: 'trainee',
				avatar: 'https://robohash.org/honey?set=set4',
			},
			{
				username: 'MaynardKeenan',
				name: 'Maynard',
				surname: 'Keenan',
				email: 'perfectcircle@test.com',
				password: await encrypt('fortysixn2'),
				rank: 4,
				honor: 3114,
				skills: ['Cloud computing', 'Programming', 'Ruby', 'JavaScript'],
				devLevel: 'middle',
				avatar: 'https://robohash.org/honey?set=set5',
			},
			{
				username: 'GlennBranca',
				name: 'Glenn',
				surname: 'Branca',
				email: 'ascensionpt2@test.com',
				password: await encrypt('no1lesson'),
				rank: 6,
				honor: 592,
				skills: ['Cloud computing', 'SQL', 'C++', 'Scala', 'Kotlin', 'Java'],
				devLevel: 'junior',
				avatar: 'https://robohash.org/honey?set=set11',
			},
			{
				username: 'DavidYow',
				name: 'David',
				surname: 'Yow',
				email: 'mouthbreather@test.com',
				password: await encrypt('goatof1991'),
				rank: 2,
				honor: 22214,
				skills: ['Programming', 'Networking and wireless', 'Java', 'Objective-C', 'Swift', 'C#'],
				devLevel: 'senior',
				avatar: 'https://robohash.org/honey?set=set12',
			},
			{
				username: 'MichaelGira',
				name: 'Michael',
				surname: 'Gira',
				email: 'pcisagoodidea@test.com',
				password: await encrypt('93aveblue'),
				rank: 3,
				honor: 9306,
				skills: ['AI and machine learning', 'Python', 'Java', 'C#', 'TypeScript'],
				devLevel: 'middle',
				avatar: 'https://robohash.org/honey?set=set13',
			},
			{
				username: 'KimGordon',
				name: 'Kim',
				surname: 'Gordon',
				email: 'evol@test.com',
				password: await encrypt('daydreamnation'),
				rank: 9,
				honor: 18,
				avatar: 'https://robohash.org/honey?set=set14',
			},
			{
				username: 'taras-dubyk',
				name: 'Taras',
				surname: 'Dubyk',
				email: 'taras@test.com',
				password: await encrypt('12345678'),
				avatar: 'https://codetrainer-images.s3.amazonaws.com/d99013c8-720c-470b-a9c6-7f95806b1e7e.jpg',
				rank: 5,
				honor: 1073,
			},
			{
				username: 'kyrylo-burmelov',
				name: 'Kyrylo',
				surname: 'Burmelov',
				email: 'kyrylo@test.com',
				password: await encrypt('12345678'),
				avatar: 'https://codetrainer-images.s3.amazonaws.com/217621a1-8020-4998-8f66-298d0143eaa1.jpeg',
				rank: 5,
				honor: 1124,
			},
			{
				username: 'myroslav',
				name: 'Myroslav',
				surname: 'Druchkiv',
				email: 'myroslav@test.com',
				password: await encrypt('12345678'),
				avatar: 'https://codetrainer-images.s3.amazonaws.com/4c48d8e8-8406-4ab2-ba81-5a902547cc60.png',
				rank: 3,
				honor: 2568,
			},
		];

		await getRepository('User').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
