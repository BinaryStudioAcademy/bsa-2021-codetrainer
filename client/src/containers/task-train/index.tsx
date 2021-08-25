import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TaskTrainPage } from 'components/pages';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/useAppSelector';
import * as actions from './logic/actions';
import { FullscreenLoader } from 'components';
import { socket } from 'services/socket';
import { SOCKET_EVENTS } from 'constants/socket-constants';
import { IResult } from './logic/state';
import { mapResultToString } from './mapResultToString';

const TaskTrain = () => {
	const { id: taskId }: { id: string } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const { task, solution, hasFetched, result, success } = useAppSelector((state) => state.task);

	useEffect(() => {
		dispatch(actions.fetchTask({ id: taskId }));
		dispatch(actions.fetchSolution({ taskId }));
		socket.on(SOCKET_EVENTS.RESULT_TEST_TO_CLIENT, ({ success, ...result }: IResult & { success: boolean }) => {
			dispatch(actions.setResult({ result, success }));
		});
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

	return (
		task && (
			<TaskTrainPage
				task={task}
				solution={solution}
				result={mapResultToString(result || {})}
				success={success}
				onSubmit={onSubmit}
			/>
		)
	);
};

export default TaskTrain;
