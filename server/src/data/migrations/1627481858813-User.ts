import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { encrypt } from '../../helpers';

export class User1627481858813 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{ name: 'Jake Blake', email: 'test@test.com', password: await encrypt('123456789') },
			{ name: 'Scott Kelly', email: 'timesofgrace@test.com', password: await encrypt('soulsat0') },
			{ name: 'Aaron Turner', email: 'panopticon@test.com', password: await encrypt('1000shards') },
			{ name: 'Giles Corey', email: 'haveanicelife@test.com', password: await encrypt('hfs40000') },
			{ name: 'Jane Doe', email: 'converge@test.com', password: await encrypt('01colon20') },
			{ name: 'John Doe', email: 'notconverge@test.com', password: await encrypt('12345qwert') },
			{ name: 'Thom Yorke', email: 'anima@test.com', password: await encrypt('how2disappear') },
			{ name: 'Steven Wilson', email: 'spikytree@test.com', password: await encrypt('fearof098') },
			{ name: 'Steve Albini', email: 'shellac@test.com', password: await encrypt('the1000hz') },
			{ name: 'Justin Broadrick', email: 'thejesu@test.com', password: await encrypt('1991street') },
			{ name: 'Maynard Keenan', email: 'perfectcircle@test.com', password: await encrypt('fortysixn2') },
			{ name: 'Glenn Branca', email: 'ascensionpt2@test.com', password: await encrypt('no1lesson') },
			{ name: 'David Yow', email: 'mouthbreather@test.com', password: await encrypt('goatof1991') },
			{ name: 'Michael Gira', email: 'pcisagoodidea@test.com', password: await encrypt('93aveblue') },
			{ name: 'Kim Gordon', email: 'evol@test.com', password: await encrypt('daydreamnation') },
		];

		await getRepository('User').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
