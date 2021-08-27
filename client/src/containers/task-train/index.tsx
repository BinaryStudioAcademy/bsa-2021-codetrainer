import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { TaskTrainPage } from 'components/pages';
import { useAppSelector } from 'hooks/useAppSelector';
import * as actions from './logic/actions';
import { FullscreenLoader } from 'components';
import { socket } from 'services/socket';
import { SOCKET_EVENTS } from 'constants/socket-constants';
import { TypeTest } from 'constants/task';
import { SolutionStatus } from 'typings/common/solution';
import { ITest } from './logic/state';
import { mapResultToString } from './mapResultToString';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

const OUTPUT = 1;

const TaskTrain: React.FC = () => {
	const { id: taskId }: { id: string } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const { task, solution, hasFetched, test, activeTab, errors } = useAppSelector((state) => state.task);

	useEffect(() => {
		dispatch(actions.fetchTask({ id: taskId }));
		socket.on(SOCKET_EVENTS.RESULT_TEST_TO_CLIENT, (test: ITest) => {
			dispatch(actions.setActiveTab({ tab: OUTPUT }));
			dispatch(actions.setTest({ test }));
		});
	}, []);

	useEffect(() => {
		if (!Boolean(errors)) {
			return;
		}
		dispatch(
			setNotificationState({
				state: {
					notificationType: NotificationType.Error,
					message: errors as string,
					title: 'Attention',
				},
			}),
		);
	}, [errors]);

	const handleSubmit = (code: string, testCases: string, type: TypeTest) => {
		if (!task) {
			return;
		}
		dispatch(actions.submitSolution({ taskId: task.id, typeTest: type, code, testCases }));
	};

	const handleReset = (reset: boolean) => {
		console.log(reset);
		if (!reset || !task || !solution) {
			return;
		}
		dispatch(actions.patchSolution({ code: task.preloaded, testCases: task.exampleTestCases || '' }));
	};

	const handlePatch = (status: SolutionStatus) => {
		if (!task || !solution) {
			return;
		}
		dispatch(actions.patchSolution({ status }));
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
				activeTab={activeTab}
				result={mapResultToString(test?.result || {})}
				success={(test?.result?.success && test?.typeTest === TypeTest.TEST_SOLUTION_ATTEMPT) || false}
				onChangeTab={(tab: number) => dispatch(actions.setActiveTab({ tab }))}
				onSubmit={handleSubmit}
				onReset={handleReset}
				onPatch={handlePatch}
			/>
		)
	);
};

export default TaskTrain;
