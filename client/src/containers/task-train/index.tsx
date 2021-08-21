import React, { useEffect } from 'react';
// import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { TaskTrainPage } from 'components/pages';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/useAppSelector';
import * as actions from './logic/actions';
import { FullscreenLoader } from 'components';

const TaskTrain = () => {
	const { id: taskId }: { id: string } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const task = useAppSelector((state) => state.task.task);
	const solution = useAppSelector((state) => state.task.solution);
	const hasFetched = useAppSelector((state) => state.task.hasFetched);

	useEffect(() => {
		dispatch(actions.fetchTask({ id: taskId }));
		dispatch(actions.fetchSolution({ taskId }));
	}, []);

	const onSubmit = (code: string) => {
		if (!task) {
			return;
		}

		dispatch(actions.submitSolution({ taskId: task.id, code }));
	};

	if (!hasFetched) {
		return <FullscreenLoader />;
	}

	if (hasFetched && !task) {
		history.push('/home');
	}

	return task && <TaskTrainPage task={task} solution={solution} onSubmit={onSubmit} />;
};

export default TaskTrain;
