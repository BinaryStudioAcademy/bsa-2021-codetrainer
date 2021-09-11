import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user/user-repository';

export class Clan1629127864665 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{
				name: 'HardCoders',
				description: 'Computers are fast; programmers keep it slow.',
				members: [
					{
						...(await getCustomRepository(UserRepository).getByEmail('test@test.com')),
						profileClan: { role: 'admin' },
					},
					{
						...(await getCustomRepository(UserRepository).getByEmail('timesofgrace@test.com')),
						profileClan: { role: 'member' },
					},
					{
						...(await getCustomRepository(UserRepository).getByEmail('panopticon@test.com')),
						profileClan: { role: 'member' },
					},
				],
				maxMembers: 100,
				numberOfMembers: 3,
				avatar: 'https://codetrainer-images.s3.amazonaws.com/d9f7e38c-0b97-441e-9e4c-83592a32af7e.jpg',
				cover: 'https://codetrainer-images.s3.amazonaws.com/3727c8e3-a5d3-44e5-9d93-27a3d16a2366.jpg',
			},
			{
				name: 'Binarians',
				description: 'It works on my machine.',
				members: [
					{
						...(await getCustomRepository(UserRepository).getByEmail('taras@test.com')),
						profileClan: { role: 'admin' },
					},
					{
						...(await getCustomRepository(UserRepository).getByEmail('kyrylo@test.com')),
						profileClan: { role: 'member' },
					},
				],
				maxMembers: 150,
				numberOfMembers: 2,
				avatar: 'https://codetrainer-images.s3.amazonaws.com/c3c51943-afc9-4fae-8823-74c3e1b03648.png',
				cover: 'https://codetrainer-images.s3.amazonaws.com/8023f758-4970-48b6-bb16-fcbb1ba91dcb.png',
			},
			{
				name: 'Linux lovers',
				description: 'UNIX is user friendly. It’s just very particular about who its friends are.',
				members: [
					{
						...(await getCustomRepository(UserRepository).getByEmail('anima@test.com')),
						profileClan: { role: 'admin' },
					},
					{
						...(await getCustomRepository(UserRepository).getByEmail('spikytree@test.com')),
						profileClan: { role: 'member' },
					},
					{
						...(await getCustomRepository(UserRepository).getByEmail('shellac@test.com')),
						profileClan: { role: 'member' },
					},
					{
						...(await getCustomRepository(UserRepository).getByEmail('perfectcircle@test.com')),
						profileClan: { role: 'member' },
					},
					{
						...(await getCustomRepository(UserRepository).getByEmail('ascensionpt2@test.com')),
						profileClan: { role: 'member' },
					},
				],
				maxMembers: 50,
				numberOfMembers: 5,
				avatar: 'https://codetrainer-images.s3.amazonaws.com/c8e12b06-efb9-446d-8641-9fbf7b17fb63.png',
				cover: 'https://codetrainer-images.s3.amazonaws.com/6b45bbed-4ef5-4ecb-9f61-a255129d91cb.jpg',
			},
		];

		await getRepository('Clan').save(exampleData);

		const usersWithClanProfiles = exampleData.map((clan) => clan.members).reduce((cur, acc) => acc.concat(cur), []);

		await getRepository('User').save(usersWithClanProfiles);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
