import { WebApi } from 'typings/webapi';
import { getProfile } from 'services/github.service';
import { IUser } from 'typings/common/IUser';

export async function mapUserResponseToUser(user: WebApi.Entities.IUser): Promise<IUser> {
	try {
		const githubProfile = user.githubId ? await getProfile(user.githubId) : undefined;
		return {
			...user,
			github: githubProfile,
		};
	} catch {
		return user;
	}
}
