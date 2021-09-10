import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user/user-repository';

export class Clan1629127864665 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{
				name: 'PostTimeClan',
				members: [
					{
						... await getCustomRepository(UserRepository).getByEmail('test@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('timesofgrace@test.com'),
						profileClan: { role: 'member' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('panopticon@test.com'),
						profileClan: { role: 'member' },
					},
				],
				maxMembers: 20,
				numberOfMembers: 3,
			},
			{
				name: 'TheEndOfMathNow',
				members: [
					{
						... await getCustomRepository(UserRepository).getByEmail('converge@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('haveanicelife@test.com'),
						profileClan: { role: 'member' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('notconverge@test.com'),
						profileClan: { role: 'member' },
					},
				],
				maxMembers: 20,
				numberOfMembers: 3,
			},
			{
				name: 'RoundaboutClan',
				members: [
					{
						... await getCustomRepository(UserRepository).getByEmail('anima@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('spikytree@test.com'),
						profileClan: { role: 'member' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('shellac@test.com'),
						profileClan: { role: 'member' },
					},
				],
				maxMembers: 20,
				numberOfMembers: 3,
			},
			{
				name: 'StreetClan',
				members: [
					{
						... await getCustomRepository(UserRepository).getByEmail('thejesu@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('perfectcircle@test.com'),
						profileClan: { role: 'member' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('ascensionpt2@test.com'),
						profileClan: { role: 'member' },
					},
				],
				maxMembers: 20,
				numberOfMembers: 3,
			},
			{
				name: 'ExNoiAfter',
				members: [
					{
						... await getCustomRepository(UserRepository).getByEmail('pcisagoodidea@test.com'),
						profileClan: { role: 'admin' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('mouthbreather@test.com'),
						profileClan: { role: 'member' },
					},
					{
						... await getCustomRepository(UserRepository).getByEmail('evol@test.com'),
						profileClan: { role: 'member' },
					},
				],
				maxMembers: 20,
				numberOfMembers: 3,
			},
		];

		await getRepository('Clan').save(exampleData);
		
		const usersWithClanProfiles = exampleData
			.map(clan => clan.members)
			.reduce((cur, acc) => acc.concat(cur), []);

		await getRepository('User').save(usersWithClanProfiles);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
