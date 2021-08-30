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
import { ITestResult } from './logic/state';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import { ROUTES, TASK_ROUTES } from 'constants/routes';
import { WebApi } from 'typings/webapi';

const OUTPUT = 1;

const TaskTrain: React.FC = () => {
	const { id: taskId }: { id: string } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const { task, solution, hasFetched, testResult, activeTab, errors, nextTaskId, changeStatus } = useAppSelector(
		(state) => state.task,
	);

	useEffect(() => {
		dispatch(actions.fetchTask({ id: taskId }));
		socket.on(
			SOCKET_EVENTS.RESULT_TEST_TO_CLIENT,
			({ solution, ...testResult }: ITestResult & { solution: WebApi.Entities.ISolution }) => {
				console.log('test => ', testResult);
				dispatch(actions.setActiveTab({ tab: OUTPUT }));
				dispatch(actions.setTestResult({ testResult }));
				dispatch(actions.setSolution({ solution: solution ?? null }));
			},
		);
	}, [taskId]);

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

	useEffect(() => {
		if (!changeStatus || !task || !solution?.status) {
			return;
		}
		dispatch(actions.changeStatus({ changeStatus: false }));
		if (solution.status === SolutionStatus.UNLOCKED) {
			history.push(`${ROUTES.TaskInfo}/${task.id}${TASK_ROUTES.Solutions}`);
			return;
		}
		if (Boolean(nextTaskId)) {
			history.push(`${ROUTES.TaskInfo}/${nextTaskId}${TASK_ROUTES.Train}`);
			return;
		}
		dispatch(
			setNotificationState({
				state: {
					notificationType: NotificationType.Error,
					message: 'You do not have any unstarted tasks',
					title: 'Attention',
				},
			}),
		);
		history.push(`${ROUTES.Search}`);
	}, [solution?.status, changeStatus, task]);

	const handleSubmit = (code: string, testCases: string, typeTest: TypeTest) => {
		if (!task) {
			return;
		}
		dispatch(actions.submitSolution({ taskId: task.id, typeTest, code, testCases }));
	};

	const handleReset = (reset: boolean) => {
		if (!reset || !task) {
			return;
		}
		const data = { code: task.initialSolution, testCases: task.exampleTestCases || '', taskId };
		dispatch(actions.patchSolution(data));
	};

	const handlePatch = (code: string, testCases: string, status: SolutionStatus) => {
		if (!task) {
			return;
		}
		const data = {
			code: !Boolean(code?.length) ? task?.initialSolution : code,
			testCases: !Boolean(testCases?.length) ? task?.exampleTestCases : testCases,
			taskId,
			status,
		};
		dispatch(actions.patchSolution(data));
	};

	if (!hasFetched) {
		return <FullscreenLoader />;
	}

	if (hasFetched && !task) {
		history.push(ROUTES.Home);
	}

	return (
		task && (
			<TaskTrainPage
				task={task}
				solution={solution}
				activeTab={activeTab}
				result={testResult?.result || {}}
				success={
					(testResult?.result?.success && testResult?.typeTest === TypeTest.TEST_SOLUTION_ATTEMPT) || false
				}
				onChangeTab={(tab: number) => dispatch(actions.setActiveTab({ tab }))}
				onSubmit={handleSubmit}
				onReset={handleReset}
				onPatch={handlePatch}
			/>
		)
	);
};

export default TaskTrain;
