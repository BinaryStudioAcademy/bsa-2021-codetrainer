import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user/user-repository';

export class Clan1629127864665 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{
				name: 'PostClan',
				members: [
					{
						...getCustomRepository(UserRepository).getByEmail('test@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('timesofgrace@test.com'),
						profileClan: { role: 'member' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('panopticon@test.com'),
						profileClan: { role: 'member' },
					},
				],
			},
			{
				name: 'TheEndOfMath',
				members: [
					{
						...getCustomRepository(UserRepository).getByEmail('converge@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('haveanicelife@test.com'),
						profileClan: { role: 'member' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('notconverge@test.com'),
						profileClan: { role: 'member' },
					},
				],
			},
			{
				name: 'Roundabout',
				members: [
					{
						...getCustomRepository(UserRepository).getByEmail('anima@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('spikytree@test.com'),
						profileClan: { role: 'member' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('shellac@test.com'),
						profileClan: { role: 'member' },
					},
				],
			},
			{
				name: 'Streetcleaners',
				members: [
					{
						...getCustomRepository(UserRepository).getByEmail('thejesu@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('perfectcircle@test.com'),
						profileClan: { role: 'member' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('ascensionpt2@test.com'),
						profileClan: { role: 'member' },
					},
				],
			},
			{
				name: 'ExNoi',
				members: [
					{
						...getCustomRepository(UserRepository).getByEmail('pcisagoodidea@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('mouthbreather@test.com'),
						profileClan: { role: 'member' },
					},
					{
						...getCustomRepository(UserRepository).getByEmail('evol@test.com'),
						profileClan: { role: 'member' },
					},
				],
			},
		];

		await getRepository('Clan').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
