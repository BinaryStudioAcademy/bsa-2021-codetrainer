import { EntityRepository } from 'typeorm';
import { Community } from '../../models';
import { AbstractRepository } from '../abstract';

@EntityRepository(Community)
export class CommunityRepository extends AbstractRepository<Community> {
	async getCommunityByUser(userId: string) {
		const communityUsers = await this.createQueryBuilder('community')
			.leftJoinAndSelect('community.firstUser', 'firstUser')
			.leftJoinAndSelect('community.secondUser', 'secondUser')
			.where('community.firstUser.id = :firstUserId OR community.secondUser.id = :secondUserId', {
				firstUserId: userId,
				secondUserId: userId,
			})
			.getMany();

		const result = communityUsers.map((item) => {
			const user = item.firstUser.id === userId ? item.secondUser : item.firstUser;
			return user;
		});

		return result;
	}
}
