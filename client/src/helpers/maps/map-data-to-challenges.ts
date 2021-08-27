import { IChallenge } from 'components/common/challenge/types';
import { ROUTES } from 'constants/routes';
import { WebApi } from 'typings/webapi';

export const mapDataToChallenges = (task: WebApi.Entities.IChallenge): IChallenge => ({
	id: task.id,
	title: task.name,
	rank: task.rank,
	tags: task.tags.map((tag) => tag.name),
	linkToTask: `${ROUTES.TaskInfo}/${task.id}`,
	author: {
		firstName: task?.user?.name || '',
		lastName: task?.user?.surname || '',
		link: `${ROUTES.Users}/${task.user?.username}`,
	},
	stats: {
		favoriteSaves: task.savedToFavorites,
		positiveFeedback: task.positiveFeedback,
	},
});
