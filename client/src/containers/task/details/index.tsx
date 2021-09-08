import { FullscreenLoader } from 'components';
import { DetailsTab } from 'components/pages';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import * as actions from '../logic/actions';

export const Details = () => {
	const task = useSelector((state: IRootState) => state.taskInfo.task);
	const dispatch = useDispatch();
	const similarTasks = useSelector((state: IRootState) => state.taskInfo.similarTasks);

	useEffect(() => {
		if (task) {
			dispatch(actions.getTasks({ rank: task.rank, id: task.id }));
		}
	}, [task]);

	const tasks = similarTasks?.map((task) => {
		return {
			id: task.id,
			linkToTask: `${ROUTES.TaskInfo}/${task.id}`,
			author: {
				firstName: task?.user?.name || '',
				lastName: task?.user?.surname || '',
				username: task?.user?.username || '',
			},
			stats: {
				favoriteSaves: task.savedToFavorites,
				positiveFeedback: task.positiveFeedback,
			},
			title: task.name,
			rank: task.rank,
			tags: task.tags.map((item) => item.name),
		};
	});

	const handleUpdateTaskFavoriteStatus = (id: string) => {
		console.log('TASK TO UPDATE:', id);
	};

	if (task) {
		return <DetailsTab task={task} tasks={tasks} updateTaskFavoriteStatus={handleUpdateTaskFavoriteStatus} />;
	}

	return <FullscreenLoader />;
};
