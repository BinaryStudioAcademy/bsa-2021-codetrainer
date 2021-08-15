import { WebApi } from 'typings/webapi';
import { getProfile } from 'services/github.service';
import { IUser } from 'typings/common/IUser';

export async function mapUserResponseToUser({ githubId, ...remains }: WebApi.Entities.IUser): Promise<IUser> {
	try {
		const githubProfile = githubId ? await getProfile(githubId) : undefined;
		return {
			...remains,
			github: githubProfile,
		};
	} catch {
		return {
			...remains,
		};
	}
}
